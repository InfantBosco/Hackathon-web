import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { initSentry } from './lib/sentry';
import { AdminProtectedRoute } from './components/admin/AdminProtectedRoute';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardOverviewPage } from './pages/admin/AdminDashboardOverviewPage';
import { AdminRegistrationsPage } from './pages/admin/AdminRegistrationsPage';
import { AdminRegistrationDetailsPage } from './pages/admin/AdminRegistrationDetailsPage';
import { AdminParticipantsPage } from './pages/admin/AdminParticipantsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminExportsPage } from './pages/admin/AdminExportsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminProfilePage } from './pages/admin/AdminProfilePage';
import { AuroraWaveBackground } from './components/ui/AuroraWaveBackground';

export function App() {
  useEffect(() => {
    initSentry();
  }, []);

  return (
    <ErrorBoundary>
      <AuroraWaveBackground>
        <BrowserRouter>
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

            {/* Admin Authentication Entry */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboardOverviewPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/registrations"
              element={
                <AdminProtectedRoute>
                  <AdminRegistrationsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/registrations/:registrationId"
              element={
                <AdminProtectedRoute>
                  <AdminRegistrationDetailsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/participants"
              element={
                <AdminProtectedRoute>
                  <AdminParticipantsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <AdminProtectedRoute>
                  <AdminPaymentsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminProtectedRoute>
                  <AdminAnalyticsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/exports"
              element={
                <AdminProtectedRoute>
                  <AdminExportsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/audit-logs"
              element={
                <AdminProtectedRoute>
                  <AdminAuditLogsPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <AdminProtectedRoute>
                  <AdminProfilePage />
                </AdminProtectedRoute>
              }
            />
            {/* Wildcard Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuroraWaveBackground>
    </ErrorBoundary>
  );
}

export default App;
