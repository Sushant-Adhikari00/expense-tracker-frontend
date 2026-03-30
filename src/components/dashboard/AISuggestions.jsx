const types = {
  warning: { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', icon: '⚠️', titleColor: '#fbbf24', textColor: 'rgba(251,191,36,0.75)' },
  info:    { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', icon: '💡', titleColor: '#60a5fa', textColor: 'rgba(96,165,250,0.75)'  },
  danger:  { bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',  icon: '📉', titleColor: '#f87171', textColor: 'rgba(248,113,113,0.75)' },
  success: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', icon: '✅', titleColor: '#34d399', textColor: 'rgba(52,211,153,0.75)'  },
};

const getSuggestions = (summary) => {
  if (!summary) return [];
  const list = [];

  if (summary.netSavings < 0)
    list.push({ type: 'danger',  title: 'Spending Exceeds Income',    message: 'You spent more than you earned this month. Review your largest expense categories immediately.' });

  if (summary.expensesExceed70Percent)
    list.push({ type: 'warning', title: 'High Spending Alert',         message: 'Your expenses exceed 70% of your income this month. Consider reviewing discretionary spending.' });

  if (summary.savingsRateLow && !summary.expensesExceed70Percent)
    list.push({ type: 'info',    title: 'Low Savings Rate',            message: 'Your savings rate is below 20%. Try automating a fixed monthly transfer to your savings goals.' });

  if (!summary.expensesExceed70Percent && !summary.savingsRateLow && summary.netSavings > 0)
    list.push({ type: 'success', title: 'Great Financial Health',      message: 'You are saving over 20% of your income this month. Consider allocating extra savings to your goals.' });

  return list;
};

const AISuggestions = ({ summary }) => {
  const items = getSuggestions(summary);
  if (!items.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
      {items.map((item, i) => {
        const t = types[item.type];
        return (
          <div key={i} style={{
            backgroundColor: t.bg,
            border:          `1px solid ${t.border}`,
            borderRadius:    '14px',
            padding:         '14px 18px',
            display:         'flex',
            alignItems:      'flex-start',
            gap:             '12px',
          }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{t.icon}</span>
            <div>
              <p style={{ color: t.titleColor, fontSize: '14px', fontWeight: 600, margin: '0 0 3px 0' }}>
                {item.title}
              </p>
              <p style={{ color: t.textColor, fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                {item.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AISuggestions;