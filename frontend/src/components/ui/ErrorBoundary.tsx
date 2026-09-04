import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[300px] w-full flex flex-col items-center justify-center p-8 text-center bg-[var(--color-surface)] border border-red-500/30 rounded-[var(--radius-lg)] my-8">
          <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
          <h3 className="text-xl font-heading font-bold text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-md mb-6">
            An unexpected visual component error occurred. Please refresh the page or try again later.
          </p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
