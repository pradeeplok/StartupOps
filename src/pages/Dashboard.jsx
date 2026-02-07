import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '../components/CircularProgress';
import { TrendingUp, Users, IndianRupee, Activity, Sparkles, Lightbulb, AlertTriangle, CircleDashed, ListTodo, Loader2, CheckCircle2 } from 'lucide-react';

import { UserContext } from '../App';

const Dashboard = () => {
    const { userRole, tasks, feedbackData, financialData, runwayMonths, recentActivities, theme } = React.useContext(UserContext);
    const navigate = useNavigate();

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

    // Dynamic AI Insights - Advanced Heuristics
    const generateInsights = () => {
        const insightsList = [];

        // 1. EMERGENCY: Runway Danger (Highest Priority)
        if (runwayMonths < 3) {
            insightsList.push({
                type: 'danger',
                icon: <AlertTriangle size={18} />,
                color: 'var(--danger)',
                bg: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'var(--danger)',
                title: 'Runway Critical',
                description: `You have ${runwayMonths} months of cash left. Immediate fundraising or severe cost-cutting is required.`
            });
            return insightsList; // Stop here, this is critical
        }

        // 2. TRAP: The Scaling Trap (High Execution, Low Validation)
        if (executionScore > 80 && validationScore < 40) {
            insightsList.push({
                type: 'warning',
                icon: <Activity size={18} />,
                color: 'var(--text-orange-600)',
                bg: 'var(--bg-orange-50)',
                borderColor: 'var(--text-orange-600)',
                title: 'The Scaling Trap',
                description: "STOP BUILDING. You are efficiently shipping a product that hasn't been validated. Shift 100% focus to customer interviews."
            });
        }

        // 3. TRAP: Feature Factory (High Burn, Low Validation)
        if (financialData.monthlyBurn > 20000 && validationScore < 50) {
            insightsList.push({
                type: 'warning',
                icon: <IndianRupee size={18} />,
                color: 'var(--text-orange-600)',
                bg: 'var(--bg-orange-50)',
                borderColor: 'var(--text-orange-600)',
                title: 'Burn Alert',
                description: "High burn rate with unproven value. Cut non-essential costs immediately until validation improves."
            });
        }

        // 4. TRAP: Idea Maze (Low Everything)
        if (executionScore < 30 && validationScore < 30) {
            insightsList.push({
                type: 'info',
                icon: <Lightbulb size={18} />,
                color: 'var(--text-blue-600)',
                bg: 'var(--bg-blue-50)',
                borderColor: 'var(--text-blue-600)',
                title: 'The Idea Maze',
                description: "Don't worry about code yet. Talk to 10 potential customers this week to find a hair-on-fire problem."
            });
        }

        // 5. SUCCESS: Product-Market Fit (High Everything)
        if (validationScore > 80 && executionScore > 70) {
            insightsList.push({
                type: 'growth',
                icon: <TrendingUp size={18} />,
                color: 'var(--text-green-600)',
                bg: 'var(--bg-green-50)',
                borderColor: 'var(--text-green-600)',
                title: 'Product-Market Fit',
                description: " signals are strong. Double down on what works and consider hiring for sales/growth."
            });
        }

        // Default Advice if no specific patterns match
        if (insightsList.length === 0) {
            insightsList.push({
                type: 'efficiency',
                icon: <Sparkles size={18} />,
                color: 'var(--text-blue-600)',
                bg: 'var(--bg-blue-50)',
                borderColor: 'var(--text-blue-600)',
                title: 'Optimize & Validate',
                description: `Healthy balance. improved validation (${validationScore}%) will unlock clearer next steps.`
            });
        }

        return insightsList.slice(0, 2); // Show max 2 insights
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
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)'
                    : 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
                border: theme === 'dark' ? '1px solid var(--border-light)' : '1px solid #dbeafe',
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
                                background: 'var(--bg-card)',
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
                                <button
                                    onClick={() => navigate('/finance')}
                                    className="text-xs font-bold uppercase tracking-wide text-blue-600 hover:underline"
                                >
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
                {userRole === 'founder' && (
                    <>
                        <div className="stat-card">
                            <div className="stat-icon green">
                                <IndianRupee size={24} />
                            </div>
                            <div>
                                <div className="stat-value">₹{financialData.mrr.toLocaleString()}</div>
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
                                <div className="stat-value">{runwayMonths} Mo</div>
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

                {/* Task Status Distribution (Pipeline Cards) */}
                <div className="section-card" style={{ gridColumn: 'span 2', background: 'transparent', boxShadow: 'none', padding: 0, border: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <h3 className="column-title" style={{ marginBottom: 0 }}>Live Execution Pipeline</h3>
                        <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                            Real-time snapshot
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {[
                            { id: 'backlog', label: 'Backlog', icon: <CircleDashed size={20} />, color: 'var(--slate-500)', bg: 'var(--slate-200)' },
                            { id: 'todo', label: 'To Do', icon: <ListTodo size={20} />, color: 'var(--text-orange-600)', bg: 'var(--bg-orange-50)' },
                            { id: 'in-progress', label: 'In Progress', icon: <Loader2 size={20} className="animate-spin-slow" />, color: 'var(--text-blue-600)', bg: 'var(--bg-blue-50)' },
                            { id: 'done', label: 'Done', icon: <CheckCircle2 size={20} />, color: 'var(--text-green-600)', bg: 'var(--bg-green-50)' }
                        ].map((status) => {
                            const count = tasks.filter(t => t.status === status.id).length;
                            const percentage = Math.round((count / (tasks.length || 1)) * 100) || 0;

                            return (
                                <div key={status.id} style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: '0.75rem',
                                    padding: '1.25rem',
                                    border: '1px solid var(--border-light)',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'default'
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: status.color }}>
                                        <div style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: status.bg }}>
                                            {status.icon}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{status.label}</span>
                                    </div>

                                    <div>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-800)', lineHeight: 1 }}>{count}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>Tasks</div>
                                    </div>

                                    <div style={{
                                        width: '100%',
                                        height: '6px',
                                        backgroundColor: 'var(--slate-100)',
                                        borderRadius: '3px',
                                        overflow: 'hidden',
                                        marginTop: 'auto'
                                    }}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            height: '100%',
                                            backgroundColor: status.color,
                                            borderRadius: '3px',
                                            transition: 'width 0.5s ease-in-out'
                                        }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <style>{`
                        .animate-spin-slow { animation: spin 3s linear infinite; }
                    `}</style>
                </div>

                {/* Recent Milestones & Activity (Real-Time) */}
                <div className="section-card" style={{ gridColumn: 'span 2' }}>
                    <h3 className="column-title" style={{ marginBottom: '1rem' }}>Recent Activity & Milestones</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivities && recentActivities.length > 0 ? (
                            recentActivities.map((activity) => (
                                <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
                                    <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: activity.type === 'milestone' ? 'var(--accent-teal)' : 'var(--primary-blue)' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 500, color: 'var(--slate-800)' }}>{activity.text}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{activity.timestamp}</div>
                                    </div>
                                    <div style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '0.25rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 500,
                                        textTransform: 'uppercase',
                                        color: activity.type === 'milestone' ? 'var(--text-green-600)' : activity.type === 'status' ? 'var(--text-orange-600)' : 'var(--text-blue-600)',
                                        backgroundColor: activity.type === 'milestone' ? 'var(--bg-green-50)' : activity.type === 'status' ? 'var(--bg-orange-50)' : 'var(--bg-blue-50)'
                                    }}>
                                        {activity.type}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--slate-400)', padding: '1rem' }}>
                                No recent activity
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
