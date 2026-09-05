import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, logout, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both administrative email and password.');
      return;
    }

    try {
      await login({ email, password });
      const currentUser = useAuthStore.getState().user;

      if (currentUser?.role !== 'ADMIN') {
        await logout();
        setError('403 Forbidden: Your account does not possess ADMIN authorization.');
        return;
      }

      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-wider">
            HackNEX Admin Portal
          </h1>
          <p className="text-xs font-mono text-slate-400 flex items-center justify-center gap-1">
            <span>Authorized</span>
            <span className="inline-flex items-center gap-1 font-semibold text-white">
              <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3.5 w-auto shrink-0 inline-block align-middle" />
              NEXUS
            </span>
            <span>Club Personnel Authentication</span>
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="p-3.5 bg-red-950/60 border border-red-500/50 rounded-lg text-red-400 text-xs font-mono flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Email *"
              type="email"
              placeholder="admin@hacknex.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Password *"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Authenticate & Enter Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-slate-700/60 text-[11px] font-mono text-slate-400">
            <span>Participant account? </span>
            <a href="/login" className="text-cyan-400 hover:underline">
              Go to Participant Login →
            </a>
          </div>
        </div>

        <p className="text-center text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1">
          <span className="inline-flex items-center gap-1 font-semibold text-slate-300">
            <img src="/logomain_svg.png" alt="NEXUS Logo" className="h-3 w-auto shrink-0 inline-block align-middle" />
            NEXUS
          </span>
          <span>Club, Karunya Institute of Technology and Sciences</span>
        </p>
      </div>
    </div>
  );
};
