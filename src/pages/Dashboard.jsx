import React from 'react';
import CircularProgress from '../components/CircularProgress';
import { TrendingUp, Users, DollarSign, Activity, Sparkles, Lightbulb, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
    // Simulated AI Rules
    const insights = [
        {
            type: 'growth',
            icon: <TrendingUp size={18} />,
            color: 'text-green-600',
            bg: 'bg-green-50',
            title: 'Growth Opportunity detected',
            description: 'User signups spiked 18% this week. Consider launching a referral program to sustain momentum.'
        },
        {
            type: 'validation',
            icon: <AlertTriangle size={18} />,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            title: 'Validation Gap',
            description: 'Problem Fit score is high (60%), but Solution Fit is lagging (35%). Recommend scheduling 5 user demos.'
        },
        {
            type: 'efficiency',
            icon: <Lightbulb size={18} />,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            title: 'Runway Optimization',
            description: 'At current burn rate, runway is 8 months. Prepare Series A pitch deck by end of Q3.'
        }
    ];

    return (
        <div>
            <div className="page-header">
                <h1 className="page-heading">Founder's Command Center</h1>
                <p className="page-subheading">Real-time overview of your startup's health and progress.</p>
            </div>

            {/* AI Insights Banner */}
            <div style={{
                background: 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
                border: '1px solid #dbeafe',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
                    }}>
                        <Sparkles size={20} />
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-800)' }}>AI Strategic Insights</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    {insights.map((insight, index) => (
                        <div key={index} style={{
                            background: 'white',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <div className={`p-1.5 rounded ${insight.bg} ${insight.color}`}>
                                    {insight.icon}
                                </div>
                                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate-700)' }}>{insight.title}</span>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                                {insight.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

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

                <div className="stat-card">
                    <div className="stat-icon green">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div className="stat-value">$4.2k</div>
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
            </div>

            <div className="dashboard-sections">
                {/* Startup Health Score */}
                <div className="section-card">
                    <h3 className="column-title" style={{ marginBottom: '1.5rem', width: '100%', textAlign: 'center' }}>Startup Health Score</h3>
                    <CircularProgress
                        value={85}
                        max={100}
                        size={180}
                        strokeWidth={15}
                        color="var(--accent-teal)"
                        subLabel="Excellent"
                    />
                    <p className="text-slate-500 text-center text-sm mt-6" style={{ maxWidth: '300px' }}>
                        Your startup is performing well across all key metrics. Keep focusing on user retention.
                    </p>
                </div>

                {/* Validation Progress */}
                <div className="section-card">
                    <h3 className="column-title" style={{ marginBottom: '1.5rem', width: '100%', textAlign: 'center' }}>Validation Progress</h3>
                    <div className="flex gap-4">
                        <CircularProgress
                            value={60}
                            max={100}
                            size={140}
                            strokeWidth={12}
                            color="var(--primary-blue)"
                            label="Problem Fit"
                        />
                        <CircularProgress
                            value={35}
                            max={100}
                            size={140}
                            strokeWidth={12}
                            color="var(--accent-purple)"
                            label="Solution Fit"
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
                            { title: 'MVP Milestone Reached', type: 'milestone', date: '2 days ago', color: 'text-green-600', bg: 'bg-green-50' },
                            { title: 'New Feedback Logged: "Love the dashboard"', type: 'feedback', date: '4 hours ago', color: 'text-blue-600', bg: 'bg-blue-50' },
                            { title: 'Database Schema Finalized', type: 'task', date: '1 day ago', color: 'text-slate-600', bg: 'bg-slate-100' }
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)' }}>
                                <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: 'var(--slate-400)' }}></div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 500, color: 'var(--slate-800)' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{item.date}</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${item.color} ${item.bg}`} style={{ textTransform: 'uppercase' }}>
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
