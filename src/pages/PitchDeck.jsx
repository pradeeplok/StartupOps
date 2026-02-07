import React from 'react';
import { Presentation, CheckCircle, TrendingUp, Users, Target, Download, Copy } from 'lucide-react';

const PitchDeck = () => {
    // Mock Data (In a real app, this would come from a global store/context)
    const startupData = {
        name: "StartupOps",
        tagline: "The Operating System for Early-Stage Founders",
        problem: "Founders struggle to manage execution, validation, and team alignment in fragmented tools.",
        solution: "A unified workspace combining Roadmap, Validation, and Team management into one dashboard.",
        traction: {
            users: "1,240 Active Users",
            mrr: "$4.2k MRR",
            growth: "18% MoM Growth"
        },
        roadmap: [
            { phase: "Now", item: "MVP Launch (Completed)" },
            { phase: "Next", item: "Mobile App Beta" },
            { phase: "Later", item: "Enterprise API Integration" }
        ]
    };

    const handleCopy = () => {
        alert("Pitch outline copied to clipboard!");
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="page-header flex">
                <div>
                    <h1 className="page-heading">Investor Pitch Generator</h1>
                    <p className="page-subheading">Auto-generated pitch deck outline based on your live startup data.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" onClick={handleCopy}>
                        <Copy size={16} /> Copy Text
                    </button>
                    <button className="btn btn-primary">
                        <Download size={16} /> Export PDF
                    </button>
                </div>
            </div>

            <div style={{
                background: 'white',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden'
            }}>
                {/* 1. Title Slide */}
                <div style={{ padding: '3rem', borderBottom: '1px solid var(--slate-100)', textAlign: 'center', background: 'linear-gradient(to bottom, var(--slate-50), white)' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--primary-blue)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800, margin: '0 auto 1.5rem auto' }}>
                        {startupData.name[0]}
                    </div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '0.5rem' }}>{startupData.name}</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--slate-500)' }}>{startupData.tagline}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

                    {/* 2. Problem */}
                    <div style={{ padding: '2rem', borderRight: '1px solid var(--slate-100)', borderBottom: '1px solid var(--slate-100)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangleIcon /></div>
                            <h3 className="text-lg font-bold text-slate-800">The Problem</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{startupData.problem}</p>
                    </div>

                    {/* 3. Solution */}
                    <div style={{ padding: '2rem', borderBottom: '1px solid var(--slate-100)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={20} /></div>
                            <h3 className="text-lg font-bold text-slate-800">The Solution</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{startupData.solution}</p>
                    </div>

                    {/* 4. Traction */}
                    <div style={{ padding: '2rem', borderRight: '1px solid var(--slate-100)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><TrendingUp size={20} /></div>
                            <h3 className="text-lg font-bold text-slate-800">Traction & Metrics</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <Users size={16} className="text-slate-400" />
                                <span className="font-semibold text-slate-700">{startupData.traction.users}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-400">₹</span>
                                <span className="font-semibold text-slate-700">{startupData.traction.mrr}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <TrendingUp size={16} className="text-slate-400" />
                                <span className="font-semibold text-slate-700">{startupData.traction.growth}</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Roadmap */}
                    <div style={{ padding: '2rem' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Target size={20} /></div>
                            <h3 className="text-lg font-bold text-slate-800">Roadmap</h3>
                        </div>
                        <div className="space-y-3">
                            {startupData.roadmap.map((item, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 w-12 pt-1">{item.phase}</span>
                                    <span className="text-slate-700 font-medium">{item.item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Simple Icon component for Problem section
const AlertTriangleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
);

export default PitchDeck;
