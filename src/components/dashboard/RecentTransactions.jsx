import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate }     from '../../utils/formatDate';

const RecentTransactions = ({ incomes = [], expenses = [] }) => {
  const transactions = [
    ...incomes.map(i  => ({ ...i, type: 'income'  })),
    ...expenses.map(e => ({ ...e, type: 'expense' })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div style={{
      backgroundColor: '#0f172a',
      border:          '1px solid #1e293b',
      borderRadius:    '16px',
      overflow:        'hidden',
    }}>
      {/* Header */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '18px 22px',
        borderBottom:   '1px solid #1e293b',
      }}>
        <div>
          <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, margin: 0 }}>
            Recent Transactions
          </h3>
          <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>
            Latest activity
          </p>
        </div>
        <Link to="/expenses" style={{
          color:      '#10b981',
          fontSize:   '13px',
          fontWeight: 500,
        }}>
          View all →
        </Link>
      </div>

      {/* Rows */}
      {transactions.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
          No transactions yet
        </div>
      ) : (
        transactions.map((tx) => (
          <div key={`${tx.type}-${tx.id}`} style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            padding:        '14px 22px',
            borderBottom:   '1px solid #1e293b',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width:           '38px',
                height:          '38px',
                backgroundColor: tx.type === 'income'
                  ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                borderRadius:    '10px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                fontSize:        '16px',
                flexShrink:      0,
              }}>
                {tx.type === 'income' ? '↑' : '↓'}
              </div>
              <div>
                <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, margin: 0 }}>
                  {tx.type === 'income' ? tx.source : tx.title}
                </p>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '2px 0 0 0' }}>
                  {tx.category} · {formatDate(tx.date)}
                </p>
              </div>
            </div>
            <span style={{
              color:      tx.type === 'income' ? '#10b981' : '#ef4444',
              fontSize:   '14px',
              fontWeight: 600,
            }}>
              {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentTransactions;