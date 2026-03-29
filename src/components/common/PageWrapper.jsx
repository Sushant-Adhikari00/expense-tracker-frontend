import Sidebar from './Sidebar';
import Navbar  from './Navbar';

const PageWrapper = ({ children, title, subtitle, action }) => (
  <div className="flex min-h-screen bg-gray-950">
    <Sidebar />

    <div className="flex-1 ml-64 flex flex-col min-h-screen">

      {/* Top navbar */}
      <Navbar title={title} />

      {/* Page content */}
      <main className="flex-1 px-8 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Page header with action button */}
          {(subtitle || action) && (
            <div className="flex items-center justify-between mb-6">
              <div>
                {subtitle && (
                  <p className="text-gray-400 text-sm">{subtitle}</p>
                )}
              </div>
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