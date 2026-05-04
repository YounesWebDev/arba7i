import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getLocaleFromPath, isLocalizedPath, removeLeadingLocale } from '@/lib/simple-text';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const matchedLocale = getLocaleFromPath(pathname);
  const currentLocale = matchedLocale ?? 'ar';
  const pathnameWithoutLocale = matchedLocale ? removeLeadingLocale(pathname, matchedLocale) : pathname || '/';
  const isLocalizedRoute = isLocalizedPath(pathname);

  let supabaseResponse = NextResponse.next({
    request,
  });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, 
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 1. If user is NOT logged in and tries to access /dashboard
    if (!user && (pathnameWithoutLocale.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
      const url = request.nextUrl.clone();
      url.pathname = isLocalizedRoute ? `/${currentLocale}/login` : '/ar/login';
      return NextResponse.redirect(url);
    }

    // 2. THE FIX: Removed /reset-password from this list!
    // We only block login, register, and forget-password if they are logged in.
    const isAuthRoute = 
      pathnameWithoutLocale.startsWith('/login') ||
      pathnameWithoutLocale.startsWith('/register') ||
      pathnameWithoutLocale.startsWith('/forget-password');

    if (user && isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = `/${currentLocale}/dashboard`;
      return NextResponse.redirect(url);
    }
    
  } catch {
    // If the auth provider is temporarily unreachable, do not take public routes down.
    if (pathnameWithoutLocale.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      const url = request.nextUrl.clone();
      url.pathname = isLocalizedRoute ? `/${currentLocale}/login` : '/ar/login';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
