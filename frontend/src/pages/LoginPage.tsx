import React, { useState, useEffect } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { login, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const isEmailInvalid = touched.email && (!email.trim() || (!email.includes('@') && email.trim().length < 3));
  const isPasswordInvalid = touched.password && !password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!email.trim() || !password) {
      setError('Please enter your registered email address and password.');
      return;
    }

    setError(null);
    trackEvent('login_started');

    try {
      await login({ email: email.trim(), password });
      trackEvent('login_success');

      // Upon successful login, direct user immediately to the Registration Wizard Page (/register)
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect') || '/register';
      window.location.href = redirect;
    } catch (err: unknown) {
      trackEvent('login_failed');
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please check your email and password.';
      setError(msg);
    }
  };

  return (
    <AuthLayout
      title="Login to HackNEX"
      subtitle="Enter your registered email and password to access the team registration wizard."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="p-3 rounded-[var(--radius-md)] bg-red-950/50 border border-red-800 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Registered Email Address"
          type="email"
          placeholder="captain@karunya.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          leftIcon={<Mail className="w-4 h-4" />}
          error={isEmailInvalid ? 'Please enter a valid email address' : undefined}
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={isPasswordInvalid ? 'Password is required' : undefined}
          autoComplete="current-password"
          required
        />

        <div className="flex items-center justify-end text-xs pt-1">
          <a
            href="/forgot-password"
            className="text-[var(--color-accent-cyan)] hover:underline font-mono"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          leftIcon={<LogIn className="w-4 h-4" />}
          className="w-full mt-2"
        >
          {isLoading ? 'Authenticating...' : 'LOGIN'}
        </Button>

        <div className="text-center pt-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
          Don't have an account?{' '}
          <a href="/signup" className="text-[var(--color-accent-cyan)] font-bold hover:underline">
            Sign up
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};
