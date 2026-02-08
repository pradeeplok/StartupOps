import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, BarChart3, Users, Settings, LogOut, Presentation, DollarSign, Sun, Moon, TrendingUp, ListTodo } from 'lucide-react';

import { UserContext } from '../App';

const Layout = () => {
    const { userRole, toggleRole, theme, toggleTheme, logout } = React.useContext(UserContext);

    const allNavItems = [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Validation', path: '/dashboard/recommendation', icon: TrendingUp },
        { label: 'Roadmap', path: '/dashboard/roadmap', icon: ListTodo },
        { label: 'Finance', path: '/dashboard/finance', icon: DollarSign },
        { label: 'Team & Roles', path: '/dashboard/team', icon: Users },
        { label: 'Pitch Generator', path: '/dashboard/pitch', icon: Presentation, roles: ['founder'] },
    ];

    const navItems = allNavItems.filter(item => !item.roles || item.roles.includes(userRole));

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="brand">
                        <div className="brand-logo">S</div>
                        <span className="brand-name">StartupOps</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section-label">Workspace</div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `nav-item ${isActive ? 'active' : ''}`
                            }
                        >
                            <item.icon size={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button onClick={toggleRole} className="footer-btn" style={{ marginBottom: '0.5rem', background: 'var(--slate-100)', justifyContent: 'center', fontSize: '0.75rem' }}>
                        Switch to: {userRole === 'founder' ? 'Member' : 'Founder'}
                    </button>
                    <NavLink to="/settings" className={({ isActive }) => `footer-btn ${isActive ? 'active' : ''}`} style={{ textDecoration: 'none' }}>
                        <Settings size={18} />
                        Settings
                    </NavLink>
                    <button className="footer-btn logout" onClick={() => {
                        logout();
                        window.location.href = '/login';
                    }}>
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
                <header className="top-header">
                    <h2 className="page-title">Workspace</h2>
                    <div className="header-actions">
                        <div className="text-sm text-slate-500">Last synced: Just now</div>
                        <button
                            onClick={toggleTheme}
                            style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                background: 'var(--slate-100)',
                                color: 'var(--slate-700)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slate-200)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--slate-100)'}
                        >
                            <div style={{
                                display: 'flex',
                                animation: 'flipFade 0.6s ease-in-out',
                                transformOrigin: 'center'
                            }}>
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </div>
                        </button>
                        <div className="user-avatar"></div>
                    </div>
                </header>
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
