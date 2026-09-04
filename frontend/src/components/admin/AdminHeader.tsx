import React from 'react';
import { Menu, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface AdminHeaderProps {
  onMenuClick?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Ticker Banner for Registration Status / Deadline */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-mono text-slate-600 border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-cyan-600" />
          <span>Registration Open: <strong>Sep 8 → Oct 1, 2026</strong></span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="hidden md:inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            Role: ADMIN
          </span>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold font-mono">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="font-semibold text-slate-800 text-xs">{user?.name || 'Administrator'}</span>
              <span className="text-[10px] text-slate-500 truncate max-w-[140px]">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
