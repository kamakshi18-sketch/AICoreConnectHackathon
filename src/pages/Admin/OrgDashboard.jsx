import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Users, Activity, CheckSquare, Link as LinkIcon, Download, Plus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useAppContext } from '../../context/AppContext';

export const OrgDashboard = () => {
  const { feed, addTask } = useAppContext();
  
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskType, setNewTaskType] = useState('Social');
  const [newTaskPoints, setNewTaskPoints] = useState(150);
  const [newTaskDeadline, setNewTaskDeadline] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const dashboardRef = useRef(null);

  const handleExportReport = async () => {
    if (!dashboardRef.current) return;
    
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        backgroundColor: '#0a0a12', // match our dark theme
        scale: 2, // better resolution
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('CampusConnect_Org_Report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle || !newTaskDeadline) return;
    
    addTask({
      title: newTaskTitle,
      type: newTaskType,
      points: Number(newTaskPoints),
      deadline: newTaskDeadline,
      desc: newTaskDesc
    });
    
    setIsAssignModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDeadline('');
  };

  const engagementData = [
    { name: 'Referrals', value: 320, color: 'var(--accent-purple)' },
    { name: 'Content', value: 250, color: 'var(--accent-teal)' },
    { name: 'Social', value: 410, color: 'var(--accent-coral)' },
    { name: 'Events', value: 150, color: 'var(--accent-gold)' },
  ];

  const collegeData = [
    { name: 'MIT', value: 45 },
    { name: 'Stanford', value: 38 },
    { name: 'Berkeley', value: 32 },
    { name: 'CMU', value: 28 },
    { name: 'Harvard', value: 15 },
  ];

  return (
    <div className="container mt-8 mb-8" ref={dashboardRef}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2">Org Dashboard</h1>
          <p className="text-muted">Overview of your ambassador program performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary" onClick={handleExportReport}><Download size={18} /> Export Report</button>
          <button className="btn-primary" onClick={() => setIsAssignModalOpen(true)}><Plus size={18} /> Assign Task</button>
        </div>
      </div>

      <div className="grid-4 mb-8">
        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-purple)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(108, 99, 255, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <Users color="var(--accent-purple)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Total Ambassadors</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>1,248</div>
        </div>

        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-teal)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(0, 210, 200, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <Activity color="var(--accent-teal)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Active This Week</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>842</div>
        </div>

        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-gold)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(255, 209, 102, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <CheckSquare color="var(--accent-gold)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Tasks Completed</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>4,592</div>
        </div>

        <div className="card card-top-accent" style={{ '--accent-color': 'var(--accent-coral)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div style={{ background: 'rgba(255, 107, 107, 0.15)', padding: '10px', borderRadius: '10px' }}>
              <LinkIcon color="var(--accent-coral)" size={20} />
            </div>
            <div className="text-muted text-sm font-bold">Total Referrals</div>
          </div>
          <div className="stat-number" style={{ fontSize: '2rem' }}>8,420</div>
        </div>
      </div>

      <div className="grid-2 mb-8">
        <div className="card">
          <h3 className="mb-6">Engagement by Task Type</h3>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="mb-6">Program ROI</h3>
          <div className="grid-2 h-full" style={{ gap: '12px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div className="text-muted text-sm mb-1">New Signups</div>
              <div className="stat-number text-xl" style={{ color: 'var(--accent-green)' }}>+3,204</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div className="text-muted text-sm mb-1">CPA</div>
              <div className="stat-number text-xl" style={{ color: 'var(--accent-gold)' }}>₹45.50</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div className="text-muted text-sm mb-1">Drop-off</div>
              <div className="stat-number text-xl" style={{ color: 'var(--accent-coral)' }}>12.4%</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
              <div className="text-muted text-sm mb-1">Acceptance</div>
              <div className="stat-number text-xl" style={{ color: 'var(--accent-teal)' }}>94.2%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3>Live Activity Feed</h3>
            <span className="pill pill-green flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }}></span> Live</span>
          </div>
          <div className="flex-col gap-4" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
            {feed.map((item) => (
              <div key={item.id} className="flex gap-4 items-start pb-4" style={{ borderBottom: '1px solid var(--border-color)', animation: 'slideIn 0.3s ease' }}>
                <div className="avatar avatar-sm" style={{ background: 'var(--border-color)', color: 'var(--text-muted)' }}>
                  {item.user.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <div className="mb-1">
                    <strong>{item.user}</strong> <span className="text-muted">{item.action}</span> <strong style={{ color: 'var(--accent-purple)' }}>{item.target}</strong>
                  </div>
                  <div className="text-xs text-muted">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="mb-6">Top Colleges by Engagement</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collegeData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-main)' }} width={80} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} fill="var(--accent-teal)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Assign Task Modal */}
      {isAssignModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAssignModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ fontSize: '1.5rem' }}>Assign New Task</h2>
              <button onClick={() => setIsAssignModalOpen(false)}><X size={24} color="var(--text-muted)" /></button>
            </div>
            
            <form onSubmit={handleAssignTask} className="flex-col gap-4">
              <div>
                <label className="text-sm text-muted mb-2 block">Task Title</label>
                <input type="text" className="w-full" value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} required />
              </div>
              
              <div className="grid-2">
                <div>
                  <label className="text-sm text-muted mb-2 block">Task Type</label>
                  <select className="w-full" value={newTaskType} onChange={e => setNewTaskType(e.target.value)}>
                    <option>Social</option>
                    <option>Referral</option>
                    <option>Content</option>
                    <option>Event</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted mb-2 block">Points Reward</label>
                  <input type="number" className="w-full" value={newTaskPoints} onChange={e => setNewTaskPoints(e.target.value)} required />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Deadline</label>
                <input type="date" className="w-full" value={newTaskDeadline} onChange={e => setNewTaskDeadline(e.target.value)} required />
              </div>

              <div>
                <label className="text-sm text-muted mb-2 block">Description</label>
                <textarea className="w-full" rows="3" value={newTaskDesc} onChange={e => setNewTaskDesc(e.target.value)} required></textarea>
              </div>

              <div className="flex justify-end gap-4 mt-4">
                <button type="button" className="btn-secondary" onClick={() => setIsAssignModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Assign Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
