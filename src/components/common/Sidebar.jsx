import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ArrowDownCircle, ArrowUpCircle,
  Target, LogOut, Wallet
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/income',    icon: ArrowDownCircle, label: 'Income'    },
  { to: '/expenses',  icon: ArrowUpCircle,   label: 'Expenses'  },
  { to: '/goals',     icon: Target,          label: 'Goals'     },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900
                      flex flex-col border-r border-gray-800 z-40">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5
                      border-b border-gray-800">
        <div className="w-9 h-9 bg-emerald-500 rounded-xl
                        flex items-center justify-center">
          <Wallet size={18} className="text-white" />
        </div>
        <span className="text-white font-semibold text-lg tracking-tight">
          WealthTrack
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl
               text-sm font-medium transition-all duration-200
               ${isActive
                 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
               }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-gray-800">
        <div className="px-4 py-3 mb-2">
          <p className="text-white text-sm font-medium truncate">
            {user?.fullName}
          </p>
          <p className="text-gray-500 text-xs truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3
                     text-gray-400 hover:text-red-400 hover:bg-red-500/10
                     rounded-xl text-sm font-medium transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;