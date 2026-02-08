export const initialTasks = [
    { id: 't1', content: 'Define MVP Features', status: 'done', milestone: 'MVP', assignee: 'AF' },
    { id: 't2', content: 'Set up Database Schema', status: 'done', milestone: 'MVP', assignee: 'SE' },
    { id: 't3', content: 'Implement Authentication', status: 'in-progress', milestone: 'MVP', assignee: 'SE' },
    { id: 't4', content: 'Design Landing Page', status: 'todo', milestone: 'MVP', assignee: 'MD' },
    { id: 't5', content: 'User feedback interviews', status: 'todo', milestone: 'Beta', assignee: 'AF' },
    { id: 't6', content: 'Performance Optimization', status: 'backlog', milestone: 'Beta', assignee: 'SE' },
    { id: 't7', content: 'Mobile App Wireframes', status: 'backlog', milestone: 'Growth', assignee: 'MD' },
];

export const users = [
    { id: 'AF', name: 'Alex Founder', avatar: 'AF', color: 'bg-blue-200 text-blue-700' },
    { id: 'SE', name: 'Sarah Engineer', avatar: 'SE', color: 'bg-green-200 text-green-700' },
    { id: 'MD', name: 'Mike Design', avatar: 'MD', color: 'bg-purple-200 text-purple-700' },
    { id: 'EG', name: 'Emily Growth', avatar: 'EG', color: 'bg-orange-200 text-orange-700' },
];

export const columns = [
    { id: 'backlog', title: 'Backlog' },
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
];
