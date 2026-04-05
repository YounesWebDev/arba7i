// --- proxy.ts ---
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/middleware' // Your Supabase Auth

const locales = ["ar", "en", "fr"];
const defaultLocale = "ar"; // Arabic is the strict default

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Check if the URL already has a valid language (e.g., /en/pricing)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 2. If it DOES NOT have a language, determine the right one and redirect
  if (!pathnameHasLocale) {
    // Read the user's saved preference from previous visits
    const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
    
    // Verify the saved cookie is a supported language, otherwise fallback to Arabic
    const localeToUse = locales.includes(savedLocale as string) ? savedLocale : defaultLocale;
    
    // Inject the language into the URL and redirect them
    request.nextUrl.pathname = `/${localeToUse}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // 3. If the URL is fully valid, protect the route with Supabase Auth
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}