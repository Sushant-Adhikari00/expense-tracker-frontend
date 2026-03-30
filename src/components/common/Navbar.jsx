import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ title }) => {
  const { user } = useAuth();

  const initials = user?.fullName
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <header style={{
      position:        'sticky',
      top:             0,
      zIndex:          30,
      backgroundColor: 'rgba(3,7,18,0.85)',
      backdropFilter:  'blur(12px)',
      borderBottom:    '1px solid #1e293b',
      padding:         '0 32px',
      height:          '64px',
      display:         'flex',
      alignItems:      'center',
      justifyContent:  'space-between',
    }}>

      {/* Left */}
      <div>
        <h2 style={{
          color:      '#ffffff',
          fontSize:   '18px',
          fontWeight: 600,
          margin:     0,
        }}>
          {title}
        </h2>
        <p style={{
          color:    '#64748b',
          fontSize: '12px',
          margin:   0,
        }}>
          {today}
        </p>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position:  'absolute',
            left:      '12px',
            top:       '50%',
            transform: 'translateY(-50%)',
            color:     '#64748b',
            fontSize:  '13px',
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            style={{
              backgroundColor: '#1e293b',
              border:          '1px solid #334155',
              borderRadius:    '10px',
              padding:         '8px 14px 8px 34px',
              color:           '#ffffff',
              fontSize:        '13px',
              width:           '220px',
              outline:         'none',
            }}
          />
        </div>

        {/* Bell */}
        <div style={{
          width:           '36px',
          height:          '36px',
          backgroundColor: '#1e293b',
          border:          '1px solid #334155',
          borderRadius:    '10px',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          cursor:          'pointer',
          fontSize:        '16px',
          position:        'relative',
        }}>
          🔔
          <span style={{
            position:        'absolute',
            top:             '6px',
            right:           '6px',
            width:           '7px',
            height:          '7px',
            backgroundColor: '#10b981',
            borderRadius:    '50%',
          }} />
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width:           '36px',
            height:          '36px',
            backgroundColor: 'rgba(16,185,129,0.15)',
            border:          '1px solid rgba(16,185,129,0.3)',
            borderRadius:    '10px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '12px',
            fontWeight:      700,
            color:           '#10b981',
          }}>
            {initials}
          </div>
          <div>
            <div style={{ color: '#ffffff', fontSize: '13px', fontWeight: 500 }}>
              {user?.fullName}
            </div>
            <div style={{ color: '#64748b', fontSize: '11px' }}>
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;