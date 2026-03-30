import { useState, useRef, useEffect } from 'react';

const Navbar = ({ title }) => {
  const [search,      setSearch]      = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showBell,    setShowBell]    = useState(false);
  const searchRef                     = useRef(null);
  const bellRef                       = useRef(null);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const notifications = [
    { id: 1, icon: '💡', title: 'Monthly summary ready',         time: 'Just now',   unread: true  },
    { id: 2, icon: '🎯', title: 'Goal reminder: Emergency Fund', time: '2h ago',     unread: true  },
    { id: 3, icon: '✅', title: 'Income recorded successfully',  time: 'Yesterday',  unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: '⊞' },
    { label: 'Income',    path: '/income',    icon: '↑' },
    { label: 'Expenses',  path: '/expenses',  icon: '↓' },
    { label: 'Goals',     path: '/goals',     icon: '◎' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowResults(false);
      if (bellRef.current && !bellRef.current.contains(e.target))
        setShowBell(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      window.location.href = `/expenses?search=${encodeURIComponent(search.trim())}`;
      setSearch('');
      setShowResults(false);
    }
    if (e.key === 'Escape') {
      setSearch('');
      setShowResults(false);
    }
  };

  const handleNavLink = (path) => {
    window.location.href = path;
    setSearch('');
    setShowResults(false);
  };

  return (
    <>
      <style>{`
        .nb-search-input {
          background:    #1e293b;
          border:        1px solid #334155;
          border-radius: 10px;
          padding:       8px 14px 8px 36px;
          color:         #ffffff;
          font-size:     13px;
          width:         220px;
          outline:       none;
          font-family:   Inter, sans-serif;
          transition:    border-color 0.2s, width 0.2s;
        }
        .nb-search-input:focus {
          border-color: #10b981;
          width:        260px;
        }
        .nb-search-input::placeholder { color: #475569; }

        .nb-dropdown {
          position:     absolute;
          top:          calc(100% + 8px);
          right:        0;
          background:   #0f172a;
          border:       1px solid #1e293b;
          border-radius:14px;
          box-shadow:   0 20px 40px rgba(0,0,0,0.5);
          z-index:      100;
          overflow:     hidden;
          animation:    dropIn 0.15s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .nb-icon-btn {
          width:         36px;
          height:        36px;
          background:    #1e293b;
          border:        1px solid #334155;
          border-radius: 10px;
          display:       flex;
          align-items:   center;
          justify-content: center;
          cursor:        pointer;
          font-size:     16px;
          position:      relative;
          transition:    border-color 0.2s, background 0.2s;
          user-select:   none;
        }
        .nb-icon-btn:hover { background: #263347; border-color: #475569; }

        .nb-menu-item {
          display:       flex;
          align-items:   center;
          gap:           10px;
          padding:       10px 16px;
          cursor:        pointer;
          font-size:     14px;
          color:         #94a3b8;
          transition:    background 0.15s, color 0.15s;
          white-space:   nowrap;
          border:        none;
          background:    none;
          width:         100%;
          text-align:    left;
          font-family:   Inter, sans-serif;
        }
        .nb-menu-item:hover { background: rgba(255,255,255,0.04); color: #ffffff; }

        .nb-notif-item {
          display:        flex;
          align-items:    flex-start;
          gap:            12px;
          padding:        12px 16px;
          cursor:         pointer;
          border-bottom:  1px solid #1e293b;
          transition:     background 0.15s;
        }
        .nb-notif-item:last-child { border-bottom: none; }
        .nb-notif-item:hover { background: rgba(255,255,255,0.03); }
      `}</style>

      <header style={{
        position:        'sticky',
        top:             0,
        zIndex:          30,
        backgroundColor: 'rgba(3,7,18,0.9)',
        backdropFilter:  'blur(12px)',
        borderBottom:    '1px solid #1e293b',
        padding:         '0 32px',
        height:          '64px',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'space-between',
        fontFamily:      'Inter, sans-serif',
      }}>

        {/* ── Left: Title + Date ── */}
        <div>
          <h2 style={{
            color:      '#ffffff',
            fontSize:   '18px',
            fontWeight: 600,
            margin:     0,
          }}>
            {title}
          </h2>
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
            {today}
          </p>
        </div>

        {/* ── Right: Search + Bell ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          {/* Search */}
          <div ref={searchRef} style={{ position: 'relative' }}>
            <span style={{
              position:      'absolute',
              left:          '11px',
              top:           '50%',
              transform:     'translateY(-50%)',
              color:         '#475569',
              fontSize:      '14px',
              pointerEvents: 'none',
            }}>
              🔍
            </span>
            <input
              className="nb-search-input"
              type="text"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search... (Enter)"
            />

            {/* Quick nav dropdown */}
            {showResults && (
              <div className="nb-dropdown" style={{ width: '260px' }}>

                {/* Section label */}
                <div style={{
                  padding:      '10px 16px 6px',
                  borderBottom: '1px solid #1e293b',
                }}>
                  <p style={{
                    color:         '#64748b',
                    fontSize:      '11px',
                    fontWeight:    600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin:        0,
                  }}>
                    Quick Navigation
                  </p>
                </div>

                {/* Matching nav links */}
                {navLinks
                  .filter(l =>
                    l.label.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(link => (
                    <button
                      key={link.path}
                      className="nb-menu-item"
                      onClick={() => handleNavLink(link.path)}
                    >
                      <span style={{ fontSize: '16px' }}>{link.icon}</span>
                      Go to {link.label}
                    </button>
                  ))
                }

                {/* Search in expenses */}
                <button
                  className="nb-menu-item"
                  onClick={() =>
                    handleNavLink(
                      `/expenses?search=${encodeURIComponent(search)}`
                    )
                  }
                >
                  <span>↓</span>
                  Search "{search}" in Expenses
                </button>

                {/* Search in income */}
                <button
                  className="nb-menu-item"
                  onClick={() =>
                    handleNavLink(
                      `/income?search=${encodeURIComponent(search)}`
                    )
                  }
                >
                  <span>↑</span>
                  Search "{search}" in Income
                </button>
              </div>
            )}
          </div>

          {/* Bell */}
          <div ref={bellRef} style={{ position: 'relative' }}>
            <div
              className="nb-icon-btn"
              onClick={() => setShowBell(p => !p)}
            >
              🔔
              {unreadCount > 0 && (
                <span style={{
                  position:        'absolute',
                  top:             '5px',
                  right:           '5px',
                  width:           '8px',
                  height:          '8px',
                  backgroundColor: '#10b981',
                  borderRadius:    '50%',
                  border:          '1.5px solid #030712',
                }} />
              )}
            </div>

            {/* Notification dropdown */}
            {showBell && (
              <div className="nb-dropdown" style={{ width: '300px' }}>

                {/* Header */}
                <div style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  padding:        '14px 16px',
                  borderBottom:   '1px solid #1e293b',
                }}>
                  <span style={{
                    color:      '#ffffff',
                    fontSize:   '14px',
                    fontWeight: 600,
                  }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span style={{
                      backgroundColor: 'rgba(16,185,129,0.1)',
                      color:           '#10b981',
                      border:          '1px solid rgba(16,185,129,0.2)',
                      borderRadius:    '20px',
                      padding:         '2px 8px',
                      fontSize:        '11px',
                      fontWeight:      600,
                    }}>
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {/* Notification items */}
                {notifications.map(n => (
                  <div key={n.id} className="nb-notif-item">
                    <div style={{
                      width:           '34px',
                      height:          '34px',
                      backgroundColor: n.unread
                        ? 'rgba(16,185,129,0.1)' : '#1e293b',
                      borderRadius:    '10px',
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                      fontSize:        '16px',
                      flexShrink:      0,
                    }}>
                      {n.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        color:        n.unread ? '#ffffff' : '#94a3b8',
                        fontSize:     '13px',
                        fontWeight:   n.unread ? 500 : 400,
                        margin:       '0 0 2px 0',
                        overflow:     'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace:   'nowrap',
                      }}>
                        {n.title}
                      </p>
                      <p style={{
                        color:  '#475569',
                        fontSize: '11px',
                        margin: 0,
                      }}>
                        {n.time}
                      </p>
                    </div>
                    {n.unread && (
                      <div style={{
                        width:           '7px',
                        height:          '7px',
                        backgroundColor: '#10b981',
                        borderRadius:    '50%',
                        flexShrink:      0,
                        marginTop:       '5px',
                      }} />
                    )}
                  </div>
                ))}

                {/* Footer */}
                <div style={{
                  padding:   '10px 16px',
                  borderTop: '1px solid #1e293b',
                }}>
                  <button
                    className="nb-menu-item"
                    style={{
                      justifyContent: 'center',
                      color:          '#10b981',
                      fontSize:       '13px',
                      padding:        '6px 0',
                    }}
                    onClick={() => setShowBell(false)}
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;