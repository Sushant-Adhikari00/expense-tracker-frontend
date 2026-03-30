import { useState, useEffect } from 'react';

const inputStyle = {
  display:         'block',
  width:           '100%',
  backgroundColor: '#1e293b',
  border:          '1px solid #334155',
  borderRadius:    '10px',
  padding:         '10px 14px',
  color:           '#ffffff',
  fontSize:        '14px',
  outline:         'none',
  boxSizing:       'border-box',
};

const labelStyle = {
  display:      'block',
  color:        '#cbd5e1',
  fontSize:     '13px',
  fontWeight:   500,
  marginBottom: '6px',
};

const GoalForm = ({ initial, onSubmit, onClose, loading }) => {
  const [form, setForm] = useState({
    name: '', targetAmount: '', savedAmount: '', targetDate: '', note: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) setForm({
      name:         initial.name         || '',
      targetAmount: initial.targetAmount || '',
      savedAmount:  initial.savedAmount  || '',
      targetDate:   initial.targetDate   || '',
      note:         initial.note         || '',
    });
  }, [initial]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                             e.name         = 'Required';
    if (!form.targetAmount || Number(form.targetAmount) <= 0)          e.targetAmount = 'Must be positive';
    if (form.savedAmount && Number(form.savedAmount) < 0)              e.savedAmount  = 'Cannot be negative';
    if (form.savedAmount && Number(form.savedAmount) > Number(form.targetAmount)) e.savedAmount = 'Cannot exceed target';
    if (!form.targetDate)                                              e.targetDate   = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
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

  const progress = form.targetAmount && form.savedAmount
    ? Math.min((Number(form.savedAmount) / Number(form.targetAmount)) * 100, 100)
    : 0;

  return (
    <div style={{
      position:        'fixed',
      inset:           0,
      backgroundColor: 'rgba(0,0,0,0.7)',
      backdropFilter:  'blur(4px)',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'center',
      zIndex:          50,
      padding:         '16px',
    }}>
      <div style={{
        backgroundColor: '#0f172a',
        border:          '1px solid #1e293b',
        borderRadius:    '18px',
        padding:         '28px',
        width:           '100%',
        maxWidth:        '440px',
        boxShadow:       '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          marginBottom:   '22px',
        }}>
          <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, margin: 0 }}>
            {initial ? 'Edit Goal' : 'New Saving Goal'}
          </h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            color: '#64748b', cursor: 'pointer', fontSize: '20px',
          }}>×</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          <div>
            <label style={labelStyle}>Goal Name</label>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Emergency Fund"
              style={{ ...inputStyle, borderColor: errors.name ? '#ef4444' : '#334155' }}
              onFocus={e => e.target.style.borderColor = '#10b981'}
              onBlur={e  => e.target.style.borderColor = errors.name ? '#ef4444' : '#334155'}
            />
            {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.name}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Target Amount ($)</label>
              <input
                name="targetAmount" type="number" min="1" step="0.01"
                value={form.targetAmount} onChange={handleChange}
                placeholder="10,000"
                style={{ ...inputStyle, borderColor: errors.targetAmount ? '#ef4444' : '#334155' }}
                onFocus={e => e.target.style.borderColor = '#10b981'}
                onBlur={e  => e.target.style.borderColor = errors.targetAmount ? '#ef4444' : '#334155'}
              />
              {errors.targetAmount && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.targetAmount}</p>}
            </div>
            <div>
              <label style={labelStyle}>Already Saved ($)</label>
              <input
                name="savedAmount" type="number" min="0" step="0.01"
                value={form.savedAmount} onChange={handleChange}
                placeholder="0"
                style={{ ...inputStyle, borderColor: errors.savedAmount ? '#ef4444' : '#334155' }}
                onFocus={e => e.target.style.borderColor = '#10b981'}
                onBlur={e  => e.target.style.borderColor = errors.savedAmount ? '#ef4444' : '#334155'}
              />
              {errors.savedAmount && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.savedAmount}</p>}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Target Date</label>
            <input
              name="targetDate" type="date"
              value={form.targetDate} onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              style={{ ...inputStyle, borderColor: errors.targetDate ? '#ef4444' : '#334155' }}
              onFocus={e => e.target.style.borderColor = '#10b981'}
              onBlur={e  => e.target.style.borderColor = errors.targetDate ? '#ef4444' : '#334155'}
            />
            {errors.targetDate && <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.targetDate}</p>}
          </div>

          <div>
            <label style={labelStyle}>
              Note <span style={{ color: '#475569', fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              name="note" value={form.note} onChange={handleChange}
              placeholder="What is this goal for?"
              rows={2}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = '#10b981'}
              onBlur={e  => e.target.style.borderColor = '#334155'}
            />
          </div>

          {/* Live progress preview */}
          {form.targetAmount && form.savedAmount && (
            <div style={{ backgroundColor: '#1e293b', borderRadius: '10px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: '#64748b', fontSize: '12px' }}>Progress preview</span>
                <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 600 }}>{progress.toFixed(0)}%</span>
              </div>
              <div style={{ height: '4px', backgroundColor: '#334155', borderRadius: '2px' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '2px' }} />
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
            <button type="button" onClick={onClose} style={{
              backgroundColor: '#1e293b', border: '1px solid #334155',
              borderRadius: '10px', color: '#94a3b8',
              fontSize: '14px', fontWeight: 500, padding: '11px', cursor: 'pointer',
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              backgroundColor: '#10b981', border: 'none',
              borderRadius: '10px', color: '#ffffff',
              fontSize: '14px', fontWeight: 600, padding: '11px',
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Saving...' : (initial ? 'Update Goal' : 'Create Goal')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;