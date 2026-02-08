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

    // Dynamic Growth MoM Calculation
    const previousMrr = financialData.previousMrr || 1; // Avoid divide by zero
    const growthMom = Math.round(((financialData.mrr - previousMrr) / previousMrr) * 100);
    const isPositiveGrowth = growthMom >= 0;

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
        <div className="dashboard-container">
            <div className="page-header">
                <h1 className="page-heading">Founder's Command Center</h1>
                <p className="page-subheading">Real-time overview of your startup's health and progress.</p>
            </div>

            {/* Founder's Playbook - Smart Action Cards */}
            <div className={`founders-playbook ${theme === 'dark' ? 'dark' : ''}`}>
                <div className="playbook-header">
                    <div className="playbook-title-group">
                        <div className="playbook-icon-wrapper">
                            <Sparkles size={20} className={isAnalyzing ? "animate-spin" : ""} />
                        </div>
                        <div>
                            <h3 className="playbook-title">Founder's Playbook</h3>
                            <div className="flex items-center gap-2">
                                <p className="playbook-subtitle">AI-Recommended next steps based on your data.</p>
                                {isAnalyzing && (
                                    <span className="analyzing-indicator">
                                        <span className="analyzing-dot animate-pulse"></span>
                                        Analyzing...
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {isAnalyzing ? (
                    <div className="flex items-center justify-center h-24 w-full text-slate-400 gap-2">
                        <Activity className="animate-pulse" size={24} />
                        <span className="italic text-sm">Processing real-time metrics...</span>
                    </div>
                ) : (
                    <div className="insights-grid">
                        {insights.map((insight, index) => (
                            <div key={index} className="insight-card" style={{ borderLeftColor: insight.borderColor }}>
                                <div className="insight-header">
                                    <div className="insight-icon" style={{ backgroundColor: insight.bg, color: insight.color }}>
                                        {insight.icon}
                                    </div>
                                    <span className="insight-title">{insight.title}</span>
                                </div>
                                <p className="insight-description">
                                    {insight.description}
                                </p>
                                <button
                                    onClick={() => navigate('/finance')}
                                    className="insight-action"
                                >
                                    Take Action →
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

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
                                <div className="stat-value" style={{ color: isPositiveGrowth ? 'var(--text-green-600)' : 'var(--danger)' }}>
                                    {isPositiveGrowth ? '+' : ''}{growthMom}%
                                </div>
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
                        <h3 className="column-title text-center w-full mb-6">Startup Health Score</h3>
                        <CircularProgress
                            value={healthScore}
                            max={100}
                            size={180}
                            strokeWidth={15}
                            color={healthScore > 75 ? "var(--accent-teal)" : healthScore > 50 ? "var(--primary-blue)" : "var(--danger)"}
                            subLabel={healthScore > 75 ? "Excellent" : healthScore > 50 ? "Good" : "At Risk"}
                        />
                        <p className="text-slate-500 text-center text-sm mt-6 max-w-xs mx-auto">
                            {healthScore > 60 ? "Your startup is performing well." : "Focus on improving validation and execution speed."}
                        </p>
                    </div>
                )}

                {/* Validation Progress - Visible to All */}
                <div className="section-card">
                    <h3 className="column-title text-center w-full mb-6">Validation Progress</h3>
                    <div className="flex gap-8 justify-center flex-wrap">
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
                <div className="section-card col-span-2 p-0 border-none shadow-none bg-transparent">
                    <div className="pipeline-header">
                        <h3 className="column-title mb-0">Live Execution Pipeline</h3>
                        <span className="text-xs font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                            Real-time snapshot
                        </span>
                    </div>

                    <div className="pipeline-grid">
                        {[
                            { id: 'backlog', label: 'Backlog', icon: <CircleDashed size={20} />, color: 'var(--slate-500)', bg: 'var(--slate-200)' },
                            { id: 'todo', label: 'To Do', icon: <ListTodo size={20} />, color: 'var(--text-orange-600)', bg: 'var(--bg-orange-50)' },
                            { id: 'in-progress', label: 'In Progress', icon: <Loader2 size={20} className="animate-spin-slow" />, color: 'var(--text-blue-600)', bg: 'var(--bg-blue-50)' },
                            { id: 'done', label: 'Done', icon: <CheckCircle2 size={20} />, color: 'var(--text-green-600)', bg: 'var(--bg-green-50)' }
                        ].map((status) => {
                            const count = tasks.filter(t => t.status === status.id).length;
                            const percentage = Math.round((count / (tasks.length || 1)) * 100) || 0;

                            return (
                                <div key={status.id} className="pipeline-card">
                                    <div className="pipeline-card-header" style={{ color: status.color }}>
                                        <div className="pipeline-icon" style={{ backgroundColor: status.bg }}>
                                            {status.icon}
                                        </div>
                                        <span className="pipeline-label">{status.label}</span>
                                    </div>

                                    <div>
                                        <div className="pipeline-count">{count}</div>
                                        <div className="text-xs text-slate-400 mt-1">Tasks</div>
                                    </div>

                                    <div className="pipeline-progress-bg">
                                        <div
                                            className="pipeline-progress-bar"
                                            style={{ width: `${percentage}%`, backgroundColor: status.color }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Milestones & Activity (Real-Time) */}
                <div className="section-card col-span-2">
                    <h3 className="column-title mb-4">Recent Activity & Milestones</h3>
                    <div className="activity-list">
                        {recentActivities && recentActivities.length > 0 ? (
                            recentActivities.map((activity) => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-dot" style={{ backgroundColor: activity.type === 'milestone' ? 'var(--accent-teal)' : 'var(--primary-blue)' }}></div>
                                    <div className="activity-content">
                                        <div className="activity-text">{activity.text}</div>
                                        <div className="activity-time">{activity.timestamp}</div>
                                    </div>
                                    <div
                                        className="activity-badge"
                                        style={{
                                            color: activity.type === 'milestone' ? 'var(--text-green-600)' : activity.type === 'status' ? 'var(--text-orange-600)' : 'var(--text-blue-600)',
                                            backgroundColor: activity.type === 'milestone' ? 'var(--bg-green-50)' : activity.type === 'status' ? 'var(--bg-orange-50)' : 'var(--bg-blue-50)'
                                        }}
                                    >
                                        {activity.type}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-slate-400 p-4">
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
