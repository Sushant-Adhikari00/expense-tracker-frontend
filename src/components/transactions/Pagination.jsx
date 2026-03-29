import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        className="p-2 rounded-lg border border-gray-700 text-gray-400
                   hover:text-white hover:border-gray-600 disabled:opacity-30
                   disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={16} />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition
            ${i === page
              ? 'bg-emerald-500 text-white border border-emerald-500'
              : 'border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
            }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        className="p-2 rounded-lg border border-gray-700 text-gray-400
                   hover:text-white hover:border-gray-600 disabled:opacity-30
                   disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;