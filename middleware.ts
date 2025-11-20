import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './lib/i18n';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|static|favicon.ico|robots.txt|sitemap.xml|manifest.json|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.webp).*)'
  ]
};
