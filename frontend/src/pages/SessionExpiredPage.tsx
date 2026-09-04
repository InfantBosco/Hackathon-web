import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { Clock, LogIn } from 'lucide-react';

export const SessionExpiredPage: React.FC = () => {
  return (
    <AuthLayout
      title="Session Expired"
      subtitle="Your authentication token has expired."
    >
      <div className="py-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400 mx-auto">
          <Clock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-heading font-bold text-white">Session Timeout</h3>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
          For security reasons, your login session has expired. Please log in again to continue to your registration.
        </p>
        <Button
          variant="primary"
          size="md"
          leftIcon={<LogIn className="w-4 h-4" />}
          onClick={() => (window.location.href = '/login')}
          className="w-full mt-2"
        >
          LOGIN AGAIN
        </Button>
      </div>
    </AuthLayout>
  );
};
