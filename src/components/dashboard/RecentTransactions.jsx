import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

const RecentTransactions = ({ incomes = [], expenses = [] }) => {

  // Merge and sort by date descending, take latest 5
  const transactions = [
    ...incomes.map(i  => ({ ...i,  type: 'income'  })),
    ...expenses.map(e => ({ ...e,  type: 'expense' })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold">Recent Transactions</h3>
          <p className="text-gray-400 text-xs mt-0.5">Latest activity</p>
        </div>
        <Link to="/expenses"
          className="text-emerald-400 hover:text-emerald-300
                     text-xs font-medium transition">
          View all
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-500 text-sm">No transactions yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={`${tx.type}-${tx.id}`}
              className="flex items-center justify-between
                         py-3 border-b border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                  ${tx.type === 'income'
                    ? 'bg-emerald-500/10'
                    : 'bg-red-500/10'}`}>
                  {tx.type === 'income'
                    ? <ArrowUpRight   size={16} className="text-emerald-400" />
                    : <ArrowDownRight size={16} className="text-red-400"     />
                  }
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {tx.type === 'income' ? tx.source : tx.title}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {tx.category} · {formatDate(tx.date)}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold
                ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                {tx.type === 'income' ? '+' : '-'}
                {formatCurrency(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;