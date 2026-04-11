import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

const locales = ["ar", "en", "fr"];
const defaultLocale = "ar"; 

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameWithoutLocale = pathname.replace(/^\/(ar|en|fr)(?=\/|$)/, "") || "/";
  
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

  const needsAuthSession =
    pathnameWithoutLocale.startsWith("/dashboard") ||
    pathnameWithoutLocale.startsWith("/admin") ||
    pathnameWithoutLocale.startsWith("/login") ||
    pathnameWithoutLocale.startsWith("/register") ||
    pathnameWithoutLocale.startsWith("/forgot-password") ||
    pathnameWithoutLocale.startsWith("/complete-profile");

  if (!needsAuthSession) {
    return NextResponse.next();
  }

  // 4. Only auth-sensitive routes need Supabase session handling
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
