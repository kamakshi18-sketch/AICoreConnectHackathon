import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAppContext } from '../../context/AppContext';

export const Profile = () => {
  const { points, tasksCompleted, streak, badges } = useAppContext();

  // Mock data for the activity breakdown chart
  const activityData = [
    { name: 'Referrals', value: 45, color: 'var(--accent-purple)' },
    { name: 'Content', value: 25, color: 'var(--accent-teal)' },
    { name: 'Social', value: 20, color: 'var(--accent-coral)' },
    { name: 'Events', value: 10, color: 'var(--accent-gold)' },
  ];

  const rewardProgress = (points / 5000) * 100;

  return (
    <div className="container mt-8 mb-8">
      
      <div className="grid-3 mb-8">
        <div className="card col-span-1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="avatar avatar-lg mb-4">ME</div>
          <h2 className="mb-1 text-2xl">Your Name</h2>
          <p className="text-muted mb-4">Computer Science, 3rd Year</p>
          <div className="pill pill-gold mb-6" style={{ fontSize: '1rem', padding: '6px 16px' }}>Gold Tier</div>
          
          <div className="w-full grid-2 gap-4 mt-auto">
            <div className="text-left" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div className="text-muted text-sm mb-1">Total XP</div>
              <div className="font-bold text-lg">{points}</div>
            </div>
            <div className="text-left" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div className="text-muted text-sm mb-1">Rank</div>
              <div className="font-bold text-lg">#3</div>
            </div>
            <div className="text-left" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div className="text-muted text-sm mb-1">Tasks</div>
              <div className="font-bold text-lg">{tasksCompleted}</div>
            </div>
            <div className="text-left" style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
              <div className="text-muted text-sm mb-1">Streak</div>
              <div className="font-bold text-lg flex items-center gap-1">{streak} 🔥</div>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex-col gap-6" style={{ gridColumn: 'span 2' }}>
          <div className="card w-full h-full">
            <h3 className="mb-6">Activity Breakdown</h3>
            <div style={{ height: '240px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} width={80} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="mb-2">Reward Milestone</h3>
        <p className="text-muted mb-6">Earn <strong style={{ color: 'var(--accent-green)' }}>₹500 Amazon Voucher</strong> at 5000 XP</p>
        
        <div className="flex justify-between text-sm mb-2 text-muted">
          <span>{points} XP</span>
          <span>5000 XP</span>
        </div>
        <div className="progress-bg h-4" style={{ height: '12px' }}>
          <div className="progress-fill" style={{ width: `${rewardProgress}%`, background: 'var(--accent-green)' }}></div>
        </div>
      </div>

      <div>
        <h2 className="mb-6">Your Badges</h2>
        <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {badges.map(badge => (
            <div key={badge.id} className={`badge-card ${!badge.unlocked ? 'locked' : ''}`}>
              <div className="badge-icon">{badge.icon}</div>
              <h4 className="mb-1">{badge.name}</h4>
              <p className="text-xs text-muted">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
