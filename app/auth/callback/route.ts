import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { getLocaleFromPath } from '@/lib/simple-text'

function isProfileComplete(profile: { username: string | null; phone_number: string | null } | null) {
  return Boolean(profile?.username && profile?.phone_number)
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  
  if (!code) {
    return NextResponse.redirect(`${origin}/ar/login`)
  }

  const supabase = await createClient()
  
  // 1. Exchange the secure code for an actual logged-in session
  const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
  
  if (error || !user) {
    return NextResponse.redirect(`${origin}/ar/login?error=${encodeURIComponent(error?.message || "User not found")}`)
  }

  const lang = getLocaleFromPath(next) ?? "ar";

  try {
    // THE FIX 1: Use maybeSingle() instead of single() to prevent strict crashes
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("username, phone_number")
      .eq("id", user.id)
      .maybeSingle();

    if (checkError) {
      console.error("DB CHECK ERROR:", checkError);
    }

    // 3. FIRST TIME GOOGLE LOGIN (Or sync missing users)
    if (!existingUser) {
      const fullName = user.user_metadata?.full_name || "";
      const nameParts = fullName.split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      
      const tempUsername = `user_${Math.random().toString(36).substring(2, 10)}`;

      // THE FIX 2: Use upsert() so if they accidentally exist, it forces an update instead of a crash!
      const { error: upsertError } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        username: tempUsername, 
        profile_pic: user.user_metadata?.avatar_url || null,
      });

      if (upsertError) {
        console.error("UPSERT ERROR:", upsertError);
        return NextResponse.redirect(`${origin}/${lang}/login?error=${encodeURIComponent("DB Error: " + upsertError.message)}`);
      }

      return NextResponse.redirect(`${origin}/${lang}/complete-profile`);
    }

    // 4. INCOMPLETE PROFILE
    if (!isProfileComplete(existingUser)) {
      return NextResponse.redirect(`${origin}/${lang}/complete-profile`);
    }

    // 5. PERFECT LOGIN (Existing users go straight through here!)
    return NextResponse.redirect(`${origin}${next}`);

  } catch (err: unknown) {
    console.error("CALLBACK CRASH:", err);
    return NextResponse.redirect(`${origin}/${lang}/login?error=${encodeURIComponent("An unexpected error occurred during Google Sign-in.")}`);
  }
}
