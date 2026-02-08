import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ column, tasks }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div className="kanban-column">
            <div className="column-header">
                <h3 className="column-title">{column.title}</h3>
                <span className="column-count">{tasks.length}</span>
            </div>

            <div ref={setNodeRef} className="task-list">
                <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <KanbanCard key={task.id} task={task} />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div style={{
                        height: '6rem',
                        border: '2px dashed var(--slate-200)',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--slate-400)',
                        fontSize: '0.75rem'
                    }}>
                        Drop tasks here
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;
