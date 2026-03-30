import { useState }                from 'react';
import { NavLink, useNavigate }    from 'react-router-dom';
import { useAuth }                 from '../../hooks/useAuth';
import toast                       from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/income',    icon: '↑',  label: 'Income'    },
  { to: '/expenses',  icon: '↓',  label: 'Expenses'  },
  { to: '/goals',     icon: '◎',  label: 'Goals'     },
];

const Sidebar = () => {
  const { user, logout }          = useAuth();
  const navigate                  = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const initials = user?.fullName
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const handleLogoutConfirmed = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
    setShowConfirm(false);
  };

  return (
    <>
      {/* ── Confirm Modal ── */}
      {showConfirm && (
        <div style={{
          position:        'fixed',
          inset:           0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          backdropFilter:  'blur(6px)',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          zIndex:          999,
          fontFamily:      'Inter, sans-serif',
        }}>
          <div style={{
            backgroundColor: '#0f172a',
            border:          '1px solid #1e293b',
            borderRadius:    '20px',
            padding:         '32px',
            width:           '100%',
            maxWidth:        '380px',
            boxShadow:       '0 32px 64px rgba(0,0,0,0.6)',
            textAlign:       'center',
          }}>

            {/* Icon */}
            <div style={{
              width:           '56px',
              height:          '56px',
              backgroundColor: 'rgba(239,68,68,0.1)',
              border:          '1px solid rgba(239,68,68,0.2)',
              borderRadius:    '16px',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              fontSize:        '24px',
              margin:          '0 auto 20px',
            }}>
              ⎋
            </div>

            {/* Text */}
            <h3 style={{
              color:        '#ffffff',
              fontSize:     '18px',
              fontWeight:   700,
              margin:       '0 0 8px 0',
            }}>
              Sign out?
            </h3>
            <p style={{
              color:        '#64748b',
              fontSize:     '14px',
              margin:       '0 0 28px 0',
              lineHeight:   1.6,
            }}>
              You will be redirected to the login page.
              Any unsaved changes will be lost.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex:            1,
                  backgroundColor: '#1e293b',
                  border:          '1px solid #334155',
                  borderRadius:    '12px',
                  color:           '#94a3b8',
                  fontSize:        '14px',
                  fontWeight:      600,
                  padding:         '12px',
                  cursor:          'pointer',
                  fontFamily:      'Inter, sans-serif',
                  transition:      'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#263347';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirmed}
                style={{
                  flex:            1,
                  backgroundColor: '#ef4444',
                  border:          'none',
                  borderRadius:    '12px',
                  color:           '#ffffff',
                  fontSize:        '14px',
                  fontWeight:      600,
                  padding:         '12px',
                  cursor:          'pointer',
                  fontFamily:      'Inter, sans-serif',
                  transition:      'background-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ef4444'}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        position:        'fixed',
        left:            0,
        top:             0,
        height:          '100vh',
        width:           '240px',
        backgroundColor: '#0f172a',
        borderRight:     '1px solid #1e293b',
        display:         'flex',
        flexDirection:   'column',
        zIndex:          40,
        fontFamily:      'Inter, sans-serif',
      }}>

        {/* Logo */}
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          '10px',
          padding:      '20px',
          borderBottom: '1px solid #1e293b',
        }}>
          <div style={{
            width:           '36px',
            height:          '36px',
            backgroundColor: '#10b981',
            borderRadius:    '10px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '18px',
            flexShrink:      0,
          }}>
            💰
          </div>
          <span style={{
            color:         '#ffffff',
            fontWeight:    700,
            fontSize:      '17px',
            letterSpacing: '-0.3px',
          }}>
            WealthTrack
          </span>
        </div>

        {/* Nav */}
        <nav style={{
          flex:          1,
          padding:       '16px 12px',
          display:       'flex',
          flexDirection: 'column',
          gap:           '4px',
        }}>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display:         'flex',
                alignItems:      'center',
                gap:             '10px',
                padding:         '10px 14px',
                borderRadius:    '10px',
                fontSize:        '14px',
                fontWeight:      500,
                cursor:          'pointer',
                textDecoration:  'none',
                transition:      'all 0.15s',
                backgroundColor: isActive ? 'rgba(16,185,129,0.12)' : 'transparent',
                color:           isActive ? '#10b981' : '#94a3b8',
                border:          isActive
                  ? '1px solid rgba(16,185,129,0.2)'
                  : '1px solid transparent',
              })}
            >
              <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>
                {icon}
              </span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '12px', borderTop: '1px solid #1e293b' }}>

          {/* User info */}
          <div style={{
            display:      'flex',
            alignItems:   'center',
            gap:          '10px',
            padding:      '10px 14px',
            marginBottom: '4px',
          }}>
            <div style={{
              width:           '32px',
              height:          '32px',
              backgroundColor: 'rgba(16,185,129,0.15)',
              border:          '1px solid rgba(16,185,129,0.3)',
              borderRadius:    '8px',
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              fontSize:        '11px',
              fontWeight:      700,
              color:           '#10b981',
              flexShrink:      0,
            }}>
              {initials}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                color:        '#ffffff',
                fontSize:     '13px',
                fontWeight:   500,
                overflow:     'hidden',
                textOverflow: 'ellipsis',
                whiteSpace:   'nowrap',
              }}>
                {user?.fullName}
              </div>
              <div style={{
                color:        '#64748b',
                fontSize:     '11px',
                overflow:     'hidden',
                textOverflow: 'ellipsis',
                whiteSpace:   'nowrap',
              }}>
                {user?.email}
              </div>
            </div>
          </div>

          {/* Sign Out button — opens confirm modal */}
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              display:         'flex',
              alignItems:      'center',
              gap:             '10px',
              width:           '100%',
              padding:         '10px 14px',
              borderRadius:    '10px',
              backgroundColor: 'transparent',
              border:          '1px solid transparent',
              color:           '#94a3b8',
              fontSize:        '14px',
              fontWeight:      500,
              cursor:          'pointer',
              transition:      'all 0.15s',
              fontFamily:      'Inter, sans-serif',
              textAlign:       'left',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)';
              e.currentTarget.style.color = '#f87171';
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#94a3b8';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            <span>⎋</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;