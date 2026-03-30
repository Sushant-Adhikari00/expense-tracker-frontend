import { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate }     from '../../utils/formatDate';
import Pagination         from './Pagination';

const TransactionTable = ({ type, data, loading, onEdit, onDelete, onPageChange, onAdd }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const isIncome = type === 'income';

  const col1 = isIncome ? 'Source' : 'Title';

  return (
    <div style={{
      backgroundColor: '#0f172a',
      border:          '1px solid #1e293b',
      borderRadius:    '16px',
      overflow:        'hidden',
    }}>

      {/* Header row */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr',
        gap:                 '16px',
        padding:             '14px 22px',
        borderBottom:        '1px solid #1e293b',
        backgroundColor:     '#0a1628',
      }}>
        {[col1, 'Category', 'Date', 'Note', 'Amount'].map((h, i) => (
          <span key={h} style={{
            color:       '#64748b',
            fontSize:    '11px',
            fontWeight:  600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign:   i === 4 ? 'right' : 'left',
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '48px' }}>
          <div style={{
            width:       '32px',
            height:      '32px',
            border:      '2px solid #10b981',
            borderTopColor: 'transparent',
            borderRadius:'50%',
            animation:   'spin 0.8s linear infinite',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Empty */}
      {!loading && data?.content?.length === 0 && (
        <div style={{ padding: '48px', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
            No {isIncome ? 'income' : 'expense'} records yet
          </p>
          <button
            onClick={onAdd}
            style={{
              backgroundColor: 'transparent',
              border:          'none',
              color:           '#10b981',
              fontSize:        '14px',
              cursor:          'pointer',
              fontWeight:      500,
            }}
          >
            + Add your first {isIncome ? 'income' : 'expense'}
          </button>
        </div>
      )}

      {/* Rows */}
      {!loading && data?.content?.map((item) => (
        <div
          key={item.id}
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
          style={{
            display:             'grid',
            gridTemplateColumns: '3fr 2fr 2fr 2fr 2fr',
            gap:                 '16px',
            padding:             '14px 22px',
            borderBottom:        '1px solid #1e293b',
            backgroundColor:     hoveredId === item.id ? 'rgba(255,255,255,0.02)' : 'transparent',
            alignItems:          'center',
            transition:          'background 0.15s',
          }}
        >
          {/* Name */}
          <div>
            <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: 500, margin: 0 }}>
              {isIncome ? item.source : item.title}
            </p>
          </div>

          {/* Category */}
          <div>
            <span style={{
              display:         'inline-block',
              backgroundColor: isIncome ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              color:           isIncome ? '#10b981' : '#ef4444',
              border:          `1px solid ${isIncome ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
              borderRadius:    '8px',
              padding:         '3px 10px',
              fontSize:        '11px',
              fontWeight:      600,
            }}>
              {item.category}
            </span>
          </div>

          {/* Date */}
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>
            {formatDate(item.date)}
          </span>

          {/* Note */}
          <span style={{
            color:        '#64748b',
            fontSize:     '12px',
            overflow:     'hidden',
            textOverflow: 'ellipsis',
            whiteSpace:   'nowrap',
          }}>
            {item.note || '—'}
          </span>

          {/* Amount + Actions */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
            <span style={{
              color:      isIncome ? '#10b981' : '#ef4444',
              fontSize:   '14px',
              fontWeight: 600,
            }}>
              {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
            </span>

            {hoveredId === item.id && (
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  onClick={() => onEdit(item)}
                  style={{
                    width:           '28px',
                    height:          '28px',
                    backgroundColor: '#1e293b',
                    border:          '1px solid #334155',
                    borderRadius:    '7px',
                    color:           '#94a3b8',
                    cursor:          'pointer',
                    fontSize:        '13px',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}
                  title="Edit"
                >
                  ✏️
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  style={{
                    width:           '28px',
                    height:          '28px',
                    backgroundColor: 'rgba(239,68,68,0.1)',
                    border:          '1px solid rgba(239,68,68,0.2)',
                    borderRadius:    '7px',
                    color:           '#ef4444',
                    cursor:          'pointer',
                    fontSize:        '13px',
                    display:         'flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                  }}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Pagination */}
      {!loading && (data?.totalPages ?? 0) > 1 && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
        />
      )}

      {/* Footer count */}
      {!loading && (data?.content?.length ?? 0) > 0 && (
        <div style={{
          padding:         '10px 22px',
          borderTop:       '1px solid #1e293b',
          backgroundColor: '#0a1628',
        }}>
          <span style={{ color: '#64748b', fontSize: '12px' }}>
            Showing {data.content.length} of {data.totalElements} records
          </span>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;