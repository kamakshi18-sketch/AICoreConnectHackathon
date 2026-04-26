import React, { useState } from 'react';
import { Search, ChevronDown, Award } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Leaderboard = () => {
  const { leaderboard } = useAppContext();
  const [timeFilter, setTimeFilter] = useState('This Week');
  const [search, setSearch] = useState('');

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="container mt-8 mb-8">
      <div className="flex justify-between items-center mb-8">
        <h1>Leaderboard</h1>
        <div className="flex gap-4">
          <div style={{ position: 'relative' }}>
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              style={{ appearance: 'none', paddingRight: '36px', width: '160px' }}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
            <ChevronDown size={16} style={{ position: 'absolute', right: '14px', top: '14px', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid-3 mb-12" style={{ alignItems: 'flex-end', marginTop: '40px' }}>
        {/* Rank 2 */}
        {top3[1] && (
          <div className="card flex-col items-center text-center" style={{ borderTop: '4px solid silver', transform: 'translateY(20px)' }}>
            <div className="avatar avatar-lg mb-4" style={{ background: 'linear-gradient(135deg, #c0c0c0, #e0e0e0)', color: '#333' }}>{top3[1].avatar}</div>
            <h3 className="mb-1">{top3[1].name}</h3>
            <p className="text-sm text-muted mb-4">{top3[1].college}</p>
            <div className="stat-number text-xl" style={{ color: 'silver' }}>{top3[1].points.toLocaleString()} pts</div>
            <div className="mt-4 w-full" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>Rank 2</div>
          </div>
        )}

        {/* Rank 1 */}
        {top3[0] && (
          <div className="card flex-col items-center text-center" style={{ borderTop: '4px solid var(--accent-gold)', transform: 'translateY(-20px)', boxShadow: '0 12px 32px rgba(255, 209, 102, 0.1)' }}>
            <div style={{ position: 'absolute', top: '-24px' }}><Award size={48} color="var(--accent-gold)" /></div>
            <div className="avatar avatar-lg mb-4 mt-4" style={{ background: 'linear-gradient(135deg, #ffd166, #ff9f1c)', color: '#333', width: '100px', height: '100px', fontSize: '2.5rem' }}>{top3[0].avatar}</div>
            <h3 className="mb-1 text-2xl">{top3[0].name}</h3>
            <p className="text-sm text-muted mb-4">{top3[0].college}</p>
            <div className="stat-number text-2xl" style={{ color: 'var(--accent-gold)' }}>{top3[0].points.toLocaleString()} pts</div>
            <div className="mt-4 w-full" style={{ background: 'rgba(255,209,102,0.1)', color: 'var(--accent-gold)', padding: '8px', borderRadius: '8px', fontWeight: 'bold' }}>Rank 1</div>
          </div>
        )}

        {/* Rank 3 */}
        {top3[2] && (
          <div className="card flex-col items-center text-center" style={{ borderTop: '4px solid #cd7f32', transform: 'translateY(40px)' }}>
            <div className="avatar avatar-lg mb-4" style={{ background: 'linear-gradient(135deg, #cd7f32, #a0522d)', color: 'white' }}>{top3[2].avatar}</div>
            <h3 className="mb-1">{top3[2].name}</h3>
            <p className="text-sm text-muted mb-4">{top3[2].college}</p>
            <div className="stat-number text-xl" style={{ color: '#cd7f32' }}>{top3[2].points.toLocaleString()} pts</div>
            <div className="mt-4 w-full" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>Rank 3</div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="flex justify-between items-center p-6 border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-xl">All Ambassadors</h2>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name or college..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', paddingLeft: '40px' }}
            />
          </div>
        </div>
        
        <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              <th className="p-4 text-muted font-normal border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>Rank</th>
              <th className="p-4 text-muted font-normal border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>Ambassador</th>
              <th className="p-4 text-muted font-normal border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>Points</th>
              <th className="p-4 text-muted font-normal border-b" style={{ borderBottom: '1px solid var(--border-color)' }}>Badges</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.college.toLowerCase().includes(search.toLowerCase())).map((user) => (
              <tr key={user.id} style={{ 
                borderBottom: '1px solid var(--border-color)',
                background: user.id === 'u3' ? 'rgba(108, 99, 255, 0.05)' : 'transparent',
                borderLeft: user.id === 'u3' ? '4px solid var(--accent-purple)' : '4px solid transparent'
              }}>
                <td className="p-4">
                  <span className="stat-number text-lg" style={{ color: user.rank <= 3 ? 'var(--text-main)' : 'var(--text-muted)' }}>#{user.rank}</span>
                </td>
                <td className="p-4 flex items-center gap-4">
                  <div className="avatar avatar-sm">{user.avatar}</div>
                  <div>
                    <div className="font-bold">{user.name} {user.id === 'u3' && <span className="text-sm text-muted">(You)</span>}</div>
                    <div className="text-sm text-muted">{user.college}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-bold text-lg" style={{ color: 'var(--accent-teal)' }}>{user.points.toLocaleString()}</span>
                </td>
                <td className="p-4">
                  <div className="flex gap-1">
                    {[...Array(Math.min(user.badges, 5))].map((_, i) => <span key={i}>🏅</span>)}
                    {user.badges > 5 && <span className="text-muted text-sm ml-1">+{user.badges - 5}</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
