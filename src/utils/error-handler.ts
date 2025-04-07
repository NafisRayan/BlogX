import axios, { AxiosError } from 'axios';

// Custom error classes
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends Error {
  constructor(message: string = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends Error {
  constructor(
    message: string,
    public fields?: Record<string, string>
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Error handler function
export const handleApiError = (error: unknown): never => {
  // Log error for debugging
  console.error('API Error:', error);

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    // Handle network errors
    if (!axiosError.response) {
      throw new NetworkError(
        'Unable to connect to the server. Please check your internet connection.'
      );
    }

    const status = axiosError.response.status;
    const data = axiosError.response.data;

    // Handle different status codes
    switch (status) {
      case 400:
        if (data.validationErrors) {
          throw new ValidationError('Validation failed', data.validationErrors);
        }
        throw new ApiError(data.message || 'Invalid request', status);

      case 401:
        throw new ApiError('Please login to continue', status, 'UNAUTHORIZED');

      case 403:
        throw new ApiError('You don\'t have permission to perform this action', status, 'FORBIDDEN');

      case 404:
        throw new ApiError('The requested resource was not found', status, 'NOT_FOUND');

      case 422:
        throw new ValidationError(
          data.message || 'Validation failed',
          data.validationErrors
        );

      case 429:
        throw new ApiError('Too many requests. Please try again later', status, 'RATE_LIMIT');

      case 500:
        throw new ApiError(
          'An unexpected error occurred. Please try again later',
          status,
          'SERVER_ERROR'
        );

      default:
        throw new ApiError(
          'Something went wrong. Please try again later',
          status
        );
    }
  }

  // Handle non-Axios errors
  if (error instanceof Error) {
    throw new ApiError(error.message);
  }

  throw new ApiError('An unexpected error occurred');
};

// Helper function to format validation errors
export const formatValidationErrors = (errors: Record<string, string>): string => {
  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join('\n');
};

// Function to determine if error should trigger a retry
export const shouldRetryRequest = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    // Retry on network errors or 5xx server errors
    return !status || status >= 500;
  }
  return false;
}; 