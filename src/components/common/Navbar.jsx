import { useState, useRef, useEffect } from 'react';

const INITIAL_NOTIFICATIONS = [
  { id: 1, icon: '💡', title: 'Monthly summary ready',          desc: 'Your March 2026 summary is available', time: 'Just now',   unread: true  },
  { id: 2, icon: '🎯', title: 'Goal reminder: Emergency Fund',  desc: 'You are 75% toward your goal target',  time: '2h ago',     unread: true  },
  { id: 3, icon: '✅', title: 'Income recorded successfully',   desc: 'Salary of $3,200 was added',           time: 'Yesterday',  unread: false },
  { id: 4, icon: '⚠️', title: 'High spending alert',            desc: 'Expenses exceeded 70% of income',      time: '2 days ago', unread: false },
];

// ── Mini Calendar Component ──────────────────────────────────────────────────
const MiniCalendar = () => {
  const [current, setCurrent] = useState(new Date());

  const year  = current.getFullYear();
  const month = current.getMonth();

  const monthName = current.toLocaleString('default', { month: 'long' });

  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const daysInPrev   = new Date(year, month, 0).getDate();

  const today     = new Date();
  const isToday   = (d) =>
    d === today.getDate() &&
    month === today.getMonth() &&
    year  === today.getFullYear();

  const prevMonth = () =>
    setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrent(new Date(year, month + 1, 1));

  // Build calendar grid
  const cells = [];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, type: 'prev' });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: 'current' });
  }
  // Next month leading days
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, type: 'next' });
  }

  return (
    <div style={{
      backgroundColor: '#0f172a',
      border:          '1px solid #1e293b',
      borderRadius:    '16px',
      padding:         '18px',
      width:           '280px',
      fontFamily:      'Inter, sans-serif',
      boxShadow:       '0 20px 40px rgba(0,0,0,0.5)',
    }}>

      {/* Header */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        marginBottom:   '14px',
      }}>
        <button
          onClick={prevMonth}
          style={{
            width:           '28px',
            height:          '28px',
            backgroundColor: '#1e293b',
            border:          '1px solid #334155',
            borderRadius:    '8px',
            color:           '#94a3b8',
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '14px',
            transition:      'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#334155';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          ‹
        </button>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            color:      '#ffffff',
            fontSize:   '14px',
            fontWeight: 600,
            margin:     0,
          }}>
            {monthName}
          </p>
          <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>
            {year}
          </p>
        </div>

        <button
          onClick={nextMonth}
          style={{
            width:           '28px',
            height:          '28px',
            backgroundColor: '#1e293b',
            border:          '1px solid #334155',
            borderRadius:    '8px',
            color:           '#94a3b8',
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            fontSize:        '14px',
            transition:      'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#334155';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        marginBottom:        '6px',
      }}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} style={{
            textAlign:  'center',
            color:      '#475569',
            fontSize:   '10px',
            fontWeight: 600,
            padding:    '4px 0',
            textTransform: 'uppercase',
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap:                 '2px',
      }}>
        {cells.map((cell, i) => {
          const today_ = cell.type === 'current' && isToday(cell.day);
          return (
            <div
              key={i}
              style={{
                height:          '32px',
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                borderRadius:    '8px',
                fontSize:        '12px',
                fontWeight:      today_ ? 700 : 400,
                cursor:          cell.type === 'current' ? 'pointer' : 'default',
                color: today_
                  ? '#ffffff'
                  : cell.type === 'current'
                  ? '#e2e8f0'
                  : '#334155',
                backgroundColor: today_
                  ? '#10b981'
                  : 'transparent',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                if (cell.type === 'current' && !today_) {
                  e.currentTarget.style.backgroundColor = '#1e293b';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={e => {
                if (cell.type === 'current' && !today_) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>

      {/* Today button */}
      <div style={{
        marginTop:    '12px',
        paddingTop:   '12px',
        borderTop:    '1px solid #1e293b',
        textAlign:    'center',
      }}>
        <button
          onClick={() => setCurrent(new Date())}
          style={{
            backgroundColor: 'rgba(16,185,129,0.1)',
            border:          '1px solid rgba(16,185,129,0.2)',
            borderRadius:    '8px',
            color:           '#10b981',
            fontSize:        '12px',
            fontWeight:      500,
            padding:         '6px 16px',
            cursor:          'pointer',
            transition:      'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'rgba(16,185,129,0.2)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'rgba(16,185,129,0.1)';
          }}
        >
          Today
        </button>
      </div>
    </div>
  );
};

// ── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar = ({ title }) => {
  const [search,        setSearch]        = useState('');
  const [showResults,   setShowResults]   = useState(false);
  const [showBell,      setShowBell]      = useState(false);
  const [showCalendar,  setShowCalendar]  = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const searchRef   = useRef(null);
  const bellRef     = useRef(null);
  const calendarRef = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const navLinks = [
    { label: 'Dashboard', path: '/dashboard', icon: '⊞' },
    { label: 'Income',    path: '/income',    icon: '↑' },
    { label: 'Expenses',  path: '/expenses',  icon: '↓' },
    { label: 'Goals',     path: '/goals',     icon: '◎' },
    { label: 'AI Insights', path: '/ai',      icon: '✦' },
  ];

  // Close all dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current   && !searchRef.current.contains(e.target))
        setShowResults(false);
      if (bellRef.current     && !bellRef.current.contains(e.target))
        setShowBell(false);
      if (calendarRef.current && !calendarRef.current.contains(e.target))
        setShowCalendar(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Delete single notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

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
          width:         200px;
          outline:       none;
          font-family:   Inter, sans-serif;
          transition:    border-color 0.2s, width 0.2s;
        }
        .nb-search-input:focus {
          border-color: #10b981;
          width:        240px;
        }
        .nb-search-input::placeholder { color: #475569; }

        .nb-dropdown {
          position:      absolute;
          top:           calc(100% + 8px);
          right:         0;
          background:    #0f172a;
          border:        1px solid #1e293b;
          border-radius: 14px;
          box-shadow:    0 20px 40px rgba(0,0,0,0.5);
          z-index:       100;
          overflow:      hidden;
          animation:     dropIn 0.15s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .nb-icon-btn {
          width:           36px;
          height:          36px;
          background:      #1e293b;
          border:          1px solid #334155;
          border-radius:   10px;
          display:         flex;
          align-items:     center;
          justify-content: center;
          cursor:          pointer;
          font-size:       16px;
          position:        relative;
          transition:      all 0.15s;
          user-select:     none;
          flex-shrink:     0;
        }
        .nb-icon-btn:hover { background: #263347; border-color: #475569; }

        .nb-menu-item {
          display:         flex;
          align-items:     center;
          gap:             10px;
          padding:         10px 16px;
          cursor:          pointer;
          font-size:       14px;
          color:           #94a3b8;
          transition:      background 0.15s, color 0.15s;
          white-space:     nowrap;
          border:          none;
          background:      none;
          width:           100%;
          text-align:      left;
          font-family:     Inter, sans-serif;
        }
        .nb-menu-item:hover { background: rgba(255,255,255,0.04); color: #ffffff; }

        .notif-item {
          display:       flex;
          align-items:   flex-start;
          gap:           10px;
          padding:       12px 14px;
          border-bottom: 1px solid #1e293b;
          transition:    background 0.15s;
          position:      relative;
        }
        .notif-item:last-child  { border-bottom: none; }
        .notif-item:hover       { background: rgba(255,255,255,0.02); }
        .notif-item:hover .notif-actions { opacity: 1; }

        .notif-actions {
          display:    flex;
          gap:        4px;
          opacity:    0;
          transition: opacity 0.15s;
          flex-shrink: 0;
        }

        .notif-action-btn {
          width:           22px;
          height:          22px;
          border-radius:   6px;
          border:          none;
          cursor:          pointer;
          display:         flex;
          align-items:     center;
          justify-content: center;
          font-size:       11px;
          transition:      all 0.15s;
        }
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
          <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 600, margin: 0 }}>
            {title}
          </h2>
          <p style={{ color: '#64748b', fontSize: '12px', margin: 0 }}>
            {today}
          </p>
        </div>

        {/* ── Right: Search + Calendar + Bell ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

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

            {/* Search results dropdown */}
            {showResults && (
              <div className="nb-dropdown" style={{ width: '260px' }}>
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

                {navLinks
                  .filter(l => l.label.toLowerCase()
                    .includes(search.toLowerCase()))
                  .map(link => (
                    <button
                      key={link.path}
                      className="nb-menu-item"
                      onClick={() => handleNavLink(link.path)}
                    >
                      <span style={{ fontSize: '15px' }}>{link.icon}</span>
                      Go to {link.label}
                    </button>
                  ))
                }

                <button
                  className="nb-menu-item"
                  style={{ borderTop: '1px solid #1e293b' }}
                  onClick={() =>
                    handleNavLink(
                      `/expenses?search=${encodeURIComponent(search)}`
                    )
                  }
                >
                  <span>↓</span> Search "{search}" in Expenses
                </button>
                <button
                  className="nb-menu-item"
                  onClick={() =>
                    handleNavLink(
                      `/income?search=${encodeURIComponent(search)}`
                    )
                  }
                >
                  <span>↑</span> Search "{search}" in Income
                </button>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div ref={calendarRef} style={{ position: 'relative' }}>
            <div
              className="nb-icon-btn"
              onClick={() => {
                setShowCalendar(p => !p);
                setShowBell(false);
              }}
              title="Calendar"
            >
              📅
            </div>

            {showCalendar && (
              <div style={{
                position:  'absolute',
                top:       'calc(100% + 8px)',
                right:     0,
                zIndex:    100,
                animation: 'dropIn 0.15s ease',
              }}>
                <MiniCalendar />
              </div>
            )}
          </div>

          {/* Bell */}
          <div ref={bellRef} style={{ position: 'relative' }}>
            <div
              className="nb-icon-btn"
              onClick={() => {
                setShowBell(p => !p);
                setShowCalendar(false);
              }}
              title="Notifications"
            >
              🔔
              {unreadCount > 0 && (
                <span style={{
                  position:        'absolute',
                  top:             '4px',
                  right:           '4px',
                  minWidth:        '16px',
                  height:          '16px',
                  backgroundColor: '#ef4444',
                  borderRadius:    '8px',
                  border:          '1.5px solid #030712',
                  display:         'flex',
                  alignItems:      'center',
                  justifyContent:  'center',
                  fontSize:        '9px',
                  fontWeight:      700,
                  color:           '#ffffff',
                  padding:         '0 3px',
                }}>
                  {unreadCount}
                </span>
              )}
            </div>

            {/* Notification dropdown */}
            {showBell && (
              <div className="nb-dropdown" style={{ width: '320px' }}>

                {/* Header */}
                <div style={{
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'space-between',
                  padding:        '14px 16px 10px',
                  borderBottom:   '1px solid #1e293b',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      color:      '#ffffff',
                      fontSize:   '14px',
                      fontWeight: 600,
                    }}>
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span style={{
                        backgroundColor: 'rgba(239,68,68,0.15)',
                        color:           '#f87171',
                        border:          '1px solid rgba(239,68,68,0.2)',
                        borderRadius:    '20px',
                        padding:         '1px 7px',
                        fontSize:        '11px',
                        fontWeight:      600,
                      }}>
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {/* Mark all read button */}
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      style={{
                        backgroundColor: 'transparent',
                        border:          'none',
                        color:           '#10b981',
                        fontSize:        '12px',
                        fontWeight:      500,
                        cursor:          'pointer',
                        padding:         '4px 8px',
                        borderRadius:    '6px',
                        fontFamily:      'Inter, sans-serif',
                        transition:      'background 0.15s',
                      }}
                      onMouseEnter={e =>
                        e.currentTarget.style.backgroundColor = 'rgba(16,185,129,0.1)'
                      }
                      onMouseLeave={e =>
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notification list */}
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{
                      padding:   '32px 16px',
                      textAlign: 'center',
                    }}>
                      <p style={{ fontSize: '24px', margin: '0 0 8px' }}>🎉</p>
                      <p style={{
                        color:    '#64748b',
                        fontSize: '13px',
                        margin:   0,
                      }}>
                        You're all caught up!
                      </p>
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="notif-item">

                        {/* Unread dot */}
                        {n.unread && (
                          <div style={{
                            width:           '7px',
                            height:          '7px',
                            backgroundColor: '#10b981',
                            borderRadius:    '50%',
                            flexShrink:      0,
                            marginTop:       '6px',
                          }} />
                        )}
                        {!n.unread && (
                          <div style={{ width: '7px', flexShrink: 0 }} />
                        )}

                        {/* Icon */}
                        <div style={{
                          width:           '36px',
                          height:          '36px',
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

                        {/* Content */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            color:        n.unread ? '#ffffff' : '#94a3b8',
                            fontSize:     '13px',
                            fontWeight:   n.unread ? 600 : 400,
                            margin:       '0 0 2px 0',
                            overflow:     'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace:   'nowrap',
                          }}>
                            {n.title}
                          </p>
                          <p style={{
                            color:        '#64748b',
                            fontSize:     '11px',
                            margin:       '0 0 2px 0',
                            overflow:     'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace:   'nowrap',
                          }}>
                            {n.desc}
                          </p>
                          <p style={{ color: '#475569', fontSize: '10px', margin: 0 }}>
                            {n.time}
                          </p>
                        </div>

                        {/* Hover actions */}
                        <div className="notif-actions">
                          {n.unread && (
                            <button
                              className="notif-action-btn"
                              onClick={() => markAsRead(n.id)}
                              title="Mark as read"
                              style={{
                                backgroundColor: 'rgba(16,185,129,0.1)',
                                color:           '#10b981',
                              }}
                              onMouseEnter={e =>
                                e.currentTarget.style.backgroundColor = 'rgba(16,185,129,0.2)'
                              }
                              onMouseLeave={e =>
                                e.currentTarget.style.backgroundColor = 'rgba(16,185,129,0.1)'
                              }
                            >
                              ✓
                            </button>
                          )}
                          <button
                            className="notif-action-btn"
                            onClick={() => deleteNotification(n.id)}
                            title="Dismiss"
                            style={{
                              backgroundColor: 'rgba(239,68,68,0.1)',
                              color:           '#f87171',
                            }}
                            onMouseEnter={e =>
                              e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.2)'
                            }
                            onMouseLeave={e =>
                              e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.1)'
                            }
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div style={{
                    padding:        '10px 16px',
                    borderTop:      '1px solid #1e293b',
                    display:        'flex',
                    justifyContent: 'center',
                  }}>
                    <button
                      onClick={() => setNotifications([])}
                      style={{
                        backgroundColor: 'transparent',
                        border:          'none',
                        color:           '#475569',
                        fontSize:        '12px',
                        cursor:          'pointer',
                        fontFamily:      'Inter, sans-serif',
                        transition:      'color 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                    >
                      Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;