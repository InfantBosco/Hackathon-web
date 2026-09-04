import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  CreditCard,
  BarChart3,
  Download,
  ShieldCheck,
  User,
  LogOut,
  X,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Registrations', path: '/admin/registrations', icon: ClipboardList },
  { label: 'Participants', path: '/admin/participants', icon: Users },
  { label: 'Payments', path: '/admin/payments', icon: CreditCard },
  { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { label: 'Exports', path: '/admin/exports', icon: Download },
  { label: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck },
  { label: 'Admin Profile', path: '/admin/profile', icon: User },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuthStore();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 w-64 bg-slate-900 text-white z-50 flex flex-col border-r border-slate-800 transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm text-white tracking-wider">HackNEX Admin</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-tight">KITS Coimbatore</span>
            </div>
          </div>

          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-mono font-medium transition-all',
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                )
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer & Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>
    </>
  );
};
