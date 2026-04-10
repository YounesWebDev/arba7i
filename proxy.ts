import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const locales = ["ar", "en", "fr"];
const defaultLocale = "ar"; 

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. THE FIX: Skip language routing for Supabase Auth Callbacks
  if (pathname.startsWith('/auth/callback')) {
    return await updateSession(request);
  }

  // 2. Check if the URL already has a valid language (e.g., /en/pricing)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. If it DOES NOT have a language, determine the right one and redirect
  if (!pathnameHasLocale) {
    const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
    const localeToUse = locales.includes(savedLocale as string) ? savedLocale : defaultLocale;
    
    request.nextUrl.pathname = `/${localeToUse}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // 4. If the URL is fully valid, pass it to Supabase for Auth & Cookie handling
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};