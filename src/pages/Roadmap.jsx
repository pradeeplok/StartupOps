import React, { useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { initialTasks, columns as initialColumns, users } from '../data/mockData';
import KanbanColumn from '../components/KanbanColumn';
import KanbanCard from '../components/KanbanCard';
import { Plus, X } from 'lucide-react';

import { UserContext } from '../App';

const Roadmap = () => {
    const { tasks, setTasks } = React.useContext(UserContext);
    const [activeId, setActiveId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ content: '', milestone: 'MVP', assignee: 'AF' });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAddTask = () => {
        if (!newTask.content.trim()) return;
        const task = {
            id: `t${Date.now()}`,
            content: newTask.content,
            status: 'backlog',
            milestone: newTask.milestone,
            assignee: newTask.assignee
        };
        setTasks([...tasks, task]);
        setIsModalOpen(false);
        setNewTask({ content: '', milestone: 'MVP', assignee: 'AF' });
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id !== over.id) {
            const activeTask = tasks.find(t => t.id === active.id);
            const overTask = tasks.find(t => t.id === over.id);

            if (overTask) {
                setTasks((items) => {
                    const oldIndex = items.indexOf(activeTask);
                    const newIndex = items.indexOf(overTask);
                    const newItems = arrayMove(items, oldIndex, newIndex);
                    if (activeTask.status !== overTask.status) {
                        newItems[newIndex] = { ...newItems[newIndex], status: overTask.status };
                    }
                    return newItems;
                });
            } else {
                const columnId = over.id;
                setTasks((items) => {
                    return items.map(p => p.id === activeId ? { ...p, status: columnId } : p);
                });
            }
        }
        setActiveId(null);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeTask = tasks.find(t => t.id === active.id);

        if (initialColumns.map(c => c.id).includes(over.id)) {
            if (activeTask.status !== over.id) {
                setTasks(prev => prev.map(t => t.id === activeId ? { ...t, status: over.id } : t));
            }
        }
        else {
            const overTask = tasks.find(t => t.id === over.id);
            if (overTask && activeTask.status !== overTask.status) {
                setTasks(prev => prev.map(t => t.id === activeId ? { ...t, status: overTask.status } : t));
            }
        }
    };

    return (
        <div className="roadmap-container">
            <div className="roadmap-header">
                <div>
                    <h1 className="page-heading">Execution Roadmap</h1>
                    <div className="flex items-center gap-3">
                        <p className="page-subheading" style={{ marginBottom: 0 }}>Manage tasks across milestones and execution stages.</p>
                        <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Sync Active
                        </span>
                    </div>
                </div>
                {React.useContext(UserContext).userRole === 'founder' && (
                    <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                        <Plus size={18} />
                        New Task
                    </button>
                )}
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <div className="kanban-board">
                    {initialColumns.map((col) => {
                        const colTasks = tasks.filter(t => t.status === col.id);
                        return (
                            <div key={col.id} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <KanbanColumn
                                    column={col}
                                    tasks={colTasks}
                                />
                                {colTasks.length === 0 && (
                                    <div style={{ padding: '1rem', border: '2px dashed var(--slate-200)', borderRadius: '0.5rem', marginTop: '0.5rem', textAlign: 'center', color: 'var(--slate-400)' }}>
                                        <p style={{ fontSize: '0.875rem' }}>No tasks yet</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <DragOverlay>
                    {activeId ? <KanbanCard task={tasks.find(t => t.id === activeId)} /> : null}
                </DragOverlay>
            </DndContext>

            {/* New Task Modal */}
            {isModalOpen && (
                <div style={{
                    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50
                }}>
                    <div className="section-card" style={{ width: '100%', maxWidth: '500px', padding: '1.5rem', alignItems: 'stretch' }}>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="column-title" style={{ fontSize: '1.25rem' }}>Add New Task</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ color: 'var(--slate-400)' }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Task Description</label>
                                <input
                                    type="text"
                                    className="w-full"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', outline: 'none' }}
                                    placeholder="e.g. Design User Profile"
                                    value={newTask.content}
                                    onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                                />
                            </div>

                            <div className="grid-2" style={{ gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Milestone</label>
                                    <select
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', outline: 'none', background: 'white' }}
                                        value={newTask.milestone}
                                        onChange={(e) => setNewTask({ ...newTask, milestone: e.target.value })}
                                    >
                                        <option value="MVP">MVP</option>
                                        <option value="Beta">Beta</option>
                                        <option value="Growth">Growth</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.5rem' }}>Assignee</label>
                                    <select
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-light)', outline: 'none', background: 'white' }}
                                        value={newTask.assignee}
                                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                                    >
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                                <button className="btn btn-primary" onClick={handleAddTask}>Create Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Roadmap;
