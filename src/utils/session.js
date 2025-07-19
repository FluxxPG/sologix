// Helper function to get user session from cookies
export function getUserSession() {
  if (typeof window === 'undefined') return null;
  
  // Try to get from localStorage first (for backward compatibility)
  const localStorageSession = localStorage.getItem('userSession');
  if (localStorageSession) {
    try {
      return JSON.parse(localStorageSession);
    } catch (e) {
      console.error('Error parsing localStorage session:', e);
    }
  }
  
  // Try to get from cookies
  const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    cookies[name] = value;
    return cookies;
  }, {});
  
  if (cookies.userSession) {
    try {
      return JSON.parse(decodeURIComponent(cookies.userSession));
    } catch (e) {
      console.error('Error parsing cookie session:', e);
    }
  }
  
  return null;
}

// Helper function to clear user session
export function clearUserSession() {
  if (typeof window === 'undefined') return;
  
  // Clear localStorage
  localStorage.removeItem('userSession');
  
  // Clear cookie by setting expiration to past date
  document.cookie = 'userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}
