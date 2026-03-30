const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      gap:            '8px',
      padding:        '16px',
    }}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
        style={{
          width:           '34px',
          height:          '34px',
          backgroundColor: 'transparent',
          border:          '1px solid #334155',
          borderRadius:    '8px',
          color:           page === 0 ? '#475569' : '#94a3b8',
          cursor:          page === 0 ? 'not-allowed' : 'pointer',
          fontSize:        '16px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        ‹
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          style={{
            width:           '34px',
            height:          '34px',
            backgroundColor: i === page ? '#10b981' : 'transparent',
            border:          `1px solid ${i === page ? '#10b981' : '#334155'}`,
            borderRadius:    '8px',
            color:           i === page ? '#ffffff' : '#94a3b8',
            cursor:          'pointer',
            fontSize:        '13px',
            fontWeight:      i === page ? 600 : 400,
          }}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages - 1}
        style={{
          width:           '34px',
          height:          '34px',
          backgroundColor: 'transparent',
          border:          '1px solid #334155',
          borderRadius:    '8px',
          color:           page === totalPages - 1 ? '#475569' : '#94a3b8',
          cursor:          page === totalPages - 1 ? 'not-allowed' : 'pointer',
          fontSize:        '16px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;