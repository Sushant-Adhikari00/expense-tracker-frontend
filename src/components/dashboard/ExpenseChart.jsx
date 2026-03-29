import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-3 text-sm">
      <p className="text-gray-300 font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const ExpenseChart = ({ summary }) => {
  if (!summary) return null;

  // Build category data for bar chart
  const categoryData = Object.entries(summary.expenseByCategory || {})
    .map(([name, value]) => ({ name, value: Number(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const COLORS = [
    '#10b981', '#3b82f6', '#f59e0b',
    '#ef4444', '#8b5cf6', '#06b6d4'
  ];

  // Income vs Expense overview bar
  const overviewData = [
    {
      name:     'This Month',
      Income:   Number(summary.totalIncome   ?? 0),
      Expenses: Number(summary.totalExpenses ?? 0),
      Savings:  Number(summary.netSavings    ?? 0),
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Income vs Expenses */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-1">Monthly Overview</h3>
        <p className="text-gray-400 text-xs mb-5">Income vs Expenses vs Savings</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={overviewData} barCategoryGap="40%">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }}
                   tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#9ca3af', fontSize: 12 }} />
            <Bar dataKey="Income"   fill="#10b981" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Expenses" fill="#ef4444" radius={[6, 6, 0, 0]} />
            <Bar dataKey="Savings"  fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Expense by Category */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-1">Expenses by Category</h3>
        <p className="text-gray-400 text-xs mb-5">Top spending categories</p>
        {categoryData.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <p className="text-gray-500 text-sm">No expense data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" tick={{ fill: '#9ca3af', fontSize: 11 }}
                     tickFormatter={(v) => `$${v}`} />
              <YAxis dataKey="name" type="category"
                     tick={{ fill: '#9ca3af', fontSize: 11 }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseChart;