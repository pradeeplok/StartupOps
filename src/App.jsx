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
    alert("Feedback converted to Task and added to Roadmap!");
  };

  return (
    <UserContext.Provider value={{
      userRole,
      toggleRole,
      tasks,
      setTasks,
      feedbackData,
      setFeedbackData,
      recentFeedback,
      setRecentFeedback,
      addFeedbackToRoadmap
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
