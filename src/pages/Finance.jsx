import React from 'react';
import {
    IndianRupee, TrendingDown, TrendingUp, AlertCircle, PieChart, ArrowDownRight, Edit2, Check, X
} from 'lucide-react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { UserContext } from '../App';

const Finance = () => {
    const { financialData, updateFinancialData, runwayMonths, userRole } = React.useContext(UserContext);
    const [editingField, setEditingField] = React.useState(null); // 'bankBalance', 'monthlyBurn', 'mrr'
    const [tempValue, setTempValue] = React.useState('');

    // Generate Projection Data (Next 12 Months)
    const generateProjection = () => {
        const data = [];
        let currentCash = financialData.bankBalance;
        const netBurn = financialData.monthlyBurn - financialData.mrr;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonthIndex = new Date().getMonth();

        for (let i = 0; i < 12; i++) {
            const monthLabel = monthNames[(currentMonthIndex + i) % 12];
            // Simple projection: Cash decreases by net burn
            // If profitable (Net Burn < 0), Cash increases.

            data.push({
                name: monthLabel,
                Balance: Math.max(0, currentCash), // Don't show negative cash
                Revenue: financialData.mrr,
                Expenses: financialData.monthlyBurn
            });

            currentCash -= netBurn;
        }
        return data;
    };

    const projectionData = React.useMemo(() => generateProjection(), [financialData.bankBalance, financialData.monthlyBurn, financialData.mrr]);

    // Mock Expenses (Static for now)
    const expenses = [
        { id: 1, category: 'Hosting', merchant: 'AWS Services', amount: 450, date: 'Oct 24', status: 'posted' },
        { id: 2, category: 'Payroll', merchant: 'Gusto', amount: 8500, date: 'Oct 22', status: 'posted' },
        { id: 3, category: 'Software', merchant: 'Slack', amount: 250, date: 'Oct 20', status: 'posted' },
        { id: 4, category: 'Marketing', merchant: 'Google Ads', amount: 1200, date: 'Oct 18', status: 'pending' },
        { id: 5, category: 'Software', merchant: 'Notion', amount: 50, date: 'Oct 15', status: 'posted' },
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const startEditing = (field, currentValue) => {
        setEditingField(field);
        setTempValue(currentValue);
    };

    const saveEdit = () => {
        if (tempValue && !isNaN(tempValue)) {
            updateFinancialData(editingField, tempValue);
        }
        setEditingField(null);
    };

    const cancelEdit = () => {
        setEditingField(null);
    };

    // Helper Component for Editable Stat
    const EditableStat = ({ label, field, value, icon: Icon, colorClass }) => {
        const isEditing = editingField === field;

        return (
            <div className={`stat-card ${field === 'runway' && value < 6 ? 'border-red-200 bg-red-50' : ''}`}>
                <div className={`stat-icon ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <div style={{ flex: 1 }}>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                autoFocus
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                style={{
                                    width: '100%', padding: '0.25rem', fontSize: '1.25rem', fontWeight: 700,
                                    border: '1px solid var(--primary-blue)', borderRadius: '4px', outline: 'none'
                                }}
                            />
                            <button onClick={saveEdit} className="text-green-600 hover:text-green-700"><Check size={20} /></button>
                            <button onClick={cancelEdit} className="text-red-500 hover:text-red-600"><X size={20} /></button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <div className={`stat-value ${field === 'runway' && value < 6 ? 'text-red-600' : ''}`}>
                                {field === 'runway' ? `${value} Months` : formatCurrency(value)}
                            </div>
                            {userRole === 'founder' && field !== 'runway' && (
                                <button
                                    onClick={() => startEditing(field, value)}
                                    className="p-1 text-slate-400 hover:text-primary-blue transition-colors"
                                    title="Edit Value"
                                >
                                    <Edit2 size={14} />
                                </button>
                            )}
                        </div>
                    )}
                    <div className="stat-label">{label}</div>
                </div>
            </div>
        );
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
                <EditableStat
                    label="Total Cash"
                    field="bankBalance"
                    value={financialData.bankBalance}
                    icon={IndianRupee}
                    colorClass="blue"
                />
                <EditableStat
                    label="Monthly Burn"
                    field="monthlyBurn"
                    value={financialData.monthlyBurn}
                    icon={TrendingDown}
                    colorClass="orange"
                />
                <EditableStat
                    label="MRR (Revenue)"
                    field="mrr"
                    value={financialData.mrr}
                    icon={TrendingUp}
                    colorClass="green"
                />
                <EditableStat
                    label="Runway Left"
                    field="runway"
                    value={runwayMonths}
                    icon={PieChart}
                    colorClass="purple"
                />
            </div>

            <div className="grid-2">
                {/* Dynamic Cash Flow Chart */}
                <div className="section-card" style={{ display: 'block' }}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="column-title">Runway Projection</h3>
                        <span className="text-sm text-slate-500">Next 12 Months</span>
                    </div>

                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <ComposedChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => formatCurrency(value)}
                                />
                                <Legend />
                                <Bar dataKey="Revenue" barSize={10} fill="#22c55e" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="Expenses" barSize={10} fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                <Area type="monotone" dataKey="Balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={2} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="section-card">
                    <h3 className="column-title" style={{ marginBottom: '1.5rem' }}>Recent Expenses</h3>
                    <div className="flex flex-col gap-0">
                        {expenses.map((expense) => (
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
            {runwayMonths < 9 && (
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
