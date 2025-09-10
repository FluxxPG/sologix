import { NextResponse } from 'next/server';

const publicPaths = [
  '/',
  '/home',
  '/login',
  '/register',
  '/forgot-password',
  '/aboutus',
  '/contactus',
  '/privacy',
  '/termCondition',
  '/forhome',
  '/solorbusiness',
  '/becomepartner',
  '/resource',
  '/refund',
  '/products',
  '/about',
  '/contact',
  '/api/auth/.*' // Allow all auth API routes
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
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

  // If user is not authenticated and path is not public, redirect to login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For authenticated users, continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
