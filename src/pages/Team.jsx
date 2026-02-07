import React from 'react';
import { Mail, MoreHorizontal, Shield, User } from 'lucide-react';

const Team = () => {
    const teamMembers = [
        { id: 1, name: 'Alex Founder', role: 'Founder', email: 'alex@startupops.com', status: 'Active', tasks: 3, avatar: 'AF' },
        { id: 2, name: 'Sarah Engineer', role: 'Member', email: 'sarah@startupops.com', status: 'Active', tasks: 5, avatar: 'SE' },
        { id: 3, name: 'Mike Design', role: 'Member', email: 'mike@startupops.com', status: 'In Meeting', tasks: 2, avatar: 'MD' },
        { id: 4, name: 'Emily Growth', role: 'Member', email: 'emily@startupops.com', status: 'Offline', tasks: 0, avatar: 'EG' },
    ];

    return (
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            <div className="page-header flex">
                <div>
                    <h1 className="page-heading">Team & Roles</h1>
                    <p className="page-subheading">Manage your squad and assignments.</p>
                </div>
                <button className="btn btn-primary">Invite Member</button>
            </div>

            <div className="data-table-card">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Member</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Active Tasks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map((member) => (
                            <tr key={member.id}>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <div className="avatar-circle">
                                            {member.avatar}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 500, color: 'var(--slate-800)' }}>{member.name}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                                                <Mail size={10} />
                                                {member.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, border: '1px solid',
                                        backgroundColor: member.role === 'Founder' ? 'var(--bg-blue-50)' : 'var(--slate-100)',
                                        color: member.role === 'Founder' ? 'var(--text-blue-600)' : 'var(--slate-600)',
                                        borderColor: member.role === 'Founder' ? '#dbeafe' : 'var(--slate-200)'
                                    }}>
                                        {member.role === 'Founder' ? <Shield size={10} /> : <User size={10} />}
                                        {member.role}
                                    </div>
                                </td>
                                <td>
                                    <div className="status-badge" style={{ fontSize: '0.875rem', color: 'var(--slate-600)' }}>
                                        <div className={`status-dot ${member.status === 'Active' ? 'active' :
                                                member.status === 'In Meeting' ? 'meeting' : 'offline'
                                            }`}></div>
                                        {member.status}
                                    </div>
                                </td>
                                <td>
                                    {member.tasks} tasks assigned
                                </td>
                                <td className="text-center">
                                    <button style={{ padding: '0.5rem', borderRadius: '0.5rem', color: 'var(--slate-400)' }}>
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Team;
