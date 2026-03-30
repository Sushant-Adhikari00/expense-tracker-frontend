import { useState } from 'react';
import { useGoals }    from '../hooks/useGoals';
import PageWrapper     from '../components/common/PageWrapper';
import GoalCard        from '../components/goals/GoalCard';
import GoalForm        from '../components/goals/GoalForm';
import { formatCurrency } from '../utils/formatCurrency';

// ← Put it here, outside the component
const addBtnStyle = {
  display:         'flex',
  alignItems:      'center',
  gap:             '8px',
  backgroundColor: '#10b981',
  border:          'none',
  borderRadius:    '10px',
  color:           '#ffffff',
  fontSize:        '14px',
  fontWeight:      600,
  padding:         '10px 18px',
  cursor:          'pointer',
};

// Deposit modal — kept inside this file
const DepositModal = ({ goal, onDeposit, onClose, loading }) => {
  const [amount, setAmount] = useState('');

  return (
    <div style={{
      position:        'fixed',
      inset:           0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter:  'blur(4px)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      zIndex:          50,
      padding:         '16px',
    }}>
      <div style={{
        backgroundColor: '#0f172a',
        border:          '1px solid #1e293b',
        borderRadius:    '18px',
        padding:         '28px',
        width:           '100%',
        maxWidth:        '380px',
        boxShadow:       '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0' }}>
          Add Deposit
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px 0' }}>
          {goal.name} · {formatCurrency(goal.savedAmount)} saved so far
        </p>

        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount to deposit"
          style={{
            display:         'block',
            width:           '100%',
            backgroundColor: '#1e293b',
            border:          '1px solid #334155',
            borderRadius:    '10px',
            padding:         '11px 14px',
            color:           '#ffffff',
            fontSize:        '14px',
            outline:         'none',
            boxSizing:       'border-box',
            marginBottom:    '16px',
          }}
          onFocus={e => e.target.style.borderColor = '#10b981'}
          onBlur={e  => e.target.style.borderColor = '#334155'}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#1e293b',
              border:          '1px solid #334155',
              borderRadius:    '10px',
              color:           '#94a3b8',
              fontSize:        '14px',
              fontWeight:      500,
              padding:         '11px',
              cursor:          'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onDeposit(Number(amount))}
            disabled={!amount || Number(amount) <= 0 || loading}
            style={{
              backgroundColor: '#10b981',
              border:          'none',
              borderRadius:    '10px',
              color:           '#ffffff',
              fontSize:        '14px',
              fontWeight:      600,
              padding:         '11px',
              cursor:          (!amount || loading) ? 'not-allowed' : 'pointer',
              opacity:         (!amount || loading) ? 0.6 : 1,
            }}
          >
            {loading ? 'Depositing...' : 'Deposit'}
          </button>
        </div>
      </div>
    </div>
  );
};

const GoalsPage = () => {
  const {
    goals, loading, saving,
    createGoal, updateGoal,
    depositToGoal, updateGoalStatus, deleteGoal,
  } = useGoals();

  const [showForm,    setShowForm]    = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [depositGoal, setDepositGoal] = useState(null);

  const handleCreate = async (payload) => {
    const ok = await createGoal(payload);
    if (ok) setShowForm(false);
  };

  const handleUpdate = async (payload) => {
    const ok = await updateGoal(editingGoal.id, payload);
    if (ok) setEditingGoal(null);
  };

  const handleDeposit = async (amount) => {
    const ok = await depositToGoal(depositGoal.id, amount);
    if (ok) setDepositGoal(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    await deleteGoal(id);
  };

  const inProgress = goals.filter(g => g.status === 'IN_PROGRESS').length;
  const completed  = goals.filter(g => g.status === 'COMPLETED').length;

  return (
    <PageWrapper
      title="Saving Goals"
      subtitle="Track your financial milestones"
      action={
        <button style={addBtnStyle} onClick={() => setShowForm(true)}>
          + New Goal
        </button>
      }
    >

      {/* Stats row */}
      {goals.length > 0 && (
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '16px',
          marginBottom:        '24px',
        }}>
          {[
            { label: 'Total Goals', value: goals.length, color: '#ffffff'  },
            { label: 'In Progress', value: inProgress,   color: '#60a5fa'  },
            { label: 'Completed',   value: completed,    color: '#34d399'  },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              backgroundColor: '#0f172a',
              border:          '1px solid #1e293b',
              borderRadius:    '14px',
              padding:         '18px 22px',
            }}>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '0 0 6px 0' }}>{label}</p>
              <p style={{ color, fontSize: '28px', fontWeight: 700, margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <div style={{
            width: '32px', height: '32px',
            border: '2px solid #10b981',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Empty state */}
      {!loading && goals.length === 0 && (
        <div style={{
          backgroundColor: '#0f172a',
          border:          '1px solid #1e293b',
          borderRadius:    '16px',
          padding:         '64px 32px',
          textAlign:       'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎯</div>
          <p style={{ color: '#ffffff', fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>
            No saving goals yet
          </p>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 20px 0' }}>
            Set your first financial target to get started
          </p>
          <button
            style={addBtnStyle}
            onClick={() => setShowForm(true)}
          >
            + Create First Goal
          </button>
        </div>
      )}

      {/* Goal cards grid */}
      {!loading && goals.length > 0 && (
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap:                 '16px',
        }}>
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={setEditingGoal}
              onDelete={handleDelete}
              onDeposit={setDepositGoal}
              onStatusChange={updateGoalStatus}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <GoalForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          loading={saving}
        />
      )}

      {editingGoal && (
        <GoalForm
          initial={editingGoal}
          onSubmit={handleUpdate}
          onClose={() => setEditingGoal(null)}
          loading={saving}
        />
      )}

      {depositGoal && (
        <DepositModal
          goal={depositGoal}
          onDeposit={handleDeposit}
          onClose={() => setDepositGoal(null)}
          loading={saving}
        />
      )}
    </PageWrapper>
  );
};

export default GoalsPage;