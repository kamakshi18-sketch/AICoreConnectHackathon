import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Navbar } from './components/Layout/Navbar';

// Pages
import { Dashboard } from './pages/Ambassador/Dashboard';
import { TaskBoard } from './pages/Ambassador/TaskBoard';
import { Leaderboard } from './pages/Ambassador/Leaderboard';
import { Profile } from './pages/Ambassador/Profile';
import { OrgDashboard } from './pages/Admin/OrgDashboard';
import { Login } from './pages/Auth/Login';

const AppRoutes = () => {
  const { role, isAuthenticated } = useAppContext();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        {role === 'ambassador' ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskBoard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/admin" element={<OrgDashboard />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
