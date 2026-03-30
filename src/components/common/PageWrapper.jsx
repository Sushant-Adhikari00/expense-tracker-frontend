import Sidebar from './Sidebar';
import Navbar  from './Navbar';

const PageWrapper = ({ children, title, subtitle, action }) => (
  <div style={{
    display:         'flex',
    minHeight:       '100vh',
    backgroundColor: '#030712',
    fontFamily:      'Inter, -apple-system, sans-serif',
  }}>
    <Sidebar />

    <div style={{
      flex:          1,
      marginLeft:    '240px',
      display:       'flex',
      flexDirection: 'column',
      minHeight:     '100vh',
    }}>
      <Navbar title={title} />

      <main style={{
        flex:    1,
        padding: '32px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Sub-header row */}
          {(subtitle || action) && (
            <div style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'space-between',
              marginBottom:   '24px',
            }}>
              {subtitle && (
                <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                  {subtitle}
                </p>
              )}
              {action && <div>{action}</div>}
            </div>
          )}

          {children}
        </div>
      </main>
    </div>
  </div>
);

export default PageWrapper;