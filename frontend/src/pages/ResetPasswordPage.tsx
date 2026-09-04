import React, { useState, useEffect } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';
import { Lock, Eye, EyeOff, KeyRound, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const ResetPasswordPage: React.FC = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Password reset token is missing or invalid.');
    }
  }, []);

  const hasMinLength = newPassword.length >= 8;
  const isPasswordMatched = newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError('Invalid or missing password reset token.');
      return;
    }
    if (!hasMinLength) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (!isPasswordMatched) {
      setError('Passwords do not match.');
      return;
    }

    setError(null);
    setIsLoading(true);
    trackEvent('password_reset_started');

    try {
      await authService.resetPassword({ token, newPassword, confirmPassword });
      setIsLoading(false);
      setIsSuccess(true);
      trackEvent('password_reset_success');
    } catch (err: unknown) {
      setIsLoading(false);
      const msg = err instanceof Error ? err.message : 'Failed to reset password. Link may be expired.';
      setError(msg);
      trackEvent('password_reset_failed');
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter a new password for your HackNEX 2026 account."
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white">Password Reset Successful</h3>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Your password has been updated successfully. You can now login with your new password.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => (window.location.href = '/login')}
            className="w-full mt-2"
          >
            CONTINUE TO LOGIN
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div className="p-3 rounded-[var(--radius-md)] bg-red-950/50 border border-red-800 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            autoComplete="new-password"
            required
          />

          {/* Password Checklist */}
          <div className="p-3 rounded-[var(--radius-sm)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] text-xs space-y-1">
            <span className="text-[var(--color-text-muted)] font-mono block mb-1">PASSWORD REQUIREMENTS:</span>
            <div className="flex items-center gap-2">
              <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${hasMinLength ? 'bg-emerald-500 text-black' : 'bg-slate-700 text-slate-400'}`}>
                <Check className="w-2.5 h-2.5" />
              </div>
              <span className={hasMinLength ? 'text-white' : 'text-[var(--color-text-muted)]'}>Minimum 8 characters</span>
            </div>
          </div>

          <Input
            label="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            autoComplete="new-password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            leftIcon={<KeyRound className="w-4 h-4" />}
            className="w-full mt-2"
          >
            {isLoading ? 'Updating Password...' : 'RESET PASSWORD'}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};
