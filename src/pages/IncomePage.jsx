import { useState }            from 'react';
import { useIncome }           from '../hooks/useIncome';
import PageWrapper             from '../components/common/PageWrapper';
import TransactionTable        from '../components/transactions/TransactionTable';
import TransactionForm         from '../components/transactions/TransactionForm';
import FilterBar               from '../components/transactions/FilterBar';
import { formatCurrency }      from '../utils/formatCurrency';

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

const IncomePage = () => {
  const {
    data, loading, saving,
    filters, isFiltered,
    setPage, applyFilters, resetFilters,
    createIncome, updateIncome, deleteIncome,
  } = useIncome();

  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);

  const handleCreate = async (payload) => {
    const ok = await createIncome(payload);
    if (ok) setShowForm(false);
  };

  const handleUpdate = async (payload) => {
    const ok = await updateIncome(editing.id, payload);
    if (ok) setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this income?')) return;
    await deleteIncome(id);
  };

  return (
    <PageWrapper
      title="Income"
      subtitle={
        isFiltered
          ? `${data.totalElements} results · Total: ${formatCurrency(data.totalAmount ?? 0)}`
          : `${data.totalElements ?? 0} records total`
      }
      action={
        <button style={addBtnStyle} onClick={() => setShowForm(true)}>
          + Add Income
        </button>
      }
    >

      {/* Filter bar */}
      <FilterBar
        type="income"
        filters={filters}
        onChange={applyFilters}
        onReset={resetFilters}
      />

      {/* Summary strip — only visible when filters are active */}
      {isFiltered && data.totalElements > 0 && (
        <div style={{
          display:      'flex',
          gap:          '12px',
          marginBottom: '16px',
          flexWrap:     'wrap',
        }}>
          {[
            { label: 'Matching Records', value: data.totalElements,                         color: '#ffffff' },
            { label: 'Total Amount',     value: formatCurrency(data.totalAmount ?? 0),      color: '#10b981' },
            { label: 'Average Amount',   value: formatCurrency(data.averageAmount ?? 0),    color: '#60a5fa' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{
              backgroundColor: '#0f172a',
              border:          '1px solid #1e293b',
              borderRadius:    '10px',
              padding:         '10px 16px',
              flex:            1,
              minWidth:        '140px',
            }}>
              <p style={{
                color:        '#64748b',
                fontSize:     '11px',
                fontWeight:   600,
                textTransform:'uppercase',
                letterSpacing:'0.05em',
                margin:       '0 0 4px 0',
              }}>
                {label}
              </p>
              <p style={{
                color,
                fontSize:   '18px',
                fontWeight: 700,
                margin:     0,
              }}>
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      <TransactionTable
        type="income"
        data={data}
        loading={loading}
        onEdit={setEditing}
        onDelete={handleDelete}
        onPageChange={setPage}
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <TransactionForm
          type="income"
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          loading={saving}
        />
      )}

      {editing && (
        <TransactionForm
          type="income"
          initial={editing}
          onSubmit={handleUpdate}
          onClose={() => setEditing(null)}
          loading={saving}
        />
      )}
    </PageWrapper>
  );
};

export default IncomePage;