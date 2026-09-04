import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

export const AdminForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogoutAndLogin = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-24 mb-6 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
        <ShieldAlert className="w-10 h-10 text-red-500" />
      </div>

      <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 mb-2">
        ERROR 403 — FORBIDDEN ACCESS
      </span>
      <h1 className="text-3xl font-heading font-bold text-white mb-2">
        Administrator Authorization Required
      </h1>
      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        Your account (<strong className="text-slate-200">{user?.email}</strong>) is authenticated as a participant, but lacks the necessary <code className="text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded">ADMIN</code> role permissions to access the HackNEX Admin Portal.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          onClick={() => navigate('/')}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs border border-slate-700 flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Website
        </Button>
        <Button
          onClick={handleLogoutAndLogin}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Re-login as Administrator
        </Button>
      </div>
    </div>
  );
};
