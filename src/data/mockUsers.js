// Mock user database for authentication
export const mockUsers = [
    {
        id: 1,
        email: 'founder@startupops.com',
        password: 'demo123',
        role: 'founder',
        name: 'Alex Foster',
        company: 'StartupOps'
    },
    {
        id: 2,
        email: 'member@startupops.com',
        password: 'demo123',
        role: 'member',
        name: 'Jane Smith',
        company: 'StartupOps'
    }
];

// Simulate authentication
export const authenticateUser = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    return user || null;
};

// Simulate user registration
export const registerUser = (userData) => {
    const newUser = {
        id: mockUsers.length + 1,
        email: userData.email,
        password: userData.password,
        role: 'founder', // New signups are founders
        name: userData.name,
        company: userData.company
    };
    mockUsers.push(newUser);
    return newUser;
};
