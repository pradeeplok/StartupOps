import React from 'react';
import { IndianRupee, TrendingDown, TrendingUp, AlertCircle, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Finance = () => {
    // Mock Data
    const financialData = {
        bankBalance: 124500,
        monthlyBurn: 15500,
        mrr: 4200,
        runwayMonths: 8,
        expenses: [
            { id: 1, category: 'Hosting', merchant: 'AWS Services', amount: 450, date: 'Oct 24', status: 'posted' },
            { id: 2, category: 'Payroll', merchant: 'Gusto', amount: 8500, date: 'Oct 22', status: 'posted' },
            { id: 3, category: 'Software', merchant: 'Slack', amount: 250, date: 'Oct 20', status: 'posted' },
            { id: 4, category: 'Marketing', merchant: 'Google Ads', amount: 1200, date: 'Oct 18', status: 'pending' },
            { id: 5, category: 'Software', merchant: 'Notion', amount: 50, date: 'Oct 15', status: 'posted' },
        ]
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
            <div className="page-header flex">
                <div>
                    <h1 className="page-heading">Financial Overview</h1>
                    <p className="page-subheading">Track burn rate, runway, and operational expenses.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary">
                        Export Report
                    </button>
                    <button className="btn btn-primary">
                        <IndianRupee size={16} /> Add Expense
                    </button>
                </div>
            </div>

            {/* Top Metrics Grid */}
            <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                <div className="stat-card">
                    <div className="stat-icon blue">
                        <IndianRupee size={24} />
                    </div>
                    <div>
                        <div className="stat-value">{formatCurrency(financialData.bankBalance)}</div>
                        <div className="stat-label">Total Cash</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <div className="stat-value">{formatCurrency(financialData.monthlyBurn)}</div>
                        <div className="stat-label">Monthly Burn</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="stat-value">{formatCurrency(financialData.mrr)}</div>
                        <div className="stat-label">MRR (Revenue)</div>
                    </div>
                </div>

                <div className={`stat-card ${financialData.runwayMonths < 6 ? 'border-red-200 bg-red-50' : ''}`}>
                    <div className="stat-icon purple">
                        <PieChart size={24} />
                    </div>
                    <div>
                        <div className={`stat-value ${financialData.runwayMonths < 6 ? 'text-red-600' : ''}`}>{financialData.runwayMonths} Months</div>
                        <div className="stat-label">Runway Left</div>
                    </div>
                </div>
            </div>

            <div className="grid-2">
                {/* Burn vs Revenue Chart (Simulated) */}
                <div className="section-card">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="column-title">Net Burn Projection</h3>
                        <span className="text-sm text-slate-500">Last 6 Months</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--slate-100)' }}>
                        {[65, 70, 68, 75, 80, 85].map((h, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                                <div style={{ width: '100%', height: `${h}%`, background: 'var(--slate-200)', borderRadius: '4px' }}></div>
                                <div style={{ width: '100%', height: `${h * 0.4}%`, background: 'var(--success)', borderRadius: '4px', marginTop: '-100%' }}></div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.5rem' }}>{['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][i]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-slate-500">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded"></div> Expenses</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div> Revenue</div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="section-card">
                    <h3 className="column-title" style={{ marginBottom: '1.5rem' }}>Recent Expenses</h3>
                    <div className="flex flex-col gap-0">
                        {financialData.expenses.map((expense) => (
                            <div key={expense.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1rem 0',
                                borderBottom: '1px solid var(--slate-100)'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--slate-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '1rem'
                                }}>
                                    <ArrowDownRight size={20} className="text-slate-500" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{expense.merchant}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>{expense.category} • {expense.date}</div>
                                </div>
                                <div style={{ fontWeight: 600, color: 'var(--slate-800)' }}>
                                    - {formatCurrency(expense.amount)}
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-secondary w-full mt-4">View All Transactions</button>
                    </div>
                </div>
            </div>

            {/* Smart Alert */}
            {financialData.runwayMonths < 9 && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-red-50)', border: '1px solid var(--danger-border)', borderRadius: '0.5rem', display: 'flex', alignItems: 'start', gap: '1rem' }}>
                    <AlertCircle className="text-red-600 shrink-0" />
                    <div>
                        <h4 className="text-red-800 font-bold mb-1">Runway Alert</h4>
                        <p className="text-red-600 text-sm">Your runway is currently under 9 months. It is recommended to start preparing your fundraising materials.</p>
                        <button className="text-red-800 text-sm font-bold underline mt-2">Go to Pitch Generator</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Finance;
