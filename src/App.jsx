import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Validation from './pages/Validation';
import Team from './pages/Team';
import Settings from './pages/Settings';
import PitchDeck from './pages/PitchDeck';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="recommendation" element={<Validation />} />
        <Route path="team" element={<Team />} />
        <Route path="pitch" element={<PitchDeck />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
