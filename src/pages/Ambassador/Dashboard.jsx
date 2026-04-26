import React from 'react';
import { Trophy, CheckCircle, Zap, Star } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { points, tasksCompleted, streak, tasks } = useAppContext();
  
  const pendingTasks = tasks.filter(t => t.status === 'pending').slice(0, 3);
  
  const xpProgress = (points % 1000) / 10; // e.g. 800 pts -> 80%

  return (
    <div className="container mt-8 mb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, <span style={{ color: 'var(--accent-purple)' }}>Champ</span> 👋</h1>
          <p className="text-muted text-lg">You're doing great! Keep the momentum going.</p>
        </div>
      </div>

      <div className="grid-4 mb-8">
        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-purple)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(108, 99, 255, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <Star color="var(--accent-purple)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Total Points</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>{points.toLocaleString()}</div>
        </div>

        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-teal)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(0, 210, 200, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <CheckCircle color="var(--accent-teal)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Tasks Done</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>{tasksCompleted}</div>
        </div>

        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-gold)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(255, 209, 102, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <Trophy color="var(--accent-gold)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Leaderboard</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>#3</div>
        </div>

        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-coral)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(255, 107, 107, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <Zap color="var(--accent-coral)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Current Streak</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="stat-number" style={{ fontSize: '2rem' }}>{streak}</div>
            <span style={{ fontSize: '1.25rem' }}>🔥</span>
          </div>
        </div>
      </div>

      <div className="grid-2 mb-8">
        <div className="card">
          <h2 className="mb-4">Weekly XP Progress</h2>
          <div className="flex justify-between text-sm mb-2 text-muted">
            <span>Level {Math.floor(points / 1000)}</span>
            <span>{points % 1000} / 1000 XP</span>
          </div>
          <div className="progress-bg mb-4">
            <div className="progress-fill" style={{ width: `${xpProgress}%`, background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-teal))' }}></div>
          </div>
          <p className="text-sm text-muted">Reach 1000 XP this week to unlock the <strong style={{color: 'var(--accent-gold)'}}>Diamond Badge</strong>!</p>
        </div>

        <div className="card">
          <h2 className="mb-4">7-Day Streak</h2>
          <div className="flex justify-between items-center h-full pb-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex-col items-center gap-2">
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: i < streak ? 'var(--accent-coral)' : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 'bold', color: i < streak ? 'white' : 'var(--text-muted)'
                }}>
                  {i < streak ? '✓' : ''}
                </div>
                <span className="text-sm text-muted">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2>Pending Tasks</h2>
          <Link to="/tasks" className="text-muted" style={{ textDecoration: 'underline' }}>View All</Link>
        </div>
        <div className="grid-3">
          {pendingTasks.map(task => (
            <div key={task.id} className="card flex-col justify-between" style={{ padding: '20px' }}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`pill ${
                    task.type === 'Referral' ? 'pill-purple' :
                    task.type === 'Content' ? 'pill-teal' :
                    task.type === 'Social' ? 'pill-coral' : 'pill-gold'
                  }`}>{task.type}</span>
                  <span className="font-bold text-lg" style={{ color: 'var(--accent-gold)' }}>+{task.points} pts</span>
                </div>
                <h3 className="mb-2">{task.title}</h3>
                <p className="text-muted text-sm mb-4">{task.desc}</p>
              </div>
              <div>
                <div className="flex justify-between text-sm text-muted mb-2">
                  <span>Deadline: {task.deadline}</span>
                </div>
                <Link to="/tasks" className="btn-secondary w-full justify-center">Submit Proof</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
