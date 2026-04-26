import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Trophy, User, Building2, LogOut } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Navbar = () => {
  const { role, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-nav">
      <div className="container flex items-center justify-between" style={{ height: '72px' }}>
        <div className="flex items-center gap-4">
          <div style={{ background: 'var(--accent-purple)', width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            C
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>CampusConnect</span>
        </div>

        <div className="flex items-center gap-8">
          {role === 'ambassador' ? (
            <>
              <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navLinkStyle}>
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>
              <NavLink to="/tasks" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navLinkStyle}>
                <CheckSquare size={18} /> Tasks
              </NavLink>
              <NavLink to="/leaderboard" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navLinkStyle}>
                <Trophy size={18} /> Leaderboard
              </NavLink>
              <NavLink to="/profile" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navLinkStyle}>
                <User size={18} /> Profile
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/admin" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`} style={navLinkStyle}>
                <Building2 size={18} /> Org Dashboard
              </NavLink>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="btn-secondary" onClick={handleLogout} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <LogOut size={16} /> Log Out
          </button>
          {role === 'ambassador' && (
            <div className="avatar avatar-sm">ME</div>
          )}
        </div>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'var(--text-muted)',
  fontWeight: 600,
  transition: 'color 0.3s',
};

// Add to index.css active state (simulated here with style)
// We will rely on inline styles or generic classes for simplicity
