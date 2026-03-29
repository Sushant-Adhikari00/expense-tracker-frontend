import { ArrowUpRight, ArrowDownRight, PiggyBank, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const cards = [
  {
    key:     'totalIncome',
    label:   'Total Income',
    icon:    ArrowUpRight,
    color:   'emerald',
    bg:      'bg-emerald-500/10',
    text:    'text-emerald-400',
    border:  'border-emerald-500/20',
  },
  {
    key:     'totalExpenses',
    label:   'Total Expenses',
    icon:    ArrowDownRight,
    color:   'red',
    bg:      'bg-red-500/10',
    text:    'text-red-400',
    border:  'border-red-500/20',
  },
  {
    key:     'netSavings',
    label:   'Net Savings',
    icon:    PiggyBank,
    color:   'blue',
    bg:      'bg-blue-500/10',
    text:    'text-blue-400',
    border:  'border-blue-500/20',
  },
  {
    key:     'savingsRate',
    label:   'Savings Rate',
    icon:    TrendingUp,
    color:   'purple',
    bg:      'bg-purple-500/10',
    text:    'text-purple-400',
    border:  'border-purple-500/20',
    isRate:  true,
  },
];

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon: Icon, bg, text, border, isRate }) => (
        <div
          key={key}
          className={`bg-gray-900 border ${border} rounded-2xl p-5
                      hover:border-opacity-40 transition-all duration-200`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm font-medium">{label}</span>
            <div className={`w-9 h-9 ${bg} rounded-xl
                            flex items-center justify-center`}>
              <Icon size={16} className={text} />
            </div>
          </div>
          <p className={`text-2xl font-bold ${text}`}>
            {isRate
              ? `${summary[key]?.toFixed(1)}%`
              : formatCurrency(summary[key] ?? 0)
            }
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;