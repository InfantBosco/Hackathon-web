import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Spinner } from '../ui/Spinner';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requireVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireVerification = true,
}) => {
  const { isAuthenticated, isVerified, isLoading, initializeAuth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col items-center justify-center gap-4 text-white">
        <Spinner size="lg" />
        <span className="font-mono text-xs text-[var(--color-text-muted)]">VERIFYING AUTHENTICATION STATE...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    const redirectUrl = encodeURIComponent(location.pathname + location.search);
    window.location.href = `/login?redirect=${redirectUrl}`;
    return null;
  }

  if (requireVerification && !isVerified) {
    window.location.href = '/verify-email';
    return null;
  }

  return children;
};
