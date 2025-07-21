"use client";

import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import store from "@/redux/store";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NextUIProviders } from "@/providers/nextui-provider";

// Routes where we hide header/footer
const hideHeaderFooterRoutes = ['/login', '/register', '/forgot-password'];

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/aboutus',
  '/contactus',
  '/privacy',
  '/termCondition'
];

export function ClientLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Check if we should hide header/footer for the current route
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Simple mount check to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Client-side auth check (as a fallback to middleware)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Skip auth check for the home page
    if (pathname === '/') return;
    
    const isPublicRoute = publicRoutes.some(route => {
      // Handle root path specially
      if (route === '/' && pathname === '/') return true;
      // Handle other public routes
      return pathname === route || pathname.startsWith(`${route}/`);
    });
    
    // If it's a public route, no need to check auth
    if (isPublicRoute) return;
    
    const authToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];
    
    // If not a public route and no auth token, redirect to home page instead of login
    if (!isPublicRoute && !authToken) {
      window.location.href = '/';
    }
  }, [pathname]);

  if (!mounted) {
    return (
      <Provider store={store}>
        <NextUIProviders>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </NextUIProviders>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <NextUIProviders>
        {!shouldHideHeaderFooter && <Header />}
        <main className={shouldHideHeaderFooter ? 'min-h-screen' : 'min-h-[calc(100vh-64px)]'}>
          {children}
        </main>
        {!shouldHideHeaderFooter && <Footer />}
        <Toaster position="top-right" />
      </NextUIProviders>
    </Provider>
  );
}
