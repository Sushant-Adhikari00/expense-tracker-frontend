import { useState } from 'react';
import { useExpense }      from '../hooks/useExpense';
import PageWrapper         from '../components/common/PageWrapper';
import TransactionTable    from '../components/transactions/TransactionTable';
import TransactionForm     from '../components/transactions/TransactionForm';

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



const ExpensePage = () => {
  const {
    data, loading, saving,
    setPage, createExpense, updateExpense, deleteExpense,
  } = useExpense();

  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);

  const handleCreate = async (payload) => {
    const ok = await createExpense(payload);
    if (ok) setShowForm(false);
  };

  const handleUpdate = async (payload) => {
    const ok = await updateExpense(editing.id, payload);
    if (ok) setEditing(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this expense?')) return;
    await deleteExpense(id);
  };

  return (
    <PageWrapper
      title="Expenses"
      subtitle={`${data.totalElements ?? 0} records total`}
      action={
        <button style={addBtnStyle} onClick={() => setShowForm(true)}>
          + Add Expense
        </button>
      }
    >
      <TransactionTable
        type="expense"
        data={data}
        loading={loading}
        onEdit={setEditing}
        onDelete={handleDelete}
        onPageChange={setPage}
        onAdd={() => setShowForm(true)}
      />

      {showForm && (
        <TransactionForm
          type="expense"
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          loading={saving}
        />
      )}

      {editing && (
        <TransactionForm
          type="expense"
          initial={editing}
          onSubmit={handleUpdate}
          onClose={() => setEditing(null)}
          loading={saving}
        />
      )}
    </PageWrapper>
  );
};

export default ExpensePage;