import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { initSentry } from './lib/sentry';

export function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Sentry error monitoring
    initSentry();

    // Safety fallback timeout to prevent trapping the user indefinitely
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      {isLoading && (
        <LoadingScreen
          videoSrc="/assets/loadingscreen.mp4"
          isLoading={isLoading}
          onComplete={() => setIsLoading(false)}
        />
      )}
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
