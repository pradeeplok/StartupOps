import React from 'react';

const CircularProgress = ({ value, max = 100, size = 120, strokeWidth = 10, color = 'var(--primary-blue)', label, subLabel }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / max) * circumference;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        style={{ color: 'var(--slate-200)', transition: 'all 0.3s ease-in-out' }}
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    <circle
                        style={{ transition: 'all 0.5s ease-out' }}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke={color}
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                </svg>
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--slate-700)'
                }}>
                    <span style={{ fontSize: '1.875rem', fontWeight: 700 }}>{value}</span>
                    {subLabel && <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase' }}>{subLabel}</span>}
                </div>
            </div>
            {label && <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-600)' }}>{label}</div>}
        </div>
    );
};

export default CircularProgress;
