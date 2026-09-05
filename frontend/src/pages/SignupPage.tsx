import React, { useState } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({ name: false, email: false, password: false, confirmPassword: false });

  const hasMinLength = password.length >= 8;
  const isPasswordMatched = password && confirmPassword && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (!name || name.length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!hasMinLength) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!isPasswordMatched) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsLoading(true);
    trackEvent('signup_started');

    try {
      await authService.signup({ name, email, password, confirmPassword });
      trackEvent('signup_success');
      window.location.href = `/verify-email?sent=true&email=${encodeURIComponent(email)}`;
    } catch (err: unknown) {
      setIsLoading(false);
      trackEvent('signup_failed');
      const msg = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(msg);
    }
  };

  const preventCopyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register your account to start team registration for HackNEX 2026."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div className="p-3 rounded-[var(--radius-md)] bg-red-950/50 border border-red-800 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
          leftIcon={<User className="w-4 h-4" />}
          error={touched.name && name.length < 2 ? 'Name must be at least 2 characters' : undefined}
          autoComplete="name"
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="captain@karunya.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          leftIcon={<Mail className="w-4 h-4" />}
          error={touched.email && (!email || !email.includes('@')) ? 'Invalid email format' : undefined}
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
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          onCut={preventCopyPaste}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none hover:text-white transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          autoComplete="new-password"
          required
        />

        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
          onCopy={preventCopyPaste}
          onPaste={preventCopyPaste}
          onCut={preventCopyPaste}
          leftIcon={<Lock className="w-4 h-4" />}
          error={touched.confirmPassword && confirmPassword && !isPasswordMatched ? 'Passwords do not match' : undefined}
          autoComplete="new-password"
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          leftIcon={<UserPlus className="w-4 h-4" />}
          className="w-full mt-2"
        >
          {isLoading ? 'Creating Account...' : 'CREATE ACCOUNT'}
        </Button>

        <div className="text-center pt-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
          Already have an account?{' '}
          <a href="/login" className="text-[var(--color-accent-cyan)] font-bold hover:underline">
            Login
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};
