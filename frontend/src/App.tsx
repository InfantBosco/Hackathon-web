import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ComponentShowcase } from './pages/ComponentShowcase';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { initSentry } from './lib/sentry';
import { AuroraWaveBackground } from './components/ui/AuroraWaveBackground';

export default function App() {
  useEffect(() => {
    initSentry();
  }, []);

  return (
    <ErrorBoundary>
      <AuroraWaveBackground>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/showcase" element={<ComponentShowcase />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuroraWaveBackground>
    </ErrorBoundary>
  );
}
