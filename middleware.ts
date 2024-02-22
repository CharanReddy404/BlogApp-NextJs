import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './lib/session';

const protectedRoutes = ['/article/create', '/article/edit'];
const ignoreRoutes = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  // await updateSession(request);
  const isAuthenticated = await getSession();

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && isProtectedRoute) {
    const absoluteURL = new URL('/login', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  const isIgnoredRoute = ignoreRoutes.includes(request.nextUrl.pathname);

  if (isAuthenticated && isIgnoredRoute) {
    const absoluteURL = new URL('/article', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
