import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      backgroundColor: '#1e293b',
      border:          '1px solid #334155',
      borderRadius:    '10px',
      padding:         '10px 14px',
      fontSize:        '13px',
    }}>
      <p style={{ color: '#94a3b8', marginBottom: '6px', fontWeight: 500 }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color, margin: '2px 0' }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#0f172a',
  border:          '1px solid #1e293b',
  borderRadius:    '16px',
  padding:         '22px',
};

const ExpenseChart = ({ summary }) => {
  if (!summary) return null;

  const overviewData = [{
    name:     'This Month',
    Income:   Number(summary.totalIncome   ?? 0),
    Expenses: Number(summary.totalExpenses ?? 0),
    Savings:  Number(summary.netSavings    ?? 0),
  }];

  const COLORS = ['#10b981','#3b82f6','#f59e0b','#ef4444','#8b5cf6','#06b6d4'];

  const categoryData = Object.entries(summary.expenseByCategory || {})
    .map(([name, value]) => ({ name, value: Number(value) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: '1fr 1fr',
      gap:                 '16px',
      marginBottom:        '24px',
    }}>

      {/* Overview */}
      <div style={cardStyle}>
        <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>
          Monthly Overview
        </h3>
        <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 18px 0' }}>
          Income vs Expenses vs Savings
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }}
                   tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: '#94a3b8', fontSize: 12 }} />
            <Bar dataKey="Income"   fill="#10b981" radius={[6,6,0,0]} />
            <Bar dataKey="Expenses" fill="#ef4444" radius={[6,6,0,0]} />
            <Bar dataKey="Savings"  fill="#3b82f6" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Categories */}
      <div style={cardStyle}>
        <h3 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, margin: '0 0 4px 0' }}>
          Expenses by Category
        </h3>
        <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 18px 0' }}>
          Top spending categories
        </p>
        {categoryData.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', color: '#64748b', fontSize: '14px' }}>
            No expense data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }}
                     tickFormatter={v => `$${v}`} />
              <YAxis dataKey="name" type="category"
                     tick={{ fill: '#64748b', fontSize: 11 }} width={85} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0,6,6,0]}>
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