import { formatCurrency } from '../../utils/formatCurrency';

const cards = [
  { key: 'totalIncome',   label: 'Total Income',   icon: '↑', color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.2)'  },
  { key: 'totalExpenses', label: 'Total Expenses', icon: '↓', color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'   },
  { key: 'netSavings',    label: 'Net Savings',    icon: '🐷', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)'  },
  { key: 'savingsRate',   label: 'Savings Rate',   icon: '📈', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.2)', isRate: true },
];

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap:                 '16px',
      marginBottom:        '24px',
    }}>
      {cards.map(({ key, label, icon, color, bg, border, isRate }) => (
        <div key={key} style={{
          backgroundColor: '#0f172a',
          border:          `1px solid ${border}`,
          borderRadius:    '16px',
          padding:         '20px',
        }}>
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            marginBottom:   '14px',
          }}>
            <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}>
              {label}
            </span>
            <div style={{
              width:           '36px',
              height:          '36px',
              backgroundColor: bg,
              borderRadius:    '10px',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              fontSize:        '16px',
            }}>
              {icon}
            </div>
          </div>
          <p style={{
            color:      color,
            fontSize:   '24px',
            fontWeight: 700,
            margin:     0,
          }}>
            {isRate
              ? `${(summary[key] ?? 0).toFixed(1)}%`
              : formatCurrency(summary[key] ?? 0)
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;