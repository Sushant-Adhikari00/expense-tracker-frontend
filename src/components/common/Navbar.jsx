import { Bell, Search, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ title }) => {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });

  // Get user initials for avatar
  const initials = user?.fullName
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-md
                       border-b border-gray-800 px-8 py-4">
      <div className="flex items-center justify-between">

        {/* Left — title + date */}
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-white font-semibold text-lg">{title}</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Calendar size={11} className="text-gray-500" />
              <span className="text-gray-500 text-xs">{today}</span>
            </div>
          </div>
        </div>

        {/* Right — search + bell + avatar */}
        <div className="flex items-center gap-3">

          {/* Search bar */}
          <div className="relative hidden md:block">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-gray-800 border border-gray-700 text-white text-sm
                         placeholder-gray-500 rounded-xl pl-9 pr-4 py-2
                         focus:outline-none focus:border-emerald-500 transition
                         w-56"
            />
          </div>

          {/* Notifications */}
          <button className="relative w-9 h-9 bg-gray-800 border border-gray-700
                             rounded-xl flex items-center justify-center
                             text-gray-400 hover:text-white hover:border-gray-600
                             transition">
            <Bell size={16} />
            {/* Unread dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2
                             bg-emerald-500 rounded-full" />
          </button>

          {/* User avatar */}
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-9 h-9 bg-emerald-500/20 border border-emerald-500/30
                            rounded-xl flex items-center justify-center">
              <span className="text-emerald-400 text-xs font-bold">{initials}</span>
            </div>
            <div className="hidden md:block">
              <p className="text-white text-sm font-medium leading-tight">
                {user?.fullName}
              </p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;