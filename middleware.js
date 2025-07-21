import { NextResponse } from 'next/server';

const publicPaths = [
  '/$', // Match exactly the root path
  '/login',
  '/register',
  '/forgot-password',
  '/aboutus',
  '/contactus',
  '/privacy',
  '/termCondition',
  '/afterleadingpage', // Add afterleadingpage to public paths
  '/product-details/.*', // Allow product details pages
  '/api/auth/.*', // Allow all auth API routes
  '^/_next/static/.*', // Allow Next.js static files
  '^/_next/image/.*', // Allow Next.js image optimization
  '^/favicon.ico$', // Allow favicon
  '\.(svg|png|jpg|jpeg|gif|webp)$' // Allow image files
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Always allow these paths without any checks
  if (
    pathname === '/' || // Home page
    pathname.startsWith('/_next/') || // Next.js internal routes
    pathname.startsWith('/api/') || // API routes
    pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|css|js)$/) // Static files
  ) {
    return NextResponse.next();
  }
  
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => {
    const regex = new RegExp(`^${path.replace('/\*$', '.*')}$`);
    return regex.test(pathname);
  });

  // Check for auth token in cookies
  const authToken = request.cookies.get('auth_token')?.value;
  
  // If it's a public path, allow access
  if (isPublicPath) {
    // If user is authenticated and tries to access login/register, redirect to dashboard
    if (authToken && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/afterleadingpage', request.url));
    }
    return NextResponse.next();
  }

  // If user is not authenticated and path is not public, redirect to home page
  if (!authToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For authenticated users, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
