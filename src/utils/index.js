import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export { initializeRazorpay, makePayment } from './razorpay';
export { loadScript } from './loadScript';

// Create axios instance
const API = axios.create({
  baseURL: "https://sologix-web-nvm3.vercel.app/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        try {
          const parsedSession = JSON.parse(userSession);
          // Check for both access_token and token for backward compatibility
          const accessToken = parsedSession?.access_token || parsedSession?.token;
          
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          console.error('Error parsing user session:', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only handle client-side
      if (typeof window !== 'undefined') {
        // Remove invalid session
        localStorage.removeItem("userSession");
        // Redirect to login if not already there
        if (!window.location.pathname.includes('login')) {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export { API };
