import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Building, User, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        company: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const [acceptTerms, setAcceptTerms] = React.useState(false);
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const createUserProfile = async (user, company, name) => {
        try {
            // Create user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                name: name || user.displayName,
                company: company || 'My Startup',
                role: 'founder',
                createdAt: new Date().toISOString()
            });

            // Create startup document
            await setDoc(doc(db, 'startups', user.uid), {
                name: company || 'My Startup',
                founderId: user.uid,
                createdAt: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error creating user profile:', error);
        }
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (!acceptTerms) {
            setError('Please accept the terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // Update user profile
            await updateProfile(user, {
                displayName: formData.name
            });

            // Create Firestore profile
            await createUserProfile(user, formData.company, formData.name);

            // Navigate to dashboard
            navigate('/onboarding');
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = 'Failed to create account';

            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage = 'An account with this email already exists';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Invalid email address';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password is too weak';
                    break;
                default:
                    errorMessage = error.message;
            }

            setError(errorMessage);
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        setIsLoading(true);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            // Create user profile (company name defaults to startup name)
            await createUserProfile(user, 'My Startup', user.displayName);

            // Navigate to dashboard
            navigate('/onboarding');
        } catch (error) {
            console.error('Google signup error:', error);
            let errorMessage = 'Failed to sign up with Google';

            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-up popup was closed';
            } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = 'Sign-up was cancelled';
            } else {
                errorMessage = error.message;
            }

            setError(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-grid">
                {/* Left Side - Branding */}
                <div className="auth-branding">
                    <div className="auth-branding-content">
                        <div className="brand-logo-large">S</div>
                        <h1 className="auth-brand-title">Join StartupOps</h1>
                        <p className="auth-brand-subtitle">Launch your startup with confidence</p>
                        <div className="auth-features">
                            <div className="auth-feature">
                                <div className="auth-feature-icon">✓</div>
                                <span>Free to get started</span>
                            </div>
                            <div className="auth-feature">
                                <div className="auth-feature-icon">✓</div>
                                <span>Real-time collaboration</span>
                            </div>
                            <div className="auth-feature">
                                <div className="auth-feature-icon">✓</div>
                                <span>Data-driven insights</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="auth-form-container">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <UserPlus size={32} style={{ color: 'var(--primary-blue)' }} />
                            <h2 className="auth-title">Create Account</h2>
                            <p className="auth-subtitle">Get started with your startup journey</p>
                        </div>

                        {error && (
                            <div className="auth-error">
                                {error}
                            </div>
                        )}

                        {/* Google Sign-Up Button */}
                        <button
                            type="button"
                            className="google-signin-btn"
                            onClick={handleGoogleSignup}
                            disabled={isLoading}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z" />
                                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z" />
                                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z" />
                                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        <div className="auth-divider">
                            <span>or</span>
                        </div>

                        <form onSubmit={handleEmailSignup} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="company">Company Name</label>
                                <div className="input-with-icon">
                                    <Building size={18} />
                                    <input
                                        id="company"
                                        name="company"
                                        type="text"
                                        placeholder="Your Startup Inc."
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <div className="input-with-icon">
                                    <User size={18} />
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <div className="input-with-icon">
                                    <Mail size={18} />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="At least 6 characters"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    disabled={isLoading}
                                />
                                <span>I agree to the Terms & Conditions</span>
                            </label>

                            <button
                                type="submit"
                                className="auth-submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
