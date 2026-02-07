import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Validation from './pages/Validation';
import Finance from './pages/Finance';
import Team from './pages/Team';
import Settings from './pages/Settings';
import PitchDeck from './pages/PitchDeck';

import { initialTasks, columns as initialColumns, users } from './data/mockData';

import PublicValidation from './pages/PublicValidation';
import PublicRoadmap from './pages/PublicRoadmap';
import InvestorReport from './pages/InvestorReport';

// Simple User Context for Role-Based Access & Global State
export const UserContext = React.createContext();

function App() {
  const [userRole, setUserRole] = React.useState('founder'); // 'founder' | 'member'

  // Lifted State for Innovation "Loop"
  const [tasks, setTasks] = React.useState(initialTasks);
  const [feedbackData, setFeedbackData] = React.useState([
    { id: 101, label: 'Feature A', value: 80, sentiment: 'positive' }, // Added IDs
    { id: 102, label: 'Feature B', value: 45, sentiment: 'neutral' },
    { id: 103, label: 'Feature C', value: 20, sentiment: 'negative' },
    { id: 104, label: 'Pricing', value: 65, sentiment: 'positive' },
  ]);
  const [recentFeedback, setRecentFeedback] = React.useState([
    { id: 1, user: 'Sarah J.', comment: "Love the new dashboard layout!", sentiment: 'positive', date: '2h ago' },
    { id: 2, user: 'Mike T.', comment: "Can't find the export button.", sentiment: 'negative', date: '5h ago' },
    { id: 3, user: 'Alex R.', comment: "It's okay, but needs dark mode.", sentiment: 'neutral', date: '1d ago' },
  ]);

  // Recent Activity Log
  const [recentActivities, setRecentActivities] = React.useState([
    { id: 1, text: "Project initialized", type: "system", timestamp: new Date(Date.now() - 86400000).toLocaleString() }
  ]);

  // --- Theme State ---
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light');

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const logActivity = (text, type = 'system') => {
    const newActivity = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setRecentActivities(prev => [newActivity, ...prev].slice(0, 5)); // Keep last 5
  };

  const toggleRole = () => {
    setUserRole(prev => prev === 'founder' ? 'member' : 'founder');
  };

  const addFeedbackToRoadmap = (feedbackItem) => {
    const newTask = {
      id: `t${Date.now()}`,
      content: `Address Feedback: ${feedbackItem.comment || feedbackItem.label}`,
      status: 'backlog',
      milestone: 'Beta',
      assignee: 'AF'
    };
    setTasks(prev => [...prev, newTask]);
    logActivity(`Converted "${feedbackItem.label}" feedback to task`, 'task');
    alert("Feedback converted to Task and added to Roadmap!");
  };

  // --- Finance State & Logic ---
  const [financialData, setFinancialData] = React.useState({
    bankBalance: 124500,
    monthlyBurn: 15500,
    mrr: 4200
  });

  const updateFinancialData = (key, value) => {
    setFinancialData(prev => ({ ...prev, [key]: Number(value) }));
  };

  // --- Expense Logic ---
  const [expenses, setExpenses] = React.useState([
    { id: 1, category: 'Hosting', merchant: 'AWS Services', amount: 450, date: 'Feb 05', status: 'posted', frequency: 'monthly' },
    { id: 2, category: 'Payroll', merchant: 'Gusto', amount: 8500, date: 'Feb 01', status: 'posted', frequency: 'monthly' },
    { id: 3, category: 'Software', merchant: 'Slack', amount: 250, date: 'Jan 20', status: 'posted', frequency: 'monthly' },
    { id: 4, category: 'Marketing', merchant: 'Google Ads', amount: 1200, date: 'Jan 18', status: 'posted', frequency: 'one-time' },
    { id: 5, category: 'Software', merchant: 'Notion', amount: 50, date: 'Dec 15', status: 'posted', frequency: 'monthly' },
  ]);

  const addExpense = (newExpense) => {
    // 1. Add to list
    setExpenses(prev => [newExpense, ...prev]);

    // 2. Adjust Financials based on Frequency
    setFinancialData(prev => {
      const amount = Number(newExpense.amount);
      if (newExpense.frequency === 'monthly') {
        return { ...prev, monthlyBurn: prev.monthlyBurn + amount };
      } else {
        return { ...prev, bankBalance: prev.bankBalance - amount };
      }
    });

    logActivity(`Added ${newExpense.frequency} expense: ${newExpense.merchant} (-₹${newExpense.amount})`, 'finance');
  };

  const removeExpense = (id) => {
    const expense = expenses.find(e => e.id === id);
    if (!expense) return;

    // 1. Remove from list
    setExpenses(prev => prev.filter(e => e.id !== id));

    // 2. Revert Financials
    setFinancialData(prev => {
      const amount = Number(expense.amount);
      if (expense.frequency === 'monthly') {
        return { ...prev, monthlyBurn: Math.max(0, prev.monthlyBurn - amount) };
      } else {
        return { ...prev, bankBalance: prev.bankBalance + amount };
      }
    });

    logActivity(`Removed expense: ${expense.merchant}`, 'finance');
  };

  // --- Team State ---
  const [teamMembers, setTeamMembers] = React.useState([
    { id: 1, name: 'Alex Founder', role: 'Founder', email: 'alex@startupops.com', status: 'Active', tasks: 3, avatar: 'AF' },
    { id: 2, name: 'Sarah Engineer', role: 'Member', email: 'sarah@startupops.com', status: 'Active', tasks: 5, avatar: 'SE' },
    { id: 3, name: 'Mike Design', role: 'Member', email: 'mike@startupops.com', status: 'In Meeting', tasks: 2, avatar: 'MD' },
    { id: 4, name: 'Emily Growth', role: 'Member', email: 'emily@startupops.com', status: 'Offline', tasks: 0, avatar: 'EG' },
  ]);

  const addTeamMember = (member) => {
    setTeamMembers(prev => [...prev, member]);
  };

  const updateTeamMember = (id, updatedData) => {
    setTeamMembers(prev => prev.map(member =>
      member.id === id ? { ...member, ...updatedData } : member
    ));
  };

  const removeTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  // Dynamic Runway Calculation: Cash / (Burn - MRR)
  const netBurn = financialData.monthlyBurn - financialData.mrr;
  const runwayMonths = netBurn <= 0 ? 999 : Math.round(financialData.bankBalance / netBurn);

  return (
    <UserContext.Provider value={{
      userRole,
      toggleRole,
      theme,
      toggleTheme,
      tasks,
      setTasks,
      feedbackData,
      setFeedbackData,
      recentFeedback,
      setRecentFeedback,
      addFeedbackToRoadmap,
      // Finance State
      financialData,
      updateFinancialData,
      runwayMonths,
      expenses,
      addExpense,
      removeExpense,
      // Team State
      teamMembers,
      addTeamMember,
      updateTeamMember,
      removeTeamMember,
      // Activity
      recentActivities,
      logActivity
    }}>
      <Routes>
        <Route path="/validate/:id" element={<PublicValidation />} />
        <Route path="/roadmap/public/:id" element={<PublicRoadmap />} />
        <Route path="/report/investor" element={<InvestorReport />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="recommendation" element={<Validation />} />
          <Route path="finance" element={<Finance />} />
          <Route path="team" element={<Team />} />
          <Route path="pitch" element={<PitchDeck />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
