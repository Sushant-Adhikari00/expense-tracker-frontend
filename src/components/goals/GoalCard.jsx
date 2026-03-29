import { Pencil, Trash2, Plus, CheckCircle, XCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate }     from '../../utils/formatDate';

const STATUS_STYLES = {
  IN_PROGRESS: {
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    bar:   'bg-emerald-500',
  },
  COMPLETED: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    bar:   'bg-emerald-500',
  },
  CANCELLED: {
    badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    bar:   'bg-gray-600',
  },
};

const GoalCard = ({ goal, onEdit, onDelete, onDeposit, onStatusChange }) => {
  const styles     = STATUS_STYLES[goal.status] || STATUS_STYLES.IN_PROGRESS;
  const progress   = Math.min(goal.progressPercentage, 100);
  const remaining  = goal.targetAmount - goal.savedAmount;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6
                    hover:border-gray-700 transition-all duration-200 group
                    flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-white font-semibold truncate">{goal.name}</h3>
          <p className="text-gray-500 text-xs mt-0.5">
            Due {formatDate(goal.targetDate)}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Status badge */}
          <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium
            ${styles.badge}`}>
            {goal.status.replace('_', ' ')}
          </span>

          {/* Action buttons — appear on hover */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={() => onEdit(goal)}
              className="p-1.5 text-gray-400 hover:text-white
                         hover:bg-gray-700 rounded-lg transition"
              title="Edit goal"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1.5 text-gray-400 hover:text-red-400
                         hover:bg-red-500/10 rounded-lg transition"
              title="Delete goal"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-emerald-400 font-semibold">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${styles.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Amount breakdown */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gray-800/60 rounded-xl p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Saved</p>
          <p className="text-emerald-400 text-sm font-semibold">
            {formatCurrency(goal.savedAmount)}
          </p>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Target</p>
          <p className="text-white text-sm font-semibold">
            {formatCurrency(goal.targetAmount)}
          </p>
        </div>
        <div className="bg-gray-800/60 rounded-xl p-3 text-center">
          <p className="text-gray-500 text-xs mb-1">Left</p>
          <p className="text-gray-300 text-sm font-semibold">
            {remaining > 0 ? formatCurrency(remaining) : '—'}
          </p>
        </div>
      </div>

      {/* Note */}
      {goal.note && (
        <p className="text-gray-500 text-xs leading-relaxed border-t
                      border-gray-800 pt-3">
          {goal.note}
        </p>
      )}

      {/* Actions */}
      {goal.status === 'IN_PROGRESS' && (
        <div className="flex gap-2 pt-1">
          {/* Deposit */}
          <button
            onClick={() => onDeposit(goal)}
            className="flex-1 flex items-center justify-center gap-1.5
                       bg-emerald-500/10 hover:bg-emerald-500/20
                       text-emerald-400 border border-emerald-500/20
                       text-sm font-medium py-2.5 rounded-xl transition"
          >
            <Plus size={14} />
            Deposit
          </button>

          {/* Mark complete */}
          <button
            onClick={() => onStatusChange(goal.id, 'COMPLETED')}
            className="flex items-center justify-center gap-1.5
                       bg-gray-800 hover:bg-gray-700
                       text-gray-400 hover:text-white
                       border border-gray-700 text-sm
                       font-medium px-3 py-2.5 rounded-xl transition"
            title="Mark as completed"
          >
            <CheckCircle size={14} />
          </button>

          {/* Cancel */}
          <button
            onClick={() => onStatusChange(goal.id, 'CANCELLED')}
            className="flex items-center justify-center gap-1.5
                       bg-gray-800 hover:bg-red-500/10
                       text-gray-400 hover:text-red-400
                       border border-gray-700 hover:border-red-500/20
                       text-sm font-medium px-3 py-2.5 rounded-xl transition"
            title="Cancel goal"
          >
            <XCircle size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalCard;