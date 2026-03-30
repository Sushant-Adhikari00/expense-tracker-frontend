import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/income',    icon: '↑',  label: 'Income'    },
  { to: '/expenses',  icon: '↓',  label: 'Expenses'  },
  { to: '/goals',     icon: '◎',  label: 'Goals'     },
];

const s = {
  sidebar: {
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
  },
  logo: {
    display:        'flex',
    alignItems:     'center',
    gap:            '10px',
    padding:        '20px 20px',
    borderBottom:   '1px solid #1e293b',
  },
  logoIcon: {
    width:           '36px',
    height:          '36px',
    backgroundColor: '#10b981',
    borderRadius:    '10px',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    fontSize:        '18px',
    flexShrink:      0,
  },
  logoText: {
    color:         '#ffffff',
    fontWeight:    700,
    fontSize:      '17px',
    letterSpacing: '-0.3px',
  },
  nav: {
    flex:           1,
    padding:        '16px 12px',
    display:        'flex',
    flexDirection:  'column',
    gap:            '4px',
  },
  navItem: (isActive) => ({
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
    border:          isActive ? '1px solid rgba(16,185,129,0.2)' : '1px solid transparent',
  }),
  navIcon: {
    fontSize:   '16px',
    width:      '20px',
    textAlign:  'center',
    flexShrink: 0,
  },
  footer: {
    padding:     '12px',
    borderTop:   '1px solid #1e293b',
  },
  userInfo: {
    padding:      '10px 14px',
    marginBottom: '4px',
  },
  userName: {
    color:        '#ffffff',
    fontSize:     '13px',
    fontWeight:   500,
    marginBottom: '2px',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    whiteSpace:   'nowrap',
  },
  userEmail: {
    color:        '#64748b',
    fontSize:     '11px',
    overflow:     'hidden',
    textOverflow: 'ellipsis',
    whiteSpace:   'nowrap',
  },
  logoutBtn: {
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
    textAlign:       'left',
  },
};

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.fullName
    ?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/login');
  };

  return (
    <aside style={s.sidebar}>

      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoIcon}>💰</div>
        <span style={s.logoText}>WealthTrack</span>
      </div>

      {/* Nav */}
      <nav style={s.nav}>
        {navItems.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} style={({ isActive }) => s.navItem(isActive)}>
            <span style={s.navIcon}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div style={s.footer}>
        <div style={s.userInfo}>
          <div style={{
            display:         'flex',
            alignItems:      'center',
            gap:             '10px',
            marginBottom:    '2px',
          }}>
            <div style={{
              width:           '30px',
              height:          '30px',
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
              <div style={s.userName}>{user?.fullName}</div>
              <div style={s.userEmail}>{user?.email}</div>
            </div>
          </div>
        </div>
        <button
          style={s.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)';
            e.currentTarget.style.color = '#f87171';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
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
  );
};

export default Sidebar;