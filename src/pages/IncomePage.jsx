import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useIncome }       from '../hooks/useIncome';
import PageWrapper         from '../components/common/PageWrapper';
import TransactionTable    from '../components/transactions/TransactionTable';
import TransactionForm     from '../components/transactions/TransactionForm';

const IncomePage = () => {
  const {
    data, page, loading, saving,
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
      subtitle={`${data.totalElements} records total`}
      action={
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400
                     text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
        >
          <Plus size={16} />
          Add Income
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