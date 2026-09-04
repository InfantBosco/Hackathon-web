import { ComponentShowcase } from './pages/ComponentShowcase';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <ComponentShowcase />
    </ErrorBoundary>
  );
}

export default App;
