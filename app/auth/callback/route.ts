import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

function isProfileComplete(profile: { username: string | null; phone_number: string | null } | null) {
  return Boolean(profile?.username && profile?.phone_number)
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  
  // If there is no code, someone just typed the URL manually. Send them to login.
  if (!code) {
    return NextResponse.redirect(`${origin}/ar/login`)
  }

  const supabase = await createClient()
  
  // 1. Exchange the secure code for an actual logged-in session
  const { data: { user }, error } = await supabase.auth.exchangeCodeForSession(code)
  
  // THE FIX: Show the REAL error message from Supabase in the URL!
  if (error || !user) {
    return NextResponse.redirect(`${origin}/ar/login?error=${encodeURIComponent(error?.message || "User not found")}`)
  }

  // --- THE GOOGLE SYNC & ROUTING LOGIC ---

  // Try to determine the language from the 'next' URL (e.g. "/en/dashboard" -> "en")
  const langMatch = next.match(/^\/(ar|en|fr)(\/|$)/);
  const lang = langMatch ? langMatch[1] : "ar";

  // 2. Check if this Google user already exists in our public Drizzle table
  const { data: existingUser } = await supabase
    .from("users")
    .select("username, phone_number")
    .eq("id", user.id)
    .single();

  // 3. FIRST TIME GOOGLE LOGIN: They are not in our database yet!
  if (!existingUser) {
    const fullName = user.user_metadata?.full_name || "";
    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      profile_pic: user.user_metadata?.avatar_url || null,
    });

    return NextResponse.redirect(`${origin}/${lang}/complete-profile`);
  }

  // 4. INCOMPLETE PROFILE: They exist, but haven't picked a username/phone yet
  if (!isProfileComplete(existingUser)) {
    return NextResponse.redirect(`${origin}/${lang}/complete-profile`);
  }

  // 5. PERFECT LOGIN: They exist and have a username. Send them to where they wanted to go!
  return NextResponse.redirect(`${origin}${next}`);
}
