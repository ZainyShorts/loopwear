import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import DescopeClient from '@descope/node-sdk';

const descopeClient = DescopeClient({ projectId: process.env.DESCOPE_PROJECT_ID as string });

const PROTECTED_PATHS = [ '/profile', '/settings'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  

  if (PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    const sessionToken = req.cookies.get('DS')?.value;

    if (!sessionToken) {
      console.log('No session token found. Redirecting to login.');
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await descopeClient.validateSession(sessionToken);
      console.log('Session is valid.');
    } catch (error) {
      console.error('Session validation failed:', error);
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
