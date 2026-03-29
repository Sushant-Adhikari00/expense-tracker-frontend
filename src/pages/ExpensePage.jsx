import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpense }      from '../hooks/useExpense';
import PageWrapper         from '../components/common/PageWrapper';
import TransactionTable    from '../components/transactions/TransactionTable';
import TransactionForm     from '../components/transactions/TransactionForm';

const ExpensePage = () => {
  const {
    data, page, loading, saving,
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
      subtitle={`${data.totalElements} records total`}
      action={
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400
                     text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
        >
          <Plus size={16} />
          Add Expense
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