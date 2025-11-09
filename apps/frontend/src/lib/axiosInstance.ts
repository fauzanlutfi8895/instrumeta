import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      const message = error.response.data?.message || error.response.statusText || "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Request was made but no response was received
      return Promise.reject(new Error("No response from server"));
    } else {
      // Error in setting up the request
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
