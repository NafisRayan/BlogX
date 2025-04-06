import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor to unwrap data and handle errors consistently
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
