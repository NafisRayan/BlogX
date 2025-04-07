import axios from 'axios';
import { handleApiError, shouldRetryRequest } from '../utils/error-handler';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling and retries
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const config = error.config;

    // Initialize retry count
    config.retryCount = config.retryCount ?? 0;

    // Check if we should retry the request
    if (config.retryCount < MAX_RETRIES && shouldRetryRequest(error)) {
      config.retryCount += 1;

      // Delay before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * config.retryCount));

      // Retry the request
      return apiClient(config);
    }

    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;
