import React from 'react';
import { Check, X, Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const OrgApprovals = () => {
  const { pendingApprovals, approveTask, rejectTask } = useAppContext();

  return (
    <div className="container mt-8 mb-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="mb-2">Task Approvals</h1>
          <p className="text-muted">Review and verify ambassador task submissions.</p>
        </div>
        <div className="flex gap-4">
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '24px', width: '300px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by ambassador or task..." 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', marginLeft: '8px', width: '100%' }}
            />
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3>Pending Approvals Queue</h3>
          <span className="pill pill-gold">{pendingApprovals.length} Pending</span>
        </div>
        
        {pendingApprovals.length === 0 ? (
          <div className="text-muted text-center py-8">No tasks pending approval.</div>
        ) : (
          <div className="flex-col gap-4">
            {pendingApprovals.map(approval => (
              <div key={approval.id} className="flex justify-between items-center p-4" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <strong style={{ fontSize: '1.1rem' }}>{approval.title}</strong>
                    <span className="pill pill-purple text-xs">{approval.type}</span>
                    <span style={{ color: 'var(--accent-gold)' }}>+{approval.points} pts</span>
                  </div>
                  <div className="text-sm text-muted mb-1">
                    Submitted by: <strong style={{ color: 'var(--text-main)' }}>{approval.ambassador}</strong> ({approval.time})
                  </div>
                  {approval.proof && (
                    <div className="text-sm text-muted mb-1">
                      Proof Link: <a href={approval.proof.input.startsWith('http') ? approval.proof.input : '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-teal)' }}>{approval.proof.input}</a>
                    </div>
                  )}
                  {approval.proof?.notes && (
                    <div className="text-sm text-muted">
                      Notes: {approval.proof.notes}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button 
                    className="btn-secondary flex items-center justify-center p-2" 
                    style={{ borderColor: 'var(--accent-coral)', color: 'var(--accent-coral)' }}
                    onClick={() => rejectTask(approval.id)}
                    title="Reject"
                  >
                    <X size={20} />
                  </button>
                  <button 
                    className="btn-primary flex items-center justify-center p-2" 
                    style={{ background: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}
                    onClick={() => approveTask(approval.id)}
                    title="Approve & Award Points"
                  >
                    <Check size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
