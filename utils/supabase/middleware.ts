import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'ar';
  const pathnameWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';

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
    if (!user && pathnameWithoutLocale.startsWith('/dashboard')) {
      const url = request.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return NextResponse.redirect(url);
    }

    // 2. THE FIX: Removed /reset-password from this list!
    // We only block login, register, and forgot-password if they are logged in.
    const isAuthRoute = 
      pathnameWithoutLocale.startsWith('/login') ||
      pathnameWithoutLocale.startsWith('/register') ||
      pathnameWithoutLocale.startsWith('/forgot-password');

    if (user && isAuthRoute) {
      const url = request.nextUrl.clone();
      url.pathname = `/${currentLocale}/dashboard`;
      return NextResponse.redirect(url);
    }
    
  } catch {
    // If the auth provider is temporarily unreachable, do not take public routes down.
    if (pathnameWithoutLocale.startsWith('/dashboard')) {
      const url = request.nextUrl.clone();
      url.pathname = `/${currentLocale}/login`;
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}