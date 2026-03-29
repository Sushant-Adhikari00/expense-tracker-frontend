import { useState } from 'react';
import { Plus, PiggyBank } from 'lucide-react';
import { useGoals }    from '../hooks/useGoals';
import PageWrapper     from '../components/common/PageWrapper';
import GoalCard        from '../components/goals/GoalCard';
import GoalForm        from '../components/goals/GoalForm';
import { formatCurrency } from '../utils/formatCurrency';
import toast from 'react-hot-toast';

const DepositModal = ({ goal, onDeposit, onClose, loading }) => {
  const [amount, setAmount] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm
                    flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl
                      w-full max-w-sm p-6 shadow-2xl">
        <h2 className="text-white font-semibold text-lg mb-1">Add Deposit</h2>
        <p className="text-gray-400 text-sm mb-5">
          {goal.name} · {formatCurrency(goal.savedAmount)} saved so far
        </p>
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount to deposit"
          className="w-full bg-gray-800 border border-gray-700 text-white
                     placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm mb-4
                     focus:outline-none focus:border-emerald-500 transition"
        />
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300
                       font-medium py-2.5 rounded-xl transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onDeposit(Number(amount))}
            disabled={!amount || Number(amount) <= 0 || loading}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white
                       font-semibold py-2.5 rounded-xl transition text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Depositing...' : 'Deposit'}
          </button>
        </div>
      </div>
    </div>
  );
};

const GoalsPage = () => {
  const {
    goals, loading, saving,
    createGoal, updateGoal,
    depositToGoal, updateGoalStatus, deleteGoal,
  } = useGoals();

  const [showForm,    setShowForm]    = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [depositGoal, setDepositGoal] = useState(null);

  const handleCreate = async (payload) => {
    const ok = await createGoal(payload);
    if (ok) setShowForm(false);
  };

  const handleUpdate = async (payload) => {
    const ok = await updateGoal(editingGoal.id, payload);
    if (ok) setEditingGoal(null);
  };

  const handleDeposit = async (amount) => {
    const ok = await depositToGoal(depositGoal.id, amount);
    if (ok) setDepositGoal(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    await deleteGoal(id);
  };

  // Stats for summary row
  const inProgress = goals.filter(g => g.status === 'IN_PROGRESS').length;
  const completed  = goals.filter(g => g.status === 'COMPLETED').length;

  return (
    <PageWrapper
      title="Saving Goals"
      subtitle="Track your financial milestones"
      action={
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400
                     text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
        >
          <Plus size={16} />
          New Goal
        </button>
      }
    >
      {/* Stats row */}
      {goals.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total Goals',  value: goals.length,  color: 'text-white'        },
            { label: 'In Progress',  value: inProgress,    color: 'text-blue-400'     },
            { label: 'Completed',    value: completed,     color: 'text-emerald-400'  },
          ].map(({ label, value, color }) => (
            <div key={label}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <p className="text-gray-400 text-sm">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-2 border-emerald-500
                          border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && goals.length === 0 && (
        <div className="flex flex-col items-center justify-center
                        bg-gray-900 border border-gray-800 rounded-2xl py-20 gap-4">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl
                          flex items-center justify-center">
            <PiggyBank size={24} className="text-emerald-400" />
          </div>
          <div className="text-center">
            <p className="text-white font-medium">No saving goals yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Set your first financial target to get started
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-white
                       text-sm font-medium px-5 py-2.5 rounded-xl transition"
          >
            Create First Goal
          </button>
        </div>
      )}

      {/* Goal cards grid */}
      {!loading && goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={setEditingGoal}
              onDelete={handleDelete}
              onDeposit={setDepositGoal}
              onStatusChange={updateGoalStatus}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {showForm && (
        <GoalForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          loading={saving}
        />
      )}

      {editingGoal && (
        <GoalForm
          initial={editingGoal}
          onSubmit={handleUpdate}
          onClose={() => setEditingGoal(null)}
          loading={saving}
        />
      )}

      {depositGoal && (
        <DepositModal
          goal={depositGoal}
          onDeposit={handleDeposit}
          onClose={() => setDepositGoal(null)}
          loading={saving}
        />
      )}
    </PageWrapper>
  );
};

export default GoalsPage;