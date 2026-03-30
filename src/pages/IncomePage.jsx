import { useState } from 'react';
import { useIncome }       from '../hooks/useIncome';
import PageWrapper         from '../components/common/PageWrapper';
import TransactionTable    from '../components/transactions/TransactionTable';
import TransactionForm     from '../components/transactions/TransactionForm';

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
    setPage, createIncome, updateIncome, deleteIncome,
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
      subtitle={`${data.totalElements ?? 0} records total`}
      action={
        <button style={addBtnStyle} onClick={() => setShowForm(true)}>
          + Add Income
        </button>
      }
    >
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