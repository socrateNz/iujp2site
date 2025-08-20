import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
    const isLoginRoute = req.nextUrl.pathname === '/admin/login';

    // Si c'est une route admin et que l'utilisateur n'est pas admin
    if (isAdminRoute && !isLoginRoute) {
      if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      if (token.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

    // Si l'utilisateur est connecté et essaie d'accéder à la page de login
    if (isLoginRoute && token) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Autoriser l'accès à /admin/login même sans token
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path((?!articles|filieres|ecoles).*)', 
  ],
};
 