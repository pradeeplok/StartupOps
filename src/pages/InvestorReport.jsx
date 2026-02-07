import React, { useContext } from 'react';
import { UserContext } from '../App';
import { TrendingUp, Users, IndianRupee, Printer, Target, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';

const InvestorReport = () => {
    const { feedbackData, tasks } = useContext(UserContext);

    // --- Metrics Calculation (Duplicated from Dashboard for report independence) ---
    const validationScore = Math.round(
        feedbackData.reduce((acc, curr) => acc + curr.value, 0) / (feedbackData.length || 1)
    );
    const doneTasks = tasks.filter(t => t.status === 'done').length;
    const totalTasks = tasks.length || 1;
    const executionScore = Math.round((doneTasks / totalTasks) * 100);
    const healthScore = Math.round((validationScore * 0.6) + (executionScore * 0.4));

    // Milestone Data
    // Live Milestone Data from Tasks
    const completedMilestones = tasks
        .filter(t => t.status === 'done')
        .slice(0, 5) // Show top 5 completed
        .map(t => ({
            item: t.content,
            date: "Just now", // In a real app, this would be t.completedAt
            status: "Completed"
        }));

    const upcomingMilestones = tasks
        .filter(t => t.status !== 'done')
        .slice(0, 3) // Show top 3 upcoming
        .map(t => ({
            item: t.content,
            phase: t.status === 'in-progress' ? "In Progress" : "Planned",
            status: "Planned"
        }));

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="report-container" style={{ maxWidth: '800px', margin: '2rem auto', background: 'white', padding: '3rem', BoxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>

            {/* Print Button (Hidden in Print) */}
            <div className="no-print" style={{ textAlign: 'right', marginBottom: '2rem' }}>
                <button onClick={handlePrint} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Printer size={16} /> Print Report
                </button>
            </div>

            {/* Header */}
            <div style={{ borderBottom: '2px solid var(--slate-900)', paddingBottom: '1.5rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1 }}>StartupOps</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--slate-500)', marginTop: '0.5rem' }}>Investor Update Report • Feb 2026</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary-blue)', lineHeight: 1 }}>{healthScore}/100</div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-400)', letterSpacing: '1px' }}>Health Score</p>
                </div>
            </div>

            {/* 1. Traction Highlights */}
            <div style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-400)', letterSpacing: '1px', marginBottom: '1rem' }}>Traction Highlights</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', background: 'var(--slate-50)', borderRadius: '0.5rem', border: '1px solid var(--slate-100)' }}>
                        <div style={{ color: 'var(--slate-400)', marginBottom: '0.5rem' }}><Users size={20} /></div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-800)' }}>1,240</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>Active Users</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'var(--slate-50)', borderRadius: '0.5rem', border: '1px solid var(--slate-100)' }}>
                        <div style={{ color: 'var(--accent-teal)', marginBottom: '0.5rem' }}><IndianRupee size={20} /></div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-800)' }}>₹4.2k</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>MRR (Recurring)</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'var(--slate-50)', borderRadius: '0.5rem', border: '1px solid var(--slate-100)' }}>
                        <div style={{ color: 'var(--accent-purple)', marginBottom: '0.5rem' }}><TrendingUp size={20} /></div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-800)' }}>+18%</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>MoM Growth</div>
                    </div>
                </div>
            </div>

            {/* 2. Validation & Market Fit */}
            <div style={{ marginBottom: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-400)', letterSpacing: '1px', marginBottom: '1rem' }}>Validation Analytics</h2>
                    <div style={{ height: '200px', border: '1px solid var(--slate-100)', borderRadius: '0.5rem', padding: '1rem' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                { day: 'W1', score: 65 }, { day: 'W2', score: 68 }, { day: 'W3', score: 75 },
                                { day: 'W4', score: 72 }, { day: 'W5', score: 80 }, { day: 'W6', score: 85 }
                            ]}>
                                <defs>
                                    <linearGradient id="colorReport" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary-blue)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--primary-blue)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                <Area type="monotone" dataKey="score" stroke="var(--primary-blue)" fillOpacity={1} fill="url(#colorReport)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                        <strong>Insight:</strong> Customer sentiment has trended positive for 6 consecutive weeks, indicating strong Problem-Solution fit.
                    </p>
                </div>
                <div>
                    <h2 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-400)', letterSpacing: '1px', marginBottom: '1rem' }}>Product Execution</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {completedMilestones.map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px dashed var(--slate-200)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CheckCircle size={16} className="text-green-600" />
                                    <span style={{ fontWeight: 500, color: 'var(--slate-800)' }}>{m.item}</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{m.date}</span>
                            </div>
                        ))}
                        {upcomingMilestones.map((m, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', opacity: 0.6 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Target size={16} className="text-slate-400" />
                                    <span style={{ fontWeight: 500, color: 'var(--slate-800)' }}>{m.item}</span>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>{m.phase}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--slate-100)', color: 'var(--slate-400)', fontSize: '0.75rem', textAlign: 'center' }}>
                Generated by StartupOps • The Operating System for Founders • {new Date().toLocaleDateString()}
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white; }
                    .report-container { box-shadow: none !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; }
                }
            `}</style>
        </div>
    );
};

export default InvestorReport;
