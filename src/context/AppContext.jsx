import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Mock initial data
const INITIAL_TASKS = [
  { id: 1, title: 'Share Hackathon Post', type: 'Social', points: 150, deadline: '2026-04-28', status: 'pending', desc: 'Share our latest Instagram reel on your story and tag us.' },
  { id: 2, title: 'Refer 3 Friends', type: 'Referral', points: 250, deadline: '2026-04-30', status: 'pending', desc: 'Get 3 students to register using your unique referral code.' },
  { id: 3, title: 'Write a Blog', type: 'Content', points: 200, deadline: '2026-05-02', status: 'pending', desc: 'Write a 500-word article about the tech scene on campus.' },
  { id: 4, title: 'Host a Info Session', type: 'Event', points: 300, deadline: '2026-05-05', status: 'pending', desc: 'Organize a 30-min info session for 1st-year students.' },
  { id: 5, title: 'Join Discord Server', type: 'Social', points: 50, deadline: '2026-04-20', status: 'completed', desc: 'Join the official community Discord.' },
];

const INITIAL_LEADERBOARD = [
  { id: 'u1', name: 'Alex Johnson', college: 'MIT', points: 4200, rank: 1, avatar: 'AJ', badges: 8 },
  { id: 'u2', name: 'Sarah Williams', college: 'Stanford', points: 3950, rank: 2, avatar: 'SW', badges: 7 },
  { id: 'u3', name: 'You', college: 'Your College', points: 3800, rank: 3, avatar: 'ME', badges: 5 },
  { id: 'u4', name: 'David Chen', college: 'Berkeley', points: 3600, rank: 4, avatar: 'DC', badges: 4 },
  { id: 'u5', name: 'Emily Davis', college: 'CMU', points: 3100, rank: 5, avatar: 'ED', badges: 4 },
];

const BADGES = [
  { id: 'b1', name: 'Streak King', desc: 'Maintain a 7-day streak', icon: '🔥', unlocked: true },
  { id: 'b2', name: 'Fast Start', desc: '5 tasks in week 1', icon: '🚀', unlocked: true },
  { id: 'b3', name: 'Brand Voice', desc: '3 social posts', icon: '📱', unlocked: true },
  { id: 'b4', name: 'Connector', desc: '10 referrals', icon: '🤝', unlocked: true },
  { id: 'b5', name: 'Top 3', desc: 'Reach rank 3', icon: '🥉', unlocked: true },
  { id: 'b6', name: 'Diamond', desc: 'Reach 5000 XP', icon: '💎', unlocked: false },
  { id: 'b7', name: 'Speaker', desc: 'Host 3 events', icon: '🎤', unlocked: false },
  { id: 'b8', name: 'Viral', desc: '10K video views', icon: '📈', unlocked: false },
  { id: 'b9', name: '50 Referrals', desc: 'Refer 50 people', icon: '🌟', unlocked: false },
  { id: 'b10', name: 'Legend', desc: 'Reach rank #1', icon: '👑', unlocked: false },
];

const INITIAL_FEED = [
  { id: 1, user: 'Alex J.', action: 'completed task', target: 'Share Hackathon Post', time: '2m ago' },
  { id: 2, user: 'Sarah W.', action: 'unlocked badge', target: 'Fast Start', time: '5m ago' },
  { id: 3, user: 'David C.', action: 'submitted proof', target: 'Refer 3 Friends', time: '12m ago' },
];

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('ambassador'); // 'ambassador' or 'admin'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [points, setPoints] = useState(3800);
  const [tasksCompleted, setTasksCompleted] = useState(12);
  const [streak, setStreak] = useState(5);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [badges, setBadges] = useState(BADGES);
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const login = (id, password, requestedRole) => {
    if (requestedRole === 'ambassador' && id === 'ambassador' && password === 'Camp$Ambass26!') {
      setRole('ambassador');
      setIsAuthenticated(true);
      addToast('Logged in successfully!');
      return true;
    }
    if (requestedRole === 'admin' && id === 'admin' && password === 'Org$Admin2026!') {
      setRole('admin');
      setIsAuthenticated(true);
      addToast('Logged in as Organizer!');
      return true;
    }
    // if fail, could add a toast here but we'll return false and let the component handle it
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole('ambassador');
  };

  const submitTask = (taskId, proof) => {
    // Find task
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;
    
    const task = tasks[taskIndex];
    
    // Update task status
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...task, status: 'completed' };
    setTasks(newTasks);
    
    // Add points
    setPoints(prev => prev + task.points);
    setTasksCompleted(prev => prev + 1);
    
    // Update leaderboard (mock real-time update)
    setLeaderboard(prev => {
      const newLb = [...prev];
      const meIndex = newLb.findIndex(u => u.id === 'u3');
      if (meIndex !== -1) {
        newLb[meIndex].points += task.points;
        newLb.sort((a, b) => b.points - a.points);
        // Re-assign ranks
        newLb.forEach((u, i) => u.rank = i + 1);
      }
      return newLb;
    });

    // Add to feed
    setFeed(prev => [
      { id: Date.now(), user: 'You', action: 'completed task', target: task.title, time: 'just now' },
      ...prev
    ].slice(0, 10)); // keep last 10

    addToast(`Task completed! +${task.points} points`);
  };

  const addTask = (newTaskData) => {
    const newTask = {
      id: Date.now(),
      status: 'pending',
      ...newTaskData
    };
    setTasks(prev => [newTask, ...prev]);
    addToast('New task assigned successfully!');
  };

  // Auto-refresh feed mock for Admin
  useEffect(() => {
    if (role === 'admin') {
      const interval = setInterval(() => {
        const randomNames = ['John D.', 'Emily R.', 'Michael T.', 'Sophia L.'];
        const randomActions = ['completed task', 'submitted proof', 'unlocked badge'];
        const randomTargets = ['Campus Tour Video', 'Instagram Story', 'Connector Badge', 'Weekly Meeting'];
        
        const newFeedItem = {
          id: Date.now(),
          user: randomNames[Math.floor(Math.random() * randomNames.length)],
          action: randomActions[Math.floor(Math.random() * randomActions.length)],
          target: randomTargets[Math.floor(Math.random() * randomTargets.length)],
          time: 'just now'
        };

        setFeed(prev => [newFeedItem, ...prev].slice(0, 20));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [role]);

  // Auto-refresh leaderboard mock (Live functionality)
  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard(prev => {
        const newLb = [...prev];
        // Pick a random user to give points to (excluding 'u3' which is the logged-in user)
        const randomIdx = Math.floor(Math.random() * newLb.length);
        if (newLb[randomIdx].id !== 'u3') {
          const pointsToAdd = [50, 100, 150, 200][Math.floor(Math.random() * 4)];
          newLb[randomIdx] = { ...newLb[randomIdx], points: newLb[randomIdx].points + pointsToAdd };
          
          // Re-sort and assign ranks
          newLb.sort((a, b) => b.points - a.points);
          newLb.forEach((u, i) => u.rank = i + 1);
        }
        return newLb;
      });
    }, 3500); // Updates every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{
      role, setRole, isAuthenticated, login, logout,
      points, tasksCompleted, streak,
      tasks, submitTask, addTask,
      leaderboard, badges, feed,
      toasts
    }}>
      {children}
      
      {/* Global Toast Container */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <span style={{ fontSize: '20px' }}>✅</span>
            <span style={{ fontWeight: 600 }}>{t.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
