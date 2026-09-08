import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Codex Nova UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-cxn flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <p className="font-mono text-sm font-semibold text-error">Something went wrong</p>
          <h1 className="mt-3 text-2xl font-extrabold text-ink">This screen hit an unexpected error.</h1>
          <p className="mt-2 max-w-md text-sm text-muted">
            Try refreshing. If it keeps happening, return home and continue from there.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => this.setState({ hasError: false })}>
              Try again
            </Button>
            <Button to="/" variant="outline">
              Back to Codex Nova
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
