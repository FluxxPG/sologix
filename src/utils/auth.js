import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for auth token in cookies
  const authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1];
  
  return !!authToken;
};

// Get the authentication token
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  
  return document.cookie
    .split('; ')
    .find(row => row.startsWith('auth_token='))
    ?.split('=')[1] || null;
};

// Get the current user from localStorage
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userSession = localStorage.getItem('userSession');
    return userSession ? JSON.parse(userSession)?.user : null;
  } catch (error) {
    console.error('Error parsing user session:', error);
    return null;
  }
};

// Logout the user
export const logout = () => {
  if (typeof window === 'undefined') return;
  
  // Clear the auth cookie
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
  // Clear localStorage
  localStorage.removeItem('userSession');
  
  // Redirect to login
  window.location.href = '/login';
};

// Require authentication for a page component
export const requireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      if (!isAuthenticated()) {
        const loginUrl = new URL('/login', window.location.origin);
        loginUrl.searchParams.set('redirect', window.location.pathname);
        window.location.href = loginUrl.toString();
      } else {
        setIsAuth(true);
      }
    }, [router]);

    if (typeof window === 'undefined' || !isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  Wrapper.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return Wrapper;
};

export default {
  isAuthenticated,
  getAuthToken,
  getCurrentUser,
  logout,
  requireAuth
};
