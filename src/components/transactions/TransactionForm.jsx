import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const INCOME_CATEGORIES  = ['SALARY','FREELANCE','INVESTMENT','BUSINESS','GIFT','OTHER'];
const EXPENSE_CATEGORIES = ['FOOD','TRANSPORT','HOUSING','ENTERTAINMENT',
                            'HEALTH','EDUCATION','SHOPPING','UTILITIES','OTHER'];

const TransactionForm = ({ type, initial, onSubmit, onClose, loading }) => {
  const isIncome = type === 'income';
  const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const [form, setForm] = useState({
    source:   '',
    title:    '',
    amount:   '',
    date:     new Date().toISOString().split('T')[0],
    category: categories[0],
    note:     '',
    ...initial,
  });

  useEffect(() => {
    if (initial) setForm(prev => ({ ...prev, ...initial }));
  }, [initial]);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = isIncome
      ? { source: form.source, amount: Number(form.amount),
          date: form.date, category: form.category, note: form.note }
      : { title:  form.title,  amount: Number(form.amount),
          date: form.date, category: form.category, note: form.note };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm
                    flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl
                      w-full max-w-md p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">
            {initial ? 'Edit' : 'Add'}{' '}
            {isIncome ? 'Income' : 'Expense'}
          </h2>
          <button onClick={onClose}
            className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Source or Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              {isIncome ? 'Source' : 'Title'}
            </label>
            <input
              name={isIncome ? 'source' : 'title'}
              value={isIncome ? form.source : form.title}
              onChange={handleChange}
              placeholder={isIncome ? 'e.g. Salary' : 'e.g. Groceries'}
              required
              className="w-full bg-gray-800 border border-gray-700 text-white
                         placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Amount ($)
              </label>
              <input
                name="amount"
                type="number"
                min="0.01"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
                className="w-full bg-gray-800 border border-gray-700 text-white
                           placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Date
              </label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 text-white
                           rounded-xl px-4 py-2.5 text-sm
                           focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-white
                         rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-emerald-500 transition"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Note <span className="text-gray-500">(optional)</span>
            </label>
            <input
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Add a note..."
              className="w-full bg-gray-800 border border-gray-700 text-white
                         placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm
                         focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300
                         font-medium py-2.5 rounded-xl transition text-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white
                         font-medium py-2.5 rounded-xl transition text-sm
                         disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Saving...' : (initial ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;