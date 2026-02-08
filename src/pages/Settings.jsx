import React, { useState } from 'react';
import { Save, Upload, Building, Globe } from 'lucide-react';

const Settings = () => {
    const [formData, setFormData] = useState({
        startupName: 'StartupOps',
        website: 'https://startupops.com',
        industry: 'SaaS',
        stage: 'Seed',
        description: 'A unified digital workspace for early-stage founders.'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="page-header">
                <h1 className="page-heading">Startup Settings</h1>
                <p className="page-subheading">Manage your startup profile and workspace preferences.</p>
            </div>

            <div className="section-card" style={{ alignItems: 'flex-start', padding: '2rem' }}>
                <h3 className="column-title" style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Startup Profile</h3>

                <div style={{ display: 'flex', gap: '2rem', width: '100%', marginBottom: '2rem' }}>
                    {/* Logo Upload Placeholder */}
                    <div style={{ flexShrink: 0 }}>
                        <div style={{
                            width: '100px', height: '100px', borderRadius: '0.75rem', backgroundColor: 'var(--slate-100)',
                            border: '1px dashed var(--slate-300)', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', color: 'var(--slate-500)', cursor: 'pointer'
                        }}>
                            <Upload size={24} />
                            <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>Upload Logo</span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Startup Name</label>
                            <div style={{ position: 'relative' }}>
                                <Building size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                                <input
                                    type="text"
                                    name="startupName"
                                    value={formData.startupName}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem',
                                        border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--slate-800)', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Website URL</label>
                            <div style={{ position: 'relative' }}>
                                <Globe size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }} />
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '0.5rem',
                                        border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--slate-800)', outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid-2" style={{ gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Industry</label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                        border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--slate-800)', outline: 'none', background: 'white'
                                    }}
                                >
                                    <option>SaaS</option>
                                    <option>Fintech</option>
                                    <option>HealthTech</option>
                                    <option>E-commerce</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Stage</label>
                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                        border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--slate-800)', outline: 'none', background: 'white'
                                    }}
                                >
                                    <option>Pre-Seed</option>
                                    <option>Seed</option>
                                    <option>Series A</option>
                                    <option>Series B</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Short Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                style={{
                                    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                    border: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--slate-800)', outline: 'none', resize: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', paddingTop: '2rem', borderTop: '1px solid var(--border-light)' }}>
                    <button className="btn btn-primary">
                        <Save size={18} />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
