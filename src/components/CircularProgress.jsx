import React from 'react';

const CircularProgress = ({ value, max = 100, size = 120, strokeWidth = 10, color = 'var(--primary-blue)', label, subLabel }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / max) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="transform -rotate-90">
                    <circle
                        className="text-slate-200 transition-all duration-300 ease-in-out"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    <circle
                        className="transition-all duration-500 ease-out"
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
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-700">
                    <span className="text-3xl font-bold">{value}</span>
                    {subLabel && <span className="text-xs text-slate-500 uppercase">{subLabel}</span>}
                </div>
            </div>
            {label && <div className="mt-3 text-sm font-medium text-slate-600">{label}</div>}
        </div>
    );
};

export default CircularProgress;
