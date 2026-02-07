import React from 'react';
import { UserContext } from '../App';
import { Mail, MoreHorizontal, Shield, User } from 'lucide-react';

const Team = () => {
    const { teamMembers, addTeamMember } = React.useContext(UserContext);
    const [showModal, setShowModal] = React.useState(false);
    const [newMember, setNewMember] = React.useState({ name: '', email: '', role: 'Member', customRole: '' });

    const handleAddMember = (e) => {
        e.preventDefault();
        const roleToUse = newMember.role === 'Custom' ? newMember.customRole : newMember.role;
        if (!newMember.name || !roleToUse) return;

        addTeamMember({
            id: Date.now(),
            name: newMember.name,
            email: newMember.email,
            role: roleToUse,
            status: 'Active',
            tasks: 0,
            avatar: newMember.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        });
        setShowModal(false);
        setNewMember({ name: '', email: '', role: 'Member', customRole: '' });
    };

    const handleInvite = () => {
        alert("Invitation email sent! 📧");
    };

    return (
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
            <div className="page-header flex">
                <div>
                    <h1 className="page-heading">Team & Roles</h1>
                    <p className="page-subheading">Manage your squad and assignments.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setShowModal(true)} className="btn btn-primary">Add Member</button>
                    <button onClick={handleInvite} className="btn btn-secondary">Invite Member</button>
                </div>
            </div>

            {/* Add Member Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <h3 className="text-lg font-bold mb-4">Add Team Member</h3>
                        <form onSubmit={handleAddMember} className="flex flex-col gap-4">
                            <input
                                placeholder="Full Name"
                                value={newMember.name}
                                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                className="p-2 border rounded"
                                autoFocus
                            />
                            <input
                                placeholder="Email Address"
                                value={newMember.email}
                                onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                                className="p-2 border rounded"
                            />
                            <select
                                value={newMember.role}
                                onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                                className="p-2 border rounded"
                            >
                                <option value="Member">Member</option>
                                <option value="Founder">Founder</option>
                                <option value="Custom">Custom Role...</option>
                            </select>

                            {newMember.role === 'Custom' && (
                                <input
                                    placeholder="Enter Custom Role (e.g. Growth Hacker)"
                                    value={newMember.customRole}
                                    onChange={e => setNewMember({ ...newMember, customRole: e.target.value })}
                                    className="p-2 border rounded border-blue-300 bg-blue-50"
                                />
                            )}

                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                                    <div className="status-badge" style={{ fontSize: '0.875rem', color: 'var(--slate-600)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
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
