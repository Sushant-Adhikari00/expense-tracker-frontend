import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate }     from '../../utils/formatDate';
import Pagination         from './Pagination';

const TransactionTable = ({
  type,         // 'income' | 'expense'
  data,         // PageResponse shape
  loading,
  onEdit,
  onDelete,
  onPageChange,
  onAdd,
}) => {
  const isIncome = type === 'income';

  const columns = isIncome
    ? ['Source', 'Category', 'Date', 'Note', 'Amount']
    : ['Title',  'Category', 'Date', 'Note', 'Amount'];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

      {/* Column headers */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-800
                      text-xs font-medium text-gray-400 uppercase tracking-wider">
        <span className="col-span-3">{columns[0]}</span>
        <span className="col-span-2">{columns[1]}</span>
        <span className="col-span-2">{columns[2]}</span>
        <span className="col-span-3">{columns[3]}</span>
        <span className="col-span-2 text-right">{columns[4]}</span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-emerald-500
                          border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && data?.content?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <p className="text-gray-500 text-sm">
            No {isIncome ? 'income' : 'expense'} records yet
          </p>
          <button
            onClick={onAdd}
            className="text-emerald-400 text-sm hover:text-emerald-300 transition"
          >
            + Add your first {isIncome ? 'income' : 'expense'}
          </button>
        </div>
      )}

      {/* Rows */}
      {!loading && data?.content?.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 gap-4 px-6 py-4 items-center
                     border-b border-gray-800 last:border-0
                     hover:bg-gray-800/50 transition-all group"
        >
          {/* Name */}
          <div className="col-span-3">
            <p className="text-white text-sm font-medium truncate">
              {isIncome ? item.source : item.title}
            </p>
          </div>

          {/* Category badge */}
          <div className="col-span-2">
            <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium
              ${isIncome
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
              {item.category}
            </span>
          </div>

          {/* Date */}
          <span className="col-span-2 text-gray-400 text-sm">
            {formatDate(item.date)}
          </span>

          {/* Note */}
          <span className="col-span-3 text-gray-500 text-xs truncate">
            {item.note || '—'}
          </span>

          {/* Amount + actions */}
          <div className="col-span-2 flex items-center justify-end gap-2">
            <span className={`text-sm font-semibold
              ${isIncome ? 'text-emerald-400' : 'text-red-400'}`}>
              {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
            </span>

            {/* Hover actions */}
            <div className="flex items-center gap-1
                            opacity-0 group-hover:opacity-100 transition-all">
              <button
                onClick={() => onEdit(item)}
                className="p-1.5 text-gray-400 hover:text-white
                           hover:bg-gray-700 rounded-lg transition"
                title="Edit"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 text-gray-400 hover:text-red-400
                           hover:bg-red-500/10 rounded-lg transition"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {!loading && data?.totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-800">
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}

      {/* Footer: total count */}
      {!loading && data?.content?.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-800 bg-gray-800/30">
          <p className="text-gray-500 text-xs">
            Showing {data.content.length} of {data.totalElements} records
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;