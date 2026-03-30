import { useState, useEffect } from 'react';

const INCOME_CATEGORIES  = ['SALARY','FREELANCE','INVESTMENT','BUSINESS','GIFT','OTHER'];
const EXPENSE_CATEGORIES = ['FOOD','TRANSPORT','HOUSING','ENTERTAINMENT',
                            'HEALTH','EDUCATION','SHOPPING','UTILITIES','OTHER'];

const TransactionForm = ({ type, initial, onSubmit, onClose, loading }) => {
  const isIncome   = type === 'income';
  const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const [form, setForm] = useState({
    source:   '',
    title:    '',
    amount:   '',
    date:     new Date().toISOString().split('T')[0],
    category: categories[0],
    note:     '',
  });

  useEffect(() => {
    if (initial) setForm(prev => ({ ...prev, ...initial }));
  }, [initial]);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = isIncome
      ? { source: form.source, amount: Number(form.amount), date: form.date, category: form.category, note: form.note }
      : { title:  form.title,  amount: Number(form.amount), date: form.date, category: form.category, note: form.note };
    onSubmit(payload);
  };

  return (
    <>
      {/* Global style reset for this modal */}
      <style>{`
        .tf-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px); display: flex; align-items: center;
          justify-content: center; z-index: 9999; padding: 16px; }
        .tf-box { background: #0f172a; border: 1px solid #1e293b;
          border-radius: 20px; padding: 28px; width: 100%; max-width: 440px;
          box-shadow: 0 32px 64px rgba(0,0,0,0.6); font-family: Inter, sans-serif; }
        .tf-header { display: flex; align-items: center;
          justify-content: space-between; margin-bottom: 24px; }
        .tf-title { color: #ffffff; font-size: 18px;
          font-weight: 700; margin: 0; }
        .tf-close { background: none; border: none; color: #64748b;
          font-size: 22px; cursor: pointer; line-height: 1;
          padding: 0; width: 28px; height: 28px; display: flex;
          align-items: center; justify-content: center;
          border-radius: 6px; }
        .tf-close:hover { background: #1e293b; color: #ffffff; }
        .tf-field { display: flex; flex-direction: column; gap: 6px;
          margin-bottom: 16px; }
        .tf-label { color: #94a3b8; font-size: 13px; font-weight: 500; }
        .tf-input { display: block; width: 100%; background: #1e293b;
          border: 1px solid #334155; border-radius: 10px;
          padding: 11px 14px; color: #ffffff; font-size: 14px;
          outline: none; box-sizing: border-box;
          font-family: Inter, sans-serif; }
        .tf-input:focus { border-color: #10b981; }
        .tf-input::placeholder { color: #475569; }
        .tf-row { display: flex; gap: 12px; margin-bottom: 16px; }
        .tf-row .tf-field { flex: 1; margin-bottom: 0; }
        .tf-actions { display: flex; gap: 10px; margin-top: 24px; }
        .tf-btn-cancel { flex: 1; background: #1e293b; border: 1px solid #334155;
          border-radius: 10px; color: #94a3b8; font-size: 14px;
          font-weight: 600; padding: 12px; cursor: pointer;
          font-family: Inter, sans-serif; }
        .tf-btn-cancel:hover { background: #263347; color: #ffffff; }
        .tf-btn-submit { flex: 1; background: #10b981; border: none;
          border-radius: 10px; color: #ffffff; font-size: 14px;
          font-weight: 600; padding: 12px; cursor: pointer;
          font-family: Inter, sans-serif; }
        .tf-btn-submit:hover { background: #059669; }
        .tf-btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <div className="tf-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="tf-box">

          {/* Header */}
          <div className="tf-header">
            <h2 className="tf-title">
              {initial ? 'Edit' : 'Add'} {isIncome ? 'Income' : 'Expense'}
            </h2>
            <button className="tf-close" onClick={onClose}>×</button>
          </div>

          <form onSubmit={handleSubmit}>

            {/* Source or Title */}
            <div className="tf-field">
              <label className="tf-label">
                {isIncome ? 'Source' : 'Title'}
              </label>
              <input
                className="tf-input"
                name={isIncome ? 'source' : 'title'}
                value={isIncome ? form.source : form.title}
                onChange={handleChange}
                placeholder={isIncome ? 'e.g. Salary, Freelance' : 'e.g. Groceries, Netflix'}
                required
              />
            </div>

            {/* Amount + Date side by side */}
            <div className="tf-row">
              <div className="tf-field">
                <label className="tf-label">Amount ($)</label>
                <input
                  className="tf-input"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="tf-field">
                <label className="tf-label">Date</label>
                <input
                  className="tf-input"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="tf-field">
              <label className="tf-label">Category</label>
              <select
                className="tf-input"
                name="category"
                value={form.category}
                onChange={handleChange}
                style={{ cursor: 'pointer' }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}
                    style={{ backgroundColor: '#1e293b', color: '#ffffff' }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div className="tf-field" style={{ marginBottom: 0 }}>
              <label className="tf-label">
                Note{' '}
                <span style={{ color: '#475569', fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <input
                className="tf-input"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Add a note..."
              />
            </div>

            {/* Buttons */}
            <div className="tf-actions">
              <button
                type="button"
                className="tf-btn-cancel"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="tf-btn-submit"
                disabled={loading}
              >
                {loading ? 'Saving...' : (initial ? 'Update' : 'Add')}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default TransactionForm;