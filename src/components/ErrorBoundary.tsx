import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ApiError, NetworkError, ValidationError } from '../utils/error-handler';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  private getErrorMessage(): string {
    const { error } = this.state;

    if (!error) return 'An unexpected error occurred';

    if (error instanceof ValidationError) {
      return `Validation Error: ${error.message}`;
    }

    if (error instanceof NetworkError) {
      return 'Network Error: Unable to connect to the server';
    }

    if (error instanceof ApiError) {
      return `API Error: ${error.message}`;
    }

    return error.message;
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-600 mb-6">{this.getErrorMessage()}</p>
              <button
                onClick={this.handleRetry}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary; 