import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, ArrowRight, Target, Plus, X } from 'lucide-react';

const Validation = () => {
    const [feedbackData, setFeedbackData] = useState([
        { label: 'Feature A', value: 80, sentiment: 'positive' },
        { label: 'Feature B', value: 45, sentiment: 'neutral' },
        { label: 'Feature C', value: 20, sentiment: 'negative' },
        { label: 'Pricing', value: 65, sentiment: 'positive' },
    ]);

    const [recentFeedback, setRecentFeedback] = useState([
        { id: 1, user: 'Sarah J.', comment: "Love the new dashboard layout!", sentiment: 'positive', date: '2h ago' },
        { id: 2, user: 'Mike T.', comment: "Can't find the export button.", sentiment: 'negative', date: '5h ago' },
        { id: 3, user: 'Alex R.', comment: "It's okay, but needs dark mode.", sentiment: 'neutral', date: '1d ago' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFeedback, setNewFeedback] = useState({ user: '', comment: '', sentiment: 'positive' });

    const handleAddFeedback = () => {
        if (!newFeedback.user || !newFeedback.comment) return;
        const feedback = {
            id: Date.now(),
            user: newFeedback.user,
            comment: newFeedback.comment,
            sentiment: newFeedback.sentiment,
            date: 'Just now'
        };
        setRecentFeedback([feedback, ...recentFeedback]);
        setIsModalOpen(false);
        setNewFeedback({ user: '', comment: '', sentiment: 'positive' });
    };

    return (
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
            <div className="page-header flex">
                <div>
                    <h1 className="page-heading">Validation Engine</h1>
                    <p className="page-subheading">Track customer feedback and validate business hypotheses.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-green-50)', color: 'var(--text-green-700)', padding: '0.5rem 1rem', borderRadius: '9999px', border: '1px solid var(--border-green-200)' }}>
                    <Target size={20} />
                    <span style={{ fontWeight: 700 }}>Confidence Score: 78/100</span>
                </div>
            </div>

            <div className="grid-2">
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
                        {recentFeedback.map((fb) => (
                            <div key={fb.id} style={{ padding: '1rem', border: '1px solid var(--slate-100)', borderRadius: '0.5rem', background: 'var(--slate-50)' }}>
                                <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                                    <div className="flex items-center gap-2">
                                        <span style={{ fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.875rem' }}>{fb.user}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>• {fb.date}</span>
                                    </div>
                                    {fb.sentiment === 'positive' && <ThumbsUp size={14} style={{ color: 'var(--success)' }} />}
                                    {fb.sentiment === 'negative' && <ThumbsDown size={14} style={{ color: 'var(--danger)' }} />}
                                    {fb.sentiment === 'neutral' && <MessageSquare size={14} style={{ color: 'var(--warning)' }} />}
                                </div>
                                <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>{fb.comment}</p>
                                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--primary-blue)', cursor: 'pointer' }}>
                                    <span>Link to Task</span>
                                    <ArrowRight size={10} />
                                </div>
                            </div>
                        ))}
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
