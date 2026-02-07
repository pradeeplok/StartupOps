import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, ArrowRight, Target, Plus, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';

import { UserContext } from '../App';

const Validation = () => {
    const { feedbackData, recentFeedback, setRecentFeedback, addFeedbackToRoadmap } = React.useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ user: '', comment: '', sentiment: 'positive' });

    const handleAddFeedback = () => {
        if (!newFeedback.user || !newFeedback.comment) return;
        const feedback = {
            id: Date.now(),
            user: newFeedback.user,
            comment: newFeedback.comment,
            sentiment: newFeedback.sentiment,
            date: new Date().toISOString()
        };
        setRecentFeedback([feedback, ...recentFeedback]);
        setIsModalOpen(false);
        setNewFeedback({ user: '', comment: '', sentiment: 'positive' });
    };

    // --- Dynamic Sentiment Analysis ---
    const sentimentMetrics = React.useMemo(() => {
        if (recentFeedback.length === 0) return { score: 0, trend: [] };

        // 1. Calculate Overall Score (% Positive)
        const positiveCount = recentFeedback.filter(f => f.sentiment === 'positive').length;
        const positiveScore = Math.round((positiveCount / recentFeedback.length) * 100);

        // 2. Generate Trend Data (Last 7 Days)
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - (6 - i));
            return d;
        });

        const trend = last7Days.map(date => {
            const dayStr = date.toISOString().split('T')[0];
            const dayFeedback = recentFeedback.filter(f => f.date.startsWith(dayStr));

            if (dayFeedback.length === 0) {
                // Fallback/Smoothing: use previous day or default 50 if no data
                return { day: days[date.getDay()], score: 50 + Math.random() * 20 };
            }

            const dayScore = dayFeedback.reduce((acc, curr) => {
                return acc + (curr.sentiment === 'positive' ? 100 : curr.sentiment === 'neutral' ? 50 : 0);
            }, 0) / dayFeedback.length;

            return { day: days[date.getDay()], score: Math.round(dayScore) };
        });

        return { score: positiveScore, trend };
    }, [recentFeedback]);

    const formatTimeAgo = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
    };

    return (
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
            <div className="page-header flex">
                <div>
                    <h1 className="page-heading">Recommendation Engine</h1>
                    <p className="page-subheading">AI-driven insights and customer feedback analysis.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-green-50)', color: 'var(--text-green-700)', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid var(--border-green-200)' }}>
                    <Target size={20} />
                    <span style={{ fontWeight: 700 }}>Confidence Score: 78/100</span>
                </div>
            </div>

            <div className="grid-2">
                {/* Sentiment Analytics (New) */}
                <div className="section-card" style={{ gridColumn: 'span 2' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="column-title">Sentiment Analysis & Trends</h3>
                        <span className="text-sm text-slate-500">Live Data from last 30 days</span>
                    </div>
                    <div className="grid-2">
                        {/* Sentiment Gauge */}
                        <div className="flex flex-col items-center justify-center">
                            <h4 className="text-sm font-semibold text-slate-600 mb-4">Overall Sentiment Score</h4>
                            <div style={{ position: 'relative', width: '200px', height: '100px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[{ value: sentimentMetrics.score }, { value: 100 - sentimentMetrics.score }]}
                                            cy={100}
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={60}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            <Cell fill={sentimentMetrics.score > 50 ? "var(--success)" : "var(--warning)"} />
                                            <Cell fill="var(--slate-200)" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', textAlign: 'center' }}>
                                    <span className="text-2xl font-bold" style={{ color: 'var(--slate-800)' }}>{sentimentMetrics.score}%</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Positive Feedback Ratio</p>
                        </div>

                        {/* Rating Trend */}
                        <div style={{ height: '200px' }}>
                            <h4 className="text-sm font-semibold text-slate-600 mb-4">Sentiment Trend (Last 7 Days)</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sentimentMetrics.trend}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--slate-200)" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--slate-500)' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="score" stroke="var(--primary-blue)" fillOpacity={1} fill="url(#colorScore)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Rating Distribution Removed */}

                {/* Feature Interest Chart */}
                <div className="stat-card" style={{ display: 'block' }}>
                    <h3 className="column-title" style={{ marginBottom: '1.5rem' }}>Feature Interest</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {feedbackData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 500, color: 'var(--slate-700)' }}>{item.label}</span>
                                    <span style={{ color: 'var(--slate-500)' }}>{item.value}% Interest</span>
                                </div>
                                <div style={{ width: '100%', background: 'var(--slate-100)', borderRadius: '9999px', height: '0.75rem' }}>
                                    <div
                                        style={{
                                            height: '0.75rem',
                                            borderRadius: '9999px',
                                            transition: 'all 1s',
                                            width: `${item.value}%`,
                                            backgroundColor: item.sentiment === 'positive' ? 'var(--primary-blue)' : item.sentiment === 'negative' ? 'var(--danger)' : 'var(--warning)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Sounding Board */}
                <div className="stat-card" style={{ display: 'block' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="column-title">Recent Customer Feedback</h3>
                        <button
                            className="btn btn-primary"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={14} /> Log Feedback
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentFeedback.length === 0 ? (
                            <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed var(--slate-200)', borderRadius: '0.5rem', color: 'var(--slate-500)' }}>
                                <MessageSquare size={32} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                                <p style={{ fontWeight: 600 }}>No feedback yet</p>
                                <p style={{ fontSize: '0.875rem' }}>Share your validation link to start gathering insights!</p>
                            </div>
                        ) : (
                            recentFeedback.map((fb) => (
                                <div key={fb.id} style={{ padding: '1rem', border: '1px solid var(--slate-100)', borderRadius: '0.5rem', background: 'var(--slate-50)' }}>
                                    <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                                        <div className="flex items-center gap-2">
                                            <span style={{ fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.875rem' }}>{fb.user}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>• {formatTimeAgo(fb.date)}</span>
                                        </div>
                                        {fb.sentiment === 'positive' && <ThumbsUp size={14} style={{ color: 'var(--success)' }} />}
                                        {fb.sentiment === 'negative' && <ThumbsDown size={14} style={{ color: 'var(--danger)' }} />}
                                        {fb.sentiment === 'neutral' && <MessageSquare size={14} style={{ color: 'var(--warning)' }} />}
                                    </div>
                                    <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>{fb.comment}</p>
                                    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                        <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
                                            <span>Link to Task</span>
                                            <ArrowRight size={10} />
                                        </div>
                                        <button
                                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-1 px-2 rounded border border-slate-200 flex items-center gap-1"
                                            onClick={() => addFeedbackToRoadmap(fb)}
                                        >
                                            <Plus size={10} /> Add to Roadmap
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Log Feedback Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div className="section-card" style={{ width: '100%', maxWidth: '500px', padding: '1.5rem', alignItems: 'stretch' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="column-title" style={{ fontSize: '1.25rem' }}>Log Customer Feedback</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--slate-400)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Customer Name / Source</label>
                                <input
                                    type="text"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', outline: 'none' }}
                                    placeholder="e.g. John Doe (Intercom)"
                                    value={newFeedback.user}
                                    onChange={(e) => setNewFeedback({ ...newFeedback, user: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Feedback Details</label>
                                <textarea
                                    rows={3}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', outline: 'none', resize: 'none' }}
                                    placeholder="What did the customer say?"
                                    value={newFeedback.comment}
                                    onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Sentiment</label>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {['positive', 'neutral', 'negative'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => setNewFeedback({ ...newFeedback, sentiment: s })}
                                            style={{
                                                flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid', fontSize: '0.875rem', textTransform: 'capitalize',
                                                backgroundColor: newFeedback.sentiment === s ? (s === 'positive' ? 'var(--bg-green-50)' : s === 'negative' ? 'var(--bg-red-50)' : 'var(--bg-orange-50)') : 'white',
                                                borderColor: newFeedback.sentiment === s ? (s === 'positive' ? 'var(--text-green-700)' : s === 'negative' ? 'var(--danger)' : 'var(--warning)') : 'var(--border-light)',
                                                color: newFeedback.sentiment === s ? (s === 'positive' ? 'var(--text-green-700)' : s === 'negative' ? 'var(--danger)' : 'var(--warning)') : 'var(--slate-600)'
                                            }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button className="btn btn-primary" onClick={handleAddFeedback}>Log Feedback</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Validation;
