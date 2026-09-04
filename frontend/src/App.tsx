import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { SessionExpiredPage } from './pages/SessionExpiredPage';
import { RegistrationWizardPage } from './pages/RegistrationWizardPage';
import { RegistrationStatusPage } from './pages/RegistrationStatusPage';
import { PaymentPage } from './pages/PaymentPage';
import { RegistrationConfirmedPage } from './pages/RegistrationConfirmedPage';
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

          {/* Protected Registration & Payment Routes */}
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <RegistrationWizardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registration/status"
            element={
              <ProtectedRoute>
                <RegistrationStatusPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:registrationId"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registration/confirmed"
            element={
              <ProtectedRoute>
                <RegistrationConfirmedPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
