import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Map, BarChart3, Users, Settings, LogOut, Presentation, DollarSign } from 'lucide-react';

import { UserContext } from '../App';

const Layout = () => {
    const { userRole, toggleRole } = React.useContext(UserContext);

    const navItems = [
        { label: 'Command Center', path: '/', icon: LayoutDashboard },
        { label: 'Execution Roadmap', path: '/roadmap', icon: Map },
        { label: 'Recommendation Engine', path: '/recommendation', icon: BarChart3 },
        { label: 'Finance & Runway', path: '/finance', icon: DollarSign },
        { label: 'Team & Roles', path: '/team', icon: Users },
        { label: 'Pitch Generator', path: '/pitch', icon: Presentation },
    ];

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
                    <button className="footer-btn logout">
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
