import { AlertTriangle, Lightbulb, TrendingDown, CheckCircle } from 'lucide-react';

const suggestions = (summary) => {
  const list = [];

  if (!summary) return list;

  if (summary.expensesExceed70Percent) {
    list.push({
      type:    'warning',
      icon:    AlertTriangle,
      title:   'High Spending Alert',
      message: `Your expenses exceed 70% of your income this month.
                Consider reviewing discretionary spending categories.`,
      color: {
        bg:     'bg-amber-500/10',
        border: 'border-amber-500/20',
        icon:   'text-amber-400',
        title:  'text-amber-300',
        text:   'text-amber-400/80',
      },
    });
  }

  if (summary.savingsRateLow && !summary.expensesExceed70Percent) {
    list.push({
      type:    'info',
      icon:    Lightbulb,
      title:   'Low Savings Rate',
      message: `Your savings rate is below 20%. Try automating a fixed
                monthly transfer to your savings goals.`,
      color: {
        bg:     'bg-blue-500/10',
        border: 'border-blue-500/20',
        icon:   'text-blue-400',
        title:  'text-blue-300',
        text:   'text-blue-400/80',
      },
    });
  }

  if (summary.netSavings < 0) {
    list.push({
      type:    'danger',
      icon:    TrendingDown,
      title:   'Spending Exceeds Income',
      message: `You spent more than you earned this month.
                Review your largest expense categories immediately.`,
      color: {
        bg:     'bg-red-500/10',
        border: 'border-red-500/20',
        icon:   'text-red-400',
        title:  'text-red-300',
        text:   'text-red-400/80',
      },
    });
  }

  if (
    !summary.expensesExceed70Percent &&
    !summary.savingsRateLow &&
    summary.netSavings > 0
  ) {
    list.push({
      type:    'success',
      icon:    CheckCircle,
      title:   'Great Financial Health',
      message: `You are saving over 20% of your income this month.
                Keep it up and consider allocating extra savings to your goals.`,
      color: {
        bg:     'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        icon:   'text-emerald-400',
        title:  'text-emerald-300',
        text:   'text-emerald-400/80',
      },
    });
  }

  return list;
};

const AISuggestions = ({ summary }) => {
  const items = suggestions(summary);

  if (!items.length) return null;

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`${item.color.bg} border ${item.color.border}
                        rounded-2xl px-5 py-4 flex items-start gap-3`}
          >
            <Icon size={18} className={`${item.color.icon} mt-0.5 shrink-0`} />
            <div>
              <p className={`font-medium text-sm ${item.color.title}`}>
                {item.title}
              </p>
              <p className={`text-xs mt-0.5 leading-relaxed ${item.color.text}`}>
                {item.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AISuggestions;