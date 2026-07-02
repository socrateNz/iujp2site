import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const isCrash = process.env.CRASH === 'true';
    const { pathname } = req.nextUrl;

    if (isCrash) {
      // Si CRASH est true, rediriger toutes les pages vers /crash (sauf les API et /crash lui-même)
      if (pathname !== '/crash' && !pathname.startsWith('/api')) {
        return NextResponse.redirect(new URL('/crash', req.url));
      }
    } else {
      // Si CRASH est false, rediriger /crash vers la page d'accueil
      if (pathname === '/crash') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    const token = req.nextauth.token;
    const isAdminRoute = pathname.startsWith('/admin');
    const isLoginRoute = pathname === '/admin/login';

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
        const { pathname } = req.nextUrl;
        const isAdminRoute = pathname.startsWith('/admin');
        const isApiAdminRoute = pathname.startsWith('/api/admin');

        // Ne requérir d'authentification que pour les routes admin ou API admin
        if (isAdminRoute || isApiAdminRoute) {
          if (pathname === '/admin/login') {
            return true;
          }
          return !!token;
        }

        // Autoriser l'accès aux pages publiques et autres API
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Matcher toutes les requêtes sauf :
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (icône du site)
     * - images et autres ressources publiques (.svg, .png, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

 