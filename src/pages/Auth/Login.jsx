import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export const Login = () => {
  const { login } = useAppContext();
  
  const [activeTab, setActiveTab] = useState('ambassador'); // 'ambassador' or 'admin'
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const success = login(userId, password, activeTab);
    if (!success) {
      setError('Invalid ID or Password. Please try again.');
    }
  };

  return (
    <div className="container flex items-center justify-center h-full" style={{ minHeight: '100vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px' }}>
        
        <div className="text-center mb-8">
          <div style={{ background: 'var(--accent-purple)', width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.5rem', margin: '0 auto 16px auto' }}>
            C
          </div>
          <h2>CampusConnect</h2>
          <p className="text-muted">Welcome to the Ambassador Portal</p>
        </div>

        <div className="flex mb-8" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px' }}>
          <button 
            className="w-full"
            style={{ 
              padding: '10px', 
              borderRadius: '6px',
              background: activeTab === 'ambassador' ? 'var(--card-bg)' : 'transparent',
              color: activeTab === 'ambassador' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'ambassador' ? 'bold' : 'normal',
              boxShadow: activeTab === 'ambassador' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
            onClick={() => { setActiveTab('ambassador'); setError(''); setUserId(''); setPassword(''); }}
          >
            Ambassador
          </button>
          <button 
            className="w-full"
            style={{ 
              padding: '10px', 
              borderRadius: '6px',
              background: activeTab === 'admin' ? 'var(--card-bg)' : 'transparent',
              color: activeTab === 'admin' ? 'var(--text-main)' : 'var(--text-muted)',
              fontWeight: activeTab === 'admin' ? 'bold' : 'normal',
              boxShadow: activeTab === 'admin' ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
            }}
            onClick={() => { setActiveTab('admin'); setError(''); setUserId(''); setPassword(''); }}
          >
            Organizer
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm" style={{ background: 'rgba(255, 107, 107, 0.1)', color: 'var(--accent-coral)', borderLeft: '4px solid var(--accent-coral)', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-col gap-6">
          <div>
            <label className="text-sm text-muted mb-2 block">
              {activeTab === 'ambassador' ? 'Ambassador ID' : 'Organizer ID'}
            </label>
            <input 
              type="text" 
              className="w-full" 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={`Enter your ${activeTab === 'ambassador' ? 'ambassador' : 'organizer'} ID`}
              required 
            />
          </div>

          <div>
            <label className="text-sm text-muted mb-2 block">Password</label>
            <input 
              type="password" 
              className="w-full" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required 
            />
          </div>

          <button type="submit" className="btn-primary w-full justify-center" style={{ marginTop: '8px' }}>
            Login to Portal
          </button>
        </form>
        
        <div className="text-center mt-6 text-sm text-muted">
          <p>Demo Credentials:</p>
          <p>Ambassador: <strong>ambassador</strong> / <strong>Camp$Ambass26!</strong></p>
          <p>Organizer: <strong>admin</strong> / <strong>Org$Admin2026!</strong></p>
        </div>

      </div>
    </div>
  );
};
