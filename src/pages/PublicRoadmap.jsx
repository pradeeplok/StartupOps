import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Map } from 'lucide-react';

const PublicRoadmap = () => {
    const { tasks } = useContext(UserContext);

    // Group tasks by status for a simple board view
    const statuses = [
        { id: 'backlog', label: 'Backlog', color: 'bg-slate-100', text: 'text-slate-700' },
        { id: 'todo', label: 'To Do', color: 'bg-blue-50', text: 'text-blue-700' },
        { id: 'in-progress', label: 'In Progress', color: 'bg-amber-50', text: 'text-amber-700' },
        { id: 'done', label: 'Completed', color: 'bg-green-50', text: 'text-green-700' }
    ];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 justify-center mb-4 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                    <Map size={16} /> Public Roadmap
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 mb-4">StartupOps Journey</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    We believe in radical transparency. See what we are building, what's coming next, and how your feedback is shaping our product.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {statuses.map(status => {
                    const statusTasks = tasks.filter(t => t.status === status.id);
                    return (
                        <div key={status.id} className="flex flex-col h-full">
                            <div className={`flex items-center justify-between px-4 py-3 rounded-t-lg ${status.color} border-b border-white`}>
                                <h3 className={`font-bold ${status.text}`}>{status.label}</h3>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white ${status.text} opacity-80`}>
                                    {statusTasks.length}
                                </span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-b-lg flex-1 border border-slate-100">
                                {statusTasks.length === 0 ? (
                                    <div className="text-center py-8 text-slate-400 italic text-sm">No tasks currently</div>
                                ) : (
                                    <div className="space-y-3">
                                        {statusTasks.map(task => (
                                            <div key={task.id} className="bg-white p-3 rounded-md shadow-sm border border-slate-200">
                                                <p className="text-slate-700 font-medium text-sm mb-2">{task.content}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-slate-400 px-1.5 py-0.5 bg-slate-100 rounded">
                                                        {task.milestone}
                                                    </span>
                                                    {task.assignee && (
                                                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 font-bold">
                                                            {task.assignee.substring(0, 2)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-16 text-center border-t border-slate-200 pt-8">
                <p className="text-slate-500 text-sm">Want to contribute? <a href="/validate/startupops" className="text-blue-600 hover:align-top font-semibold">Validation Page &rarr;</a></p>
            </div>
        </div>
    );
};

export default PublicRoadmap;
