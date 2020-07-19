import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    if (error.response.status === 403) {
      console.log('Please log in');
    } else {
      return Promise.reject(error);
    }
  }
);
export default api;
