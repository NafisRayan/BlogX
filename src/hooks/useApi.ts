import { useState, useCallback } from 'react';
import { ApiError, ValidationError, NetworkError } from '../utils/error-handler';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  validationErrors: Record<string, string> | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: {
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
    autoExecute?: boolean;
  } = {}
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string> | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
    setValidationErrors(null);
  }, []);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);
        setValidationErrors(null);

        const result = await apiFunction(...args);
        setData(result);
        options.onSuccess?.(result);
      } catch (err) {
        let error: Error;

        if (err instanceof ValidationError) {
          setValidationErrors(err.fields || {});
          error = err;
        } else if (err instanceof NetworkError || err instanceof ApiError) {
          error = err;
        } else if (err instanceof Error) {
          error = new ApiError(err.message);
        } else {
          error = new ApiError('An unexpected error occurred');
        }

        setError(error);
        options.onError?.(error);
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, options]
  );

  // Auto-execute if option is set
  useState(() => {
    if (options.autoExecute) {
      execute();
    }
  });

  return {
    data,
    loading,
    error,
    validationErrors,
    execute,
    reset
  };
}

// Example usage:
/*
const MyComponent = () => {
  const {
    data: blogs,
    loading,
    error,
    execute: fetchBlogs
  } = useApi(blogService.getBlogs, {
    onSuccess: (data) => console.log('Blogs loaded:', data),
    onError: (error) => console.error('Failed to load blogs:', error),
    autoExecute: true
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {blogs?.map(blog => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
*/ 