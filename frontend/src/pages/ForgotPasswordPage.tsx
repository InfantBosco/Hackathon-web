import React, { useState } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsLoading(true);
    trackEvent('forgot_password_started');

    try {
      await authService.forgotPassword(email);
      setIsLoading(false);
      setIsSubmitted(true);
      trackEvent('forgot_password_success');
    } catch {
      // Safe generic handling to prevent user enumeration
      setIsLoading(false);
      setIsSubmitted(true);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your registered email address to receive a password reset link."
    >
      {isSubmitted ? (
        <div className="py-4 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-heading font-bold text-white">Reset Link Sent</h4>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            If an account is associated with <strong className="text-white">{email}</strong>, a password reset link has been dispatched to your inbox.
          </p>
          <div className="pt-4 border-t border-[var(--color-border-subtle)]">
            <a href="/login" className="text-xs font-mono text-[var(--color-accent-cyan)] hover:underline">
              Back to Login →
            </a>
          </div>
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
            label="Registered Email Address"
            type="email"
            placeholder="captain@karunya.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            leftIcon={<Send className="w-4 h-4" />}
            className="w-full mt-2"
          >
            {isLoading ? 'Sending Link...' : 'SEND RESET LINK'}
          </Button>

          <div className="text-center pt-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
            Remembered your password?{' '}
            <a href="/login" className="text-[var(--color-accent-cyan)] font-bold hover:underline">
              Login
            </a>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};
