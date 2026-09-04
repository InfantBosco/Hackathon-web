import React, { useState, useEffect } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { authService } from '../services/authService';
import { CheckCircle2, AlertCircle, Mail, Send, ArrowRight } from 'lucide-react';
import { Spinner } from '../components/ui/Spinner';
import { trackEvent } from '../lib/analytics';

export const VerifyEmailPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error' | 'sent_notice'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailForResend, setEmailForResend] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);

  const hasAttemptedRef = React.useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const isSentNotice = urlParams.get('sent') === 'true';
    const emailParam = urlParams.get('email');

    if (emailParam) {
      setEmailForResend(emailParam);
    }

    if (token && !hasAttemptedRef.current) {
      hasAttemptedRef.current = true;
      setStatus('verifying');
      trackEvent('verification_started');
      authService
        .verifyEmail(token)
        .then(() => {
          setStatus('success');
          trackEvent('verification_success');
        })
        .catch((err) => {
          setStatus('error');
          setErrorMessage(err.message || 'Verification link is invalid or has expired.');
          trackEvent('verification_failed');
        });
    } else if (isSentNotice && !token) {
      setStatus('sent_notice');
    }
  }, []);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForResend || !emailForResend.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setResendSuccess(null);

    try {
      await authService.resendVerification(emailForResend);
      setIsResending(false);
      setResendSuccess('Verification email has been resent! Please check your inbox.');
      trackEvent('verification_resend_success');
    } catch (err: unknown) {
      setIsResending(false);
      const msg = err instanceof Error ? err.message : 'Failed to resend verification email.';
      setErrorMessage(msg);
      trackEvent('verification_resend_failed');
    }
  };

  return (
    <AuthLayout
      title="Email Verification"
      subtitle="Verify your email address to unlock HackNEX 2026 registration."
    >
      {/* 1. Loading / Verifying State */}
      {status === 'verifying' && (
        <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
          <Spinner size="lg" />
          <h3 className="text-lg font-heading font-bold text-white">Verifying your email...</h3>
          <p className="text-xs text-[var(--color-text-secondary)] font-mono">
            Please wait while we validate your verification token.
          </p>
        </div>
      )}

      {/* 2. Success State */}
      {status === 'success' && (
        <div className="py-6 flex flex-col items-center justify-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white">Email Verified Successfully</h3>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            Your HackNEX account is now fully verified. You can proceed directly to team registration.
          </p>
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => (window.location.href = '/login')}
            className="w-full mt-2"
          >
            CONTINUE TO LOGIN
          </Button>
        </div>
      )}

      {/* 3. Sent Notice State (After Signup) */}
      {status === 'sent_notice' && (
        <div className="space-y-4">
          <div className="p-4 rounded-[var(--radius-md)] bg-[rgba(0,240,255,0.05)] border border-[rgba(0,240,255,0.2)] text-center space-y-2">
            <Mail className="w-8 h-8 text-[var(--color-accent-cyan)] mx-auto" />
            <h4 className="text-base font-heading font-bold text-white">Check Your Inbox</h4>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
              We sent a verification email to <strong className="text-white">{emailForResend || 'your email'}</strong>. Click the link in the email to activate your account.
            </p>
          </div>

          {resendSuccess && (
            <div className="p-3 rounded-[var(--radius-md)] bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs">
              {resendSuccess}
            </div>
          )}

          <div className="text-center pt-2">
            <a href="/login" className="text-xs font-mono text-[var(--color-accent-cyan)] hover:underline">
              Already verified? Login here →
            </a>
          </div>
        </div>
      )}

      {/* 4. Error / Expired State & Resend Form */}
      {(status === 'error' || status === 'idle') && (
        <div className="space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-[var(--radius-md)] bg-red-950/50 border border-red-800 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {resendSuccess && (
            <div className="p-3 rounded-[var(--radius-md)] bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs">
              {resendSuccess}
            </div>
          )}

          <form onSubmit={handleResend} className="space-y-4">
            <Input
              label="Resend Verification Email"
              type="email"
              placeholder="captain@karunya.edu"
              value={emailForResend}
              onChange={(e) => setEmailForResend(e.target.value)}
              leftIcon={<Mail className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="secondary"
              size="md"
              isLoading={isResending}
              leftIcon={<Send className="w-4 h-4" />}
              className="w-full"
            >
              RESEND VERIFICATION EMAIL
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
            Back to{' '}
            <a href="/login" className="text-[var(--color-accent-cyan)] font-bold hover:underline">
              Login
            </a>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};
