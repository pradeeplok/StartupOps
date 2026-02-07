import React from 'react';
import CircularProgress from '../components/CircularProgress';
import { TrendingUp, Users, IndianRupee, Activity, Sparkles, Lightbulb, AlertTriangle } from 'lucide-react';

import { UserContext } from '../App';

const Dashboard = () => {
    const { userRole, tasks, feedbackData } = React.useContext(UserContext);

    // Calculate Health Score Metrics
    const validationScore = Math.round(
        feedbackData.reduce((acc, curr) => acc + curr.value, 0) / (feedbackData.length || 1)
    );

    // Simple execution metric: Tasks in 'done' vs total
    const doneTasks = tasks.filter(t => t.status === 'done').length;
    const totalTasks = tasks.length || 1;
    const executionScore = Math.round((doneTasks / totalTasks) * 100);

    // Weighted Health Score: 60% Validation, 40% Execution
    const healthScore = Math.round((validationScore * 0.6) + (executionScore * 0.4));

    // Dynamic AI Insights - Using Inline Styles for Colors
    const generateInsights = () => {
        const insightsList = [];

        // Pivot Warning Rule
        if (validationScore < 50) {
            insightsList.push({
                type: 'warning',
                icon: <AlertTriangle size={18} />,
                color: '#dc2626', // red-600
                bg: '#fef2f2',   // red-50
                borderColor: '#ef4444', // red-500
                title: 'Pivot Recommended',
                description: `Validation Score is low (${validationScore}%). Re-evaluate core value proposition.`
            });
        }
        // Growth Signal Rule
        else if (validationScore > 75 && executionScore > 60) {
            insightsList.push({
                type: 'growth',
                icon: <TrendingUp size={18} />,
                color: '#16a34a', // green-600
                bg: '#f0fdf4',   // green-50
                borderColor: '#22c55e', // green-500
                title: 'Ready for Scale',
                description: 'High validation and solid execution. Consider doubling marketing spend.'
            });
        }

        // Standard Advice if no alerts
        if (insightsList.length === 0) {
            insightsList.push({
                type: 'efficiency',
                icon: <Lightbulb size={18} />,
                color: '#2563eb', // blue-600
                bg: '#eff6ff',   // blue-50
                borderColor: '#3b82f6', // blue-500
                title: 'Optimize Runway',
                description: 'At current burn rate, runway is 8 months. Focus on closing deals this quarter.'
            });
        }

        return insightsList;
    };

    const [isAnalyzing, setIsAnalyzing] = React.useState(false);

    // Simulate AI Analysis when scores change
    React.useEffect(() => {
        setIsAnalyzing(true);
        const timer = setTimeout(() => setIsAnalyzing(false), 1500); // 1.5s analysis delay
        return () => clearTimeout(timer);
    }, [validationScore, executionScore, feedbackData.length]);

    const insights = generateInsights();

    return (
        <div>
            <div className="page-header">
                <h1 className="page-heading">Founder's Command Center</h1>
                <p className="page-subheading">Real-time overview of your startup's health and progress.</p>
            </div>

            {/* Founder's Playbook - Smart Action Cards */}
            <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
                border: '1px solid #dbeafe',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '200px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            color: 'white',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                        }}>
                            <Sparkles size={20} className={isAnalyzing ? "animate-spin" : ""} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-800)' }}>Founder's Playbook</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <p className="text-xs text-slate-500">AI-Recommended next steps based on your data.</p>
                                {isAnalyzing && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', display: 'inline-block' }} className="animate-pulse"></span>
                                        Analyzing...
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {isAnalyzing ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', width: '100%', color: 'var(--slate-400)', gap: '0.5rem' }}>
                        <Activity className="animate-pulse" size={24} />
                        <span style={{ fontStyle: 'italic', fontSize: '0.875rem' }}>Processing real-time metrics...</span>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', animation: 'fadeIn 0.5s ease-in' }}>
                        {insights.map((insight, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                borderLeft: `4px solid ${insight.borderColor}`,
                                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <div style={{
                                        padding: '0.375rem',
                                        borderRadius: '0.25rem',
                                        backgroundColor: insight.bg,
                                        color: insight.color,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {insight.icon}
                                    </div>
                                    <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--slate-800)' }}>{insight.title}</span>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                                    {insight.description}
                                </p>
                                <button className="text-xs font-bold uppercase tracking-wide text-blue-600 hover:underline">
                                    Take Action →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
                .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>

            <div className="stats-grid">
                {/* Quick Stats Cards */}
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="stat-value">1,240</div>
                        <div className="stat-label">Active Users</div>
                    </div>
                </div>

                {userRole === 'founder' && (
                    <>
                        <div className="stat-card">
                            <div className="stat-icon green">
                                <IndianRupee size={24} />
                            </div>
                            <div>
                                <div className="stat-value">₹4.2k</div>
                                <div className="stat-label">MRR</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon purple">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <div className="stat-value">+18%</div>
                                <div className="stat-label">Growth MoM</div>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon orange">
                                <Activity size={24} />
                            </div>
                            <div>
                                <div className="stat-value">8 Mo</div>
                                <div className="stat-label">Runway</div>
                            </div>
                        </div>
                    </>
                )}

                {userRole === 'member' && (
                    <div className="stat-card bg-slate-50 border-dashed">
                        <div className="stat-icon slate">
                            <Activity size={24} />
                        </div>
                        <div>
                            <div className="stat-value">3</div>
                            <div className="stat-label">My Active Tasks</div>
                        </div>
                    </div>
                )}
            </div>

            <div className="dashboard-sections">
                {/* Startup Health Score - Founder Only */}
                {userRole === 'founder' && (
                    <div className="section-card">
                        <h3 className="column-title" style={{ marginBottom: '1.5rem', width: '100%', textAlign: 'center' }}>Startup Health Score</h3>
                        <CircularProgress
                            value={healthScore}
                            max={100}
                            size={180}
                            strokeWidth={15}
                            color={healthScore > 75 ? "var(--accent-teal)" : healthScore > 50 ? "var(--primary-blue)" : "var(--danger)"}
                            subLabel={healthScore > 75 ? "Excellent" : healthScore > 50 ? "Good" : "At Risk"}
                        />
                        <p style={{ color: 'var(--slate-500)', textAlign: 'center', fontSize: '0.875rem', marginTop: '1.5rem', maxWidth: '300px', margin: '1.5rem auto 0' }}>
                            {healthScore > 60 ? "Your startup is performing well." : "Focus on improving validation and execution speed."}
                        </p>
                    </div>
                )}

                {/* Validation Progress - Visible to All */}
                <div className="section-card">
                    <h3 className="column-title" style={{ marginBottom: '1.5rem', width: '100%', textAlign: 'center' }}>Validation Progress</h3>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <CircularProgress
                            value={validationScore}
                            max={100}
                            size={140}
                            strokeWidth={12}
                            color="var(--primary-blue)"
                            label="Problem Fit"
                        />
                        <CircularProgress
                            value={executionScore}
                            max={100}
                            size={140}
                            strokeWidth={12}
                            color="var(--accent-purple)"
                            label="Execution Fit"
                        />
                    </div>
                </div>

                {/* Task Completion Trends */}
                <div className="section-card" style={{ gridColumn: 'span 2' }}>
                    <h3 className="column-title" style={{ marginBottom: '1.5rem' }}>Task Completion Trends</h3>
                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '2rem', padding: '0 1rem' }}>
                        {[45, 60, 75, 50, 80, 95, 85].map((h, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div className="bar-tooltip" style={{ opacity: 0, transition: 'opacity 0.2s', fontSize: '0.75rem', color: 'var(--slate-600)' }}>{h}%</div>
                                <div style={{
                                    width: '100%',
                                    height: `${h}%`,
                                    backgroundColor: 'var(--primary-blue)',
                                    borderRadius: '4px 4px 0 0',
                                    opacity: 0.8,
                                    transition: 'height 0.5s'
                                }}></div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>W{i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Milestones & Activity */}
                <div className="section-card" style={{ gridColumn: 'span 2' }}>
                    <h3 className="column-title" style={{ marginBottom: '1rem' }}>Recent Activity & Milestones</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { title: 'MVP Milestone Reached', type: 'milestone', date: '2 days ago', color: '#16a34a', bg: '#f0fdf4' },
                            { title: 'New Feedback Logged: "Love the dashboard"', type: 'feedback', date: '4 hours ago', color: '#2563eb', bg: '#eff6ff' },
                            { title: 'Database Schema Finalized', type: 'task', date: '1 day ago', color: '#475569', bg: '#f1f5f9' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
                                <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--slate-400)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 500, color: 'var(--slate-800)' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{item.date}</div>
                                </div>
                                <div style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    textTransform: 'uppercase',
                                    color: item.color,
                                    backgroundColor: item.bg
                                }}>
                                    {item.type}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
