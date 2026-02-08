import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

const KanbanCard = ({ task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getMilestoneClass = (milestone) => {
        switch (milestone) {
            case 'MVP': return 'milestone-badge mvp';
            case 'Beta': return 'milestone-badge beta';
            case 'Growth': return 'milestone-badge growth';
            default: return 'milestone-badge';
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="kanban-card group"
        >
            <div className="card-tags">
                <span className={getMilestoneClass(task.milestone)}>
                    {task.milestone}
                </span>
                <button style={{ color: 'var(--slate-400)' }}>
                    <GripVertical size={14} />
                </button>
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-800)' }}>{task.content}</p>
        </div>
    );
};

export default KanbanCard;
