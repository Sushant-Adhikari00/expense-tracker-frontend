import { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate }     from '../../utils/formatDate';

const STATUS = {
  IN_PROGRESS: { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.2)',  color: '#60a5fa', bar: '#10b981' },
  COMPLETED:   { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)',  color: '#34d399', bar: '#10b981' },
  CANCELLED:   { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.2)', color: '#94a3b8', bar: '#475569' },
};

const GoalCard = ({ goal, onEdit, onDelete, onDeposit, onStatusChange }) => {
  const [hovered, setHovered] = useState(false);
  const st       = STATUS[goal.status] || STATUS.IN_PROGRESS;
  const progress = Math.min(goal.progressPercentage, 100);
  const remaining = Math.max(goal.targetAmount - goal.savedAmount, 0);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#0f172a',
        border:          `1px solid ${hovered ? '#334155' : '#1e293b'}`,
        borderRadius:    '16px',
        padding:         '22px',
        display:         'flex',
        flexDirection:   'column',
        gap:             '16px',
        transition:      'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
          <h3 style={{
            color:        '#ffffff',
            fontSize:     '16px',
            fontWeight:   600,
            margin:       '0 0 4px 0',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {goal.name}
          </h3>
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
            Due {formatDate(goal.targetDate)}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <span style={{
            backgroundColor: st.bg,
            border:          `1px solid ${st.border}`,
            color:           st.color,
            fontSize:        '11px',
            fontWeight:      600,
            padding:         '3px 10px',
            borderRadius:    '8px',
          }}>
            {goal.status.replace('_', ' ')}
          </span>

          {hovered && (
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => onEdit(goal)}
                style={{
                  width:  '28px', height: '28px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '7px',
                  color: '#94a3b8', cursor: 'pointer', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >✏️</button>
              <button
                onClick={() => onDelete(goal.id)}
                style={{
                  width:  '28px', height: '28px',
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: '7px',
                  color: '#ef4444', cursor: 'pointer', fontSize: '13px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >🗑️</button>
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>Progress</span>
          <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 600 }}>
            {progress.toFixed(0)}%
          </span>
        </div>
        <div style={{
          width: '100%', height: '6px',
          backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden',
        }}>
          <div style={{
            width:           `${progress}%`,
            height:          '100%',
            backgroundColor: st.bar,
            borderRadius:    '3px',
            transition:      'width 0.7s ease',
          }} />
        </div>
      </div>

      {/* Amounts */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap:                 '8px',
      }}>
        {[
          { label: 'Saved',  value: formatCurrency(goal.savedAmount),  color: '#10b981' },
          { label: 'Target', value: formatCurrency(goal.targetAmount), color: '#ffffff' },
          { label: 'Left',   value: remaining > 0 ? formatCurrency(remaining) : 'Done!', color: '#94a3b8' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            backgroundColor: '#1e293b',
            borderRadius:    '10px',
            padding:         '10px',
            textAlign:       'center',
          }}>
            <p style={{ color: '#64748b', fontSize: '11px', margin: '0 0 4px 0' }}>{label}</p>
            <p style={{ color, fontSize: '13px', fontWeight: 600, margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Note */}
      {goal.note && (
        <p style={{
          color:       '#64748b',
          fontSize:    '12px',
          lineHeight:  1.5,
          margin:      0,
          borderTop:   '1px solid #1e293b',
          paddingTop:  '12px',
        }}>
          {goal.note}
        </p>
      )}

      {/* Actions */}
      {goal.status === 'IN_PROGRESS' && (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => onDeposit(goal)}
            style={{
              flex:            1,
              backgroundColor: 'rgba(16,185,129,0.1)',
              border:          '1px solid rgba(16,185,129,0.2)',
              borderRadius:    '10px',
              color:           '#10b981',
              fontSize:        '13px',
              fontWeight:      600,
              padding:         '10px',
              cursor:          'pointer',
            }}
          >
            + Deposit
          </button>
          <button
            onClick={() => onStatusChange(goal.id, 'COMPLETED')}
            style={{
              backgroundColor: '#1e293b',
              border:          '1px solid #334155',
              borderRadius:    '10px',
              color:           '#94a3b8',
              fontSize:        '13px',
              padding:         '10px 14px',
              cursor:          'pointer',
            }}
            title="Mark complete"
          >
            ✓
          </button>
          <button
            onClick={() => onStatusChange(goal.id, 'CANCELLED')}
            style={{
              backgroundColor: 'rgba(239,68,68,0.05)',
              border:          '1px solid rgba(239,68,68,0.15)',
              borderRadius:    '10px',
              color:           '#f87171',
              fontSize:        '13px',
              padding:         '10px 14px',
              cursor:          'pointer',
            }}
            title="Cancel goal"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalCard;