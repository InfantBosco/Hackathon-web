import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SessionExpiredPage } from './pages/SessionExpiredPage';
import { ComponentShowcase } from './pages/ComponentShowcase';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { initSentry } from './lib/sentry';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initSentry();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {isLoading && (
          <LoadingScreen
            videoSrc="/assets/loadingscreen.mp4"
            isLoading={isLoading}
            onComplete={() => setIsLoading(false)}
          />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/session-expired" element={<SessionExpiredPage />} />
          <Route path="/showcase" element={<ComponentShowcase />} />

          {/* Protected Registration Entry Point */}
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-[var(--color-bg-primary)] text-white flex flex-col items-center justify-center p-8 text-center">
                  <h2 className="text-3xl font-heading font-bold text-[var(--color-accent-cyan)] mb-4">
                    AUTHENTICATED REGISTRATION ENTRY
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)] max-w-md mb-6">
                    You have successfully authenticated and verified your account. The step-by-step registration wizard will load in the upcoming registration phase.
                  </p>
                  <a href="/" className="px-6 py-3 rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-xs font-mono hover:text-[var(--color-accent-cyan)]">
                    ← Return to Website
                  </a>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
