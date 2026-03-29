import { useState, useEffect } from 'react';
import { X, Target } from 'lucide-react';

const GoalForm = ({ initial, onSubmit, onClose, loading }) => {
  const [form, setForm] = useState({
    name:         '',
    targetAmount: '',
    savedAmount:  '',
    targetDate:   '',
    note:         '',
  });

  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (initial) {
      setForm({
        name:         initial.name         || '',
        targetAmount: initial.targetAmount || '',
        savedAmount:  initial.savedAmount  || '',
        targetDate:   initial.targetDate   || '',
        note:         initial.note         || '',
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())
      newErrors.name = 'Goal name is required';
    if (!form.targetAmount || Number(form.targetAmount) <= 0)
      newErrors.targetAmount = 'Target amount must be positive';
    if (form.savedAmount && Number(form.savedAmount) < 0)
      newErrors.savedAmount = 'Saved amount cannot be negative';
    if (form.savedAmount && Number(form.savedAmount) > Number(form.targetAmount))
      newErrors.savedAmount = 'Saved amount cannot exceed target';
    if (!form.targetDate)
      newErrors.targetDate = 'Target date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name:         form.name.trim(),
      targetAmount: Number(form.targetAmount),
      savedAmount:  Number(form.savedAmount) || 0,
      targetDate:   form.targetDate,
      note:         form.note.trim(),
    });
  };

  const fieldClass = (name) =>
    `w-full bg-gray-800 border text-white placeholder-gray-500
     rounded-xl px-4 py-2.5 text-sm focus:outline-none transition
     ${errors[name]
       ? 'border-red-500 focus:border-red-500'
       : 'border-gray-700 focus:border-emerald-500'
     }`;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm
                    flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl
                      w-full max-w-md p-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20
                            rounded-xl flex items-center justify-center">
              <Target size={16} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold">
                {initial ? 'Edit Goal' : 'New Saving Goal'}
              </h2>
              <p className="text-gray-500 text-xs">
                {initial ? 'Update your goal details' : 'Set a new financial target'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition p-1"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Goal name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Goal Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Emergency Fund, New Laptop"
              className={fieldClass('name')}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Target + Saved amounts */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Target Amount ($)
              </label>
              <input
                name="targetAmount"
                type="number"
                min="1"
                step="0.01"
                value={form.targetAmount}
                onChange={handleChange}
                placeholder="10,000"
                className={fieldClass('targetAmount')}
              />
              {errors.targetAmount && (
                <p className="text-red-400 text-xs mt-1">{errors.targetAmount}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Already Saved ($)
              </label>
              <input
                name="savedAmount"
                type="number"
                min="0"
                step="0.01"
                value={form.savedAmount}
                onChange={handleChange}
                placeholder="0"
                className={fieldClass('savedAmount')}
              />
              {errors.savedAmount && (
                <p className="text-red-400 text-xs mt-1">{errors.savedAmount}</p>
              )}
            </div>
          </div>

          {/* Target date */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Target Date
            </label>
            <input
              name="targetDate"
              type="date"
              value={form.targetDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={fieldClass('targetDate')}
            />
            {errors.targetDate && (
              <p className="text-red-400 text-xs mt-1">{errors.targetDate}</p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Note{' '}
              <span className="text-gray-500 font-normal">(optional)</span>
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="What is this goal for?"
              rows={2}
              className={`${fieldClass('note')} resize-none`}
            />
          </div>

          {/* Preview progress if editing */}
          {form.targetAmount && form.savedAmount && (
            <div className="bg-gray-800/60 rounded-xl p-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>Current progress</span>
                <span className="text-emerald-400">
                  {Math.min(
                    (Number(form.savedAmount) / Number(form.targetAmount)) * 100,
                    100
                  ).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      (Number(form.savedAmount) / Number(form.targetAmount)) * 100,
                      100
                    )}%`
                  }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300
                         font-medium py-2.5 rounded-xl transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white
                         font-semibold py-2.5 rounded-xl transition text-sm
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Saving...'
                : initial ? 'Update Goal' : 'Create Goal'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;