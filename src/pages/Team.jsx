import React from 'react';
import { UserContext } from '../App';
import { Mail, MoreHorizontal, Shield, User } from 'lucide-react';

const Team = () => {
    const { teamMembers, addTeamMember, updateTeamMember, removeTeamMember, userRole } = React.useContext(UserContext);
    const [showModal, setShowModal] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [currentMemberId, setCurrentMemberId] = React.useState(null);
    const [memberForm, setMemberForm] = React.useState({ name: '', email: '', role: 'Member', customRole: '', status: 'Active', tasks: 0 });

    const openAddModal = () => {
        setIsEditing(false);
        setMemberForm({ name: '', email: '', role: 'Member', customRole: '', status: 'Active', tasks: 0 });
        setShowModal(true);
    };

    const openEditModal = (member) => {
        setIsEditing(true);
        setCurrentMemberId(member.id);
        const isCustom = member.role !== 'Founder' && member.role !== 'Member';
        setMemberForm({
            name: member.name,
            email: member.email,
            role: isCustom ? 'Custom' : member.role,
            customRole: isCustom ? member.role : '',
            status: member.status,
            tasks: member.tasks
        });
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        const roleToUse = memberForm.role === 'Custom' ? memberForm.customRole : memberForm.role;

        if (isEditing) {
            updateTeamMember(currentMemberId, {
                ...memberForm,
                role: roleToUse,
                avatar: memberForm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
            });
        } else {
            if (!memberForm.name || !roleToUse) return;
            addTeamMember({
                id: Date.now(),
                ...memberForm,
                role: roleToUse,
                avatar: memberForm.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
            });
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this team member?")) {
            removeTeamMember(id);
        }
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
                    <button onClick={openAddModal} className="btn btn-primary">Add Member</button>
                    <button onClick={handleInvite} className="btn btn-secondary">Invite Member</button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', width: '400px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                        <h3 className="text-lg font-bold mb-4">{isEditing ? 'Edit Member' : 'Add Team Member'}</h3>
                        <form onSubmit={handleSave} className="flex flex-col gap-4">
                            <input
                                placeholder="Full Name"
                                value={memberForm.name}
                                onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                                className="p-2 border rounded"
                                autoFocus
                            />
                            <input
                                placeholder="Email Address"
                                value={memberForm.email}
                                onChange={e => setMemberForm({ ...memberForm, email: e.target.value })}
                                className="p-2 border rounded"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={memberForm.role}
                                    onChange={e => setMemberForm({ ...memberForm, role: e.target.value })}
                                    className="p-2 border rounded"
                                >
                                    <option value="Member">Member</option>
                                    <option value="Founder">Founder</option>
                                    <option value="Custom">Custom Role...</option>
                                </select>
                                <select
                                    value={memberForm.status}
                                    onChange={e => setMemberForm({ ...memberForm, status: e.target.value })}
                                    className="p-2 border rounded"
                                >
                                    <option value="Active">Active</option>
                                    <option value="In Meeting">In Meeting</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>

                            {memberForm.role === 'Custom' && (
                                <input
                                    placeholder="Enter Custom Role (e.g. Growth Hacker)"
                                    value={memberForm.customRole}
                                    onChange={e => setMemberForm({ ...memberForm, customRole: e.target.value })}
                                    className="p-2 border rounded border-blue-300 bg-blue-50"
                                />
                            )}

                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-slate-600">Active Tasks:</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={memberForm.tasks}
                                    onChange={e => setMemberForm({ ...memberForm, tasks: Number(e.target.value) })}
                                    className="p-2 border rounded w-full"
                                />
                            </div>

                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                                <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Member'}</button>
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
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamMembers.map((member) => {
                            // Permission Logic
                            const isFounder = userRole === 'founder';
                            const targetIsFounder = member.role === 'Founder';
                            const canEdit = isFounder || (!isFounder && !targetIsFounder);
                            const canDelete = isFounder;

                            return (
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
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {canEdit && (
                                                <button
                                                    onClick={() => openEditModal(member)}
                                                    className="text-slate-400 hover:text-blue-600 p-1"
                                                    title="Edit Details"
                                                >
                                                    <MoreHorizontal size={18} />
                                                </button>
                                            )}
                                            {canDelete && (
                                                <button
                                                    onClick={() => handleDelete(member.id)}
                                                    className="text-slate-300 hover:text-red-500 p-1 hover:bg-red-50 rounded"
                                                    title="Remove Member"
                                                >
                                                    <span style={{ fontSize: '1.2rem', lineHeight: 0.5 }}>×</span>
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Team;
