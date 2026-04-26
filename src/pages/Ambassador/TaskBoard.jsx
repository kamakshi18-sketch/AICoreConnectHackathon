import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const TaskBoard = () => {
  const { tasks, submitTask } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  // Modal State
  const [proofType, setProofType] = useState('Screenshot');
  const [proofInput, setProofInput] = useState('');
  const [notes, setNotes] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Pending' && t.status !== 'pending') return false;
    if (filter === 'Done' && t.status !== 'completed') return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proofInput) return;
    submitTask(selectedTask.id, { type: proofType, input: proofInput, notes });
    setSelectedTask(null);
    setProofInput('');
    setNotes('');
  };

  return (
    <div className="container mt-8 mb-8">
      <div className="flex justify-between items-center mb-8">
        <h1>Task Board</h1>
      </div>

      <div className="flex gap-4 mb-8 items-center justify-between" style={{ flexWrap: 'wrap' }}>
        <div className="flex gap-4">
          {['All', 'Pending', 'Done'].map(f => (
            <button 
              key={f}
              className={filter === f ? 'btn-primary' : 'btn-secondary'}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '40px' }}
          />
        </div>
      </div>

      <div className="grid-2">
        {filteredTasks.map(task => (
          <div key={task.id} className="card flex-col justify-between" style={{ opacity: task.status === 'completed' ? 0.6 : 1 }}>
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 items-center">
                  <span className={`pill ${
                    task.type === 'Referral' ? 'pill-purple' :
                    task.type === 'Content' ? 'pill-teal' :
                    task.type === 'Social' ? 'pill-coral' : 'pill-gold'
                  }`}>{task.type}</span>
                  {task.status === 'completed' && <span className="pill pill-green">Completed</span>}
                </div>
                <span className="font-bold text-xl" style={{ color: 'var(--accent-gold)' }}>+{task.points} pts</span>
              </div>
              <h3 className="mb-2 text-xl">{task.title}</h3>
              <p className="text-muted mb-6">{task.desc}</p>
            </div>
            
            <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <span className="text-sm text-muted">Deadline: <strong style={{ color: 'var(--text-main)' }}>{task.deadline}</strong></span>
              {task.status === 'pending' ? (
                <button className="btn-primary" onClick={() => setSelectedTask(task)}>Submit Proof</button>
              ) : (
                <button className="btn-secondary" disabled>Done</button>
              )}
            </div>
          </div>
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-muted col-span-2 text-center py-12">No tasks found.</div>
        )}
      </div>

      {/* Submit Proof Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ fontSize: '1.5rem' }}>Submit Proof</h2>
              <button onClick={() => setSelectedTask(null)}><X size={24} color="var(--text-muted)" /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-col gap-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Task</label>
                <input type="text" className="w-full" value={selectedTask.title} disabled style={{ opacity: 0.7 }} />
              </div>
              
              <div>
                <label className="text-sm text-muted mb-2 block">Proof Type</label>
                <select className="w-full" value={proofType} onChange={(e) => setProofType(e.target.value)}>
                  <option>Screenshot URL</option>
                  <option>Post/Video URL</option>
                  <option>Referral Code</option>
                  <option>Attendance List Link</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Proof Input</label>
                <input 
                  type="text" 
                  className="w-full" 
                  placeholder="https://..." 
                  value={proofInput}
                  onChange={(e) => setProofInput(e.target.value)}
                  required 
                />
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Notes (Optional)</label>
                <textarea 
                  className="w-full" 
                  rows="3" 
                  placeholder="Any additional info..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="btn-secondary" onClick={() => setSelectedTask(null)}>Cancel</button>
                <button type="submit" className="btn-primary">Submit & Earn {selectedTask.points} pts</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
