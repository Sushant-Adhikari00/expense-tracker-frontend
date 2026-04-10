const PRESETS = [
  { value: '',             label: 'All Time'     },
  { value: 'THIS_MONTH',   label: 'This Month'   },
  { value: 'LAST_MONTH',   label: 'Last Month'   },
  { value: 'LAST_3_MONTHS',label: 'Last 3 Months'},
  { value: 'THIS_YEAR',    label: 'This Year'    },
  { value: 'LAST_YEAR',    label: 'Last Year'    },
  { value: 'CUSTOM',       label: 'Custom Range' },
];

const INCOME_CATEGORIES = [
  'SALARY','FREELANCE','INVESTMENT',
  'BUSINESS','GIFT','OTHER'
];

const EXPENSE_CATEGORIES = [
  'FOOD','TRANSPORT','HOUSING','ENTERTAINMENT',
  'HEALTH','EDUCATION','SHOPPING','UTILITIES','OTHER'
];

const inputStyle = {
  backgroundColor: '#1e293b',
  border:          '1px solid #334155',
  borderRadius:    '8px',
  padding:         '7px 12px',
  color:           '#ffffff',
  fontSize:        '13px',
  outline:         'none',
  fontFamily:      'Inter, sans-serif',
};

const FilterBar = ({ type = 'income', filters, onChange, onReset }) => {
  const categories = type === 'income'
    ? INCOME_CATEGORIES
    : EXPENSE_CATEGORIES;

  const showCustom = filters.preset === 'CUSTOM';

  return (
    <div style={{
      backgroundColor: '#0f172a',
      border:          '1px solid #1e293b',
      borderRadius:    '14px',
      padding:         '16px 18px',
      marginBottom:    '16px',
      display:         'flex',
      flexWrap:        'wrap',
      gap:             '10px',
      alignItems:      'flex-end',
    }}>

      {/* Preset selector */}
      <div>
        <label style={{
          display:      'block',
          color:        '#64748b',
          fontSize:     '11px',
          fontWeight:   600,
          textTransform:'uppercase',
          letterSpacing:'0.05em',
          marginBottom: '5px',
        }}>
          Period
        </label>
        <select
          value={filters.preset || ''}
          onChange={e => onChange({ ...filters, preset: e.target.value })}
          style={{ ...inputStyle, cursor: 'pointer', minWidth: '140px' }}
        >
          {PRESETS.map(p => (
            <option key={p.value} value={p.value}
              style={{ backgroundColor: '#1e293b' }}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Custom date range — only shown when preset is CUSTOM */}
      {showCustom && (
        <>
          <div>
            <label style={{
              display:      'block',
              color:        '#64748b',
              fontSize:     '11px',
              fontWeight:   600,
              textTransform:'uppercase',
              letterSpacing:'0.05em',
              marginBottom: '5px',
            }}>
              From
            </label>
            <input
              type="date"
              value={filters.startDate || ''}
              onChange={e =>
                onChange({ ...filters, startDate: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{
              display:      'block',
              color:        '#64748b',
              fontSize:     '11px',
              fontWeight:   600,
              textTransform:'uppercase',
              letterSpacing:'0.05em',
              marginBottom: '5px',
            }}>
              To
            </label>
            <input
              type="date"
              value={filters.endDate || ''}
              onChange={e =>
                onChange({ ...filters, endDate: e.target.value })}
              style={inputStyle}
            />
          </div>
        </>
      )}

      {/* Category */}
      <div>
        <label style={{
          display:      'block',
          color:        '#64748b',
          fontSize:     '11px',
          fontWeight:   600,
          textTransform:'uppercase',
          letterSpacing:'0.05em',
          marginBottom: '5px',
        }}>
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={e =>
            onChange({ ...filters, category: e.target.value || undefined })}
          style={{ ...inputStyle, cursor: 'pointer', minWidth: '130px' }}
        >
          <option value="" style={{ backgroundColor: '#1e293b' }}>
            All Categories
          </option>
          {categories.map(cat => (
            <option key={cat} value={cat}
              style={{ backgroundColor: '#1e293b' }}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Min amount */}
      <div>
        <label style={{
          display:      'block',
          color:        '#64748b',
          fontSize:     '11px',
          fontWeight:   600,
          textTransform:'uppercase',
          letterSpacing:'0.05em',
          marginBottom: '5px',
        }}>
          Min ($)
        </label>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={filters.minAmount || ''}
          onChange={e =>
            onChange({ ...filters, minAmount: e.target.value || undefined })}
          style={{ ...inputStyle, width: '90px' }}
        />
      </div>

      {/* Max amount */}
      <div>
        <label style={{
          display:      'block',
          color:        '#64748b',
          fontSize:     '11px',
          fontWeight:   600,
          textTransform:'uppercase',
          letterSpacing:'0.05em',
          marginBottom: '5px',
        }}>
          Max ($)
        </label>
        <input
          type="number"
          min="0"
          placeholder="∞"
          value={filters.maxAmount || ''}
          onChange={e =>
            onChange({ ...filters, maxAmount: e.target.value || undefined })}
          style={{ ...inputStyle, width: '90px' }}
        />
      </div>

      {/* Source search */}
      <div style={{ flex: 1, minWidth: '140px' }}>
        <label style={{
          display:      'block',
          color:        '#64748b',
          fontSize:     '11px',
          fontWeight:   600,
          textTransform:'uppercase',
          letterSpacing:'0.05em',
          marginBottom: '5px',
        }}>
          {type === 'income' ? 'Source' : 'Title'}
        </label>
        <input
          type="text"
          placeholder={type === 'income' ? 'Search source...' : 'Search title...'}
          value={filters.source || ''}
          onChange={e =>
            onChange({ ...filters, source: e.target.value || undefined })}
          style={{ ...inputStyle, width: '100%' }}
          onFocus={e => e.target.style.borderColor = '#10b981'}
          onBlur={e  => e.target.style.borderColor = '#334155'}
        />
      </div>

      {/* Reset button */}
      <button
        onClick={onReset}
        style={{
          backgroundColor: 'transparent',
          border:          '1px solid #334155',
          borderRadius:    '8px',
          color:           '#94a3b8',
          fontSize:        '13px',
          padding:         '7px 14px',
          cursor:          'pointer',
          fontFamily:      'Inter, sans-serif',
          transition:      'all 0.15s',
          alignSelf:       'flex-end',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#475569';
          e.currentTarget.style.color = '#ffffff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#334155';
          e.currentTarget.style.color = '#94a3b8';
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default FilterBar;