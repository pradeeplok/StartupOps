import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, ArrowRight, CheckCircle, Sparkles, Building, Rocket } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import './Onboarding.css';

const Onboarding = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Role, 2: Details, 3: Analysis (Founder Only), 4: Complete
    const [role, setRole] = useState(null); // 'founder' | 'member'
    const [isLoading, setIsLoading] = useState(false);

    // Founder Form Data
    const [idea, setIdea] = useState('');
    const [domain, setDomain] = useState('');
    const [aiAnalysis, setAiAnalysis] = useState(null);

    // Member Form Data
    const [interest, setInterest] = useState('');
    const [joinCode, setJoinCode] = useState('');

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleNext = () => {
        if (step === 1 && role) {
            setStep(2);
        } else if (step === 2) {
            if (role === 'founder') {
                runAiAnalysis();
            } else {
                completeOnboarding();
            }
        } else if (step === 3) {
            completeOnboarding();
        }
    };

    const runAiAnalysis = () => {
        setStep(3);
        setIsLoading(true);
        // Mock API Call for AI Analysis
        setTimeout(() => {
            setAiAnalysis({
                marketSize: '$10B+',
                competitors: ['Competitor A', 'Competitor B', 'Competitor C'],
                suggestion: `Based on your idea for "${domain}", we recommend focusing on a niche MVP first. Your "Validation Engine" feature will be key to differentiation.`,
                estimatedBurn: '$2,500/mo',
                projectedRevenue: '$5k MRR in 6 months'
            });
            setIsLoading(false);
        }, 2500);
    };

    const completeOnboarding = async () => {
        setIsLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                // Use setDoc with merge: true to effectively update or create if missing
                await setDoc(doc(db, 'users', user.uid), {
                    role: role,
                    onboardingCompleted: true,
                    // Store founder data if applicable
                    ...(role === 'founder' && {
                        startupIdea: idea,
                        domain: domain,
                        aiAnalysis: aiAnalysis
                    }),
                    // Store member data if applicable
                    ...(role === 'member' && {
                        interest: interest,
                        // handle join code logic here later
                    })
                }, { merge: true });
            }
            // Navigate regardless of success (non-blocking)
            navigate('/dashboard');
        } catch (error) {
            console.error("Error completing onboarding:", error);
            // Even if save fails, let them in
            navigate('/dashboard');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <div className="onboarding-header">
                    <h1 className="onboarding-title">Welcome to StartupOps</h1>
                    <p className="onboarding-subtitle">Let's personalize your experience to get you started.</p>
                </div>

                {/* Step 1: Role Selection */}
                {step === 1 && (
                    <div className="step-content">
                        <div className="role-grid">
                            <div
                                className={`role-card ${role === 'founder' ? 'selected' : ''}`}
                                onClick={() => handleRoleSelect('founder')}
                            >
                                <div className="role-icon"><Rocket size={24} /></div>
                                <h3 className="role-title">I'm a Founder</h3>
                                <p className="role-desc">I have a startup idea and want to build and scale it.</p>
                            </div>
                            <div
                                className={`role-card ${role === 'member' ? 'selected' : ''}`}
                                onClick={() => handleRoleSelect('member')}
                            >
                                <div className="role-icon"><Users size={24} /></div>
                                <h3 className="role-title">I'm a Member</h3>
                                <p className="role-desc">I'm joining an existing team or looking for opportunities.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2A: Founder Details */}
                {step === 2 && role === 'founder' && (
                    <div className="step-content">
                        <h3 className="form-label" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Tell us about your startup</h3>
                        <div className="form-group">
                            <label className="form-label">What industry or domain are you in?</label>
                            <select
                                className="form-select"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                            >
                                <option value="">Select an industry...</option>
                                <option value="SaaS">SaaS (B2B)</option>
                                <option value="Consumer App">Consumer App (B2C)</option>
                                <option value="E-commerce">E-commerce</option>
                                <option value="Fintech">Fintech</option>
                                <option value="Healthtech">Healthtech</option>
                                <option value="Edtech">Edtech</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Describe your startup idea briefly</label>
                            <textarea
                                className="form-textarea"
                                placeholder="e.g. A platform that helps remote teams collaborate on video editing in real-time..."
                                value={idea}
                                onChange={(e) => setIdea(e.target.value)}
                            ></textarea>
                            <p className="role-desc" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Our AI will analyze this to give you initial traction estimates.</p>
                        </div>
                    </div>
                )}

                {/* Step 2B: Member Details */}
                {step === 2 && role === 'member' && (
                    <div className="step-content">
                        <h3 className="form-label" style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Join a Team</h3>
                        <div className="form-group">
                            <label className="form-label">What is your primary role/interest?</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Product Manager, Developer, Designer"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Have a startup invite code?</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter 6-digit code (Optional)"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {/* Step 3: AI Analysis (Founder) */}
                {step === 3 && role === 'founder' && (
                    <div className="step-content">
                        {isLoading ? (
                            <div className="ai-loading">
                                <div className="ai-spinner"></div>
                                <div className="ai-text">Analyzing your idea...</div>
                                <div className="ai-subtext">Crunching market data for {domain}</div>
                            </div>
                        ) : (
                            <div className="analysis-result">
                                <div className="result-card">
                                    <div className="result-header">
                                        <Sparkles size={20} />
                                        <span>AI Strategic Insights</span>
                                    </div>
                                    <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#334155' }}>
                                        {aiAnalysis?.suggestion}
                                    </p>
                                    <div className="metric-grid">
                                        <div className="metric-item">
                                            <div className="metric-value">{aiAnalysis?.marketSize}</div>
                                            <div className="metric-label">TAM</div>
                                        </div>
                                        <div className="metric-item">
                                            <div className="metric-value">{aiAnalysis?.projectedRevenue}</div>
                                            <div className="metric-label">Projection</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="role-desc">Your dashboard has been pre-configured with these settings.</p>
                            </div>
                        )}
                    </div>
                )}

                <div className="onboarding-actions">
                    {step > 1 && !isLoading && (
                        <button className="btn-ghost" onClick={() => setStep(step - 1)}>Back</button>
                    )}
                    {!isLoading && (
                        <button
                            className="btn-primary"
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !role) ||
                                (step === 2 && role === 'founder' && (!idea || !domain)) ||
                                (step === 2 && role === 'member' && !interest)
                            }
                        >
                            {step === 3 ? "Go to Dashboard" : (step === 2 && role === 'founder' ? "Analyze Idea" : "Continue")} <ArrowRight size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
