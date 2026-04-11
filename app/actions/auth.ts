"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const AUTH_MESSAGES = {
  en: {
    credentialsRequired: "Credentials are required.",
    invalidLoginCredentials: "Invalid login credentials.",
    allFieldsRequired: "All fields are required.",
    passwordsDoNotMatch: "Passwords do not match.",
    accountCreated: "Account created! Please log in.",
    googleAuthFailed: "Could not authenticate with Google.",
    fillAllFields: "Please fill in all fields.",
    usernameMinLength: "Username must be at least 5 characters long.",
    usernameInvalid: "Username can only contain letters, numbers, and underscores.",
    usernameOrPhoneTaken: "This username or phone number is already taken.",
    emailRequired: "Email is required.",
    checkResetEmail: "Check your email for the secure reset link!",
    passwordUpdated: "Password updated successfully. Please log in.",
  },
  ar: {
    credentialsRequired: "لازم تدخل بيانات الدخول.",
    invalidLoginCredentials: "بيانات الدخول غير صحيحة.",
    allFieldsRequired: "كل الخانات لازمة.",
    passwordsDoNotMatch: "كلمتا المرور ماهُمش متطابقتين.",
    accountCreated: "تم إنشاء الحساب. سجل الدخول باش تكمل.",
    googleAuthFailed: "ما قدرناش نسجلوك عبر Google.",
    fillAllFields: "عمر كل الخانات.",
    usernameMinLength: "اسم المستخدم لازم يكون فيه 5 أحرف على الأقل.",
    usernameInvalid: "اسم المستخدم يقبل غير الحروف والأرقام و _.",
    usernameOrPhoneTaken: "اسم المستخدم أو رقم الهاتف راه مستعمل من قبل.",
    emailRequired: "الإيميل مطلوب.",
    checkResetEmail: "شوف الإيميل تاعك، بعثنالك رابط آمن للاسترجاع.",
    passwordUpdated: "تم تحديث كلمة المرور. سجل الدخول من جديد.",
  },
} as const;

function getAuthMessage(lang: string, key: keyof typeof AUTH_MESSAGES.en) {
  return (lang === "ar" ? AUTH_MESSAGES.ar : AUTH_MESSAGES.en)[key];
}

// Helper function to keep multi-language routing smooth
async function getLocaleFromHeaders() {
  const referer = (await headers()).get("referer");
  if (!referer) return "en";
  const url = new URL(referer);
  const match = url.pathname.match(/^\/(ar|en|fr)(\/|$)/);
  return match?.[1] ?? "en";
}

async function getUserProfileState(userId: string, supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data: profile } = await supabase
    .from("users")
    .select("username, phone_number")
    .eq("id", userId)
    .single();

  return {
    profile,
    isComplete: Boolean(profile?.username && profile?.phone_number),
  };
}

// 1. Multi-field Login (Email, Phone, or Username)
export async function login(formData: FormData) {
  const supabase = await createClient();
  const identifier = ((formData.get("identifier") as string) || "").trim();
  const password = formData.get("password") as string;
  const lang = (formData.get("lang") as string) || (await getLocaleFromHeaders());

  if (!identifier || !password) {
    redirect(`/${lang}/login?error=${encodeURIComponent(getAuthMessage(lang, "credentialsRequired"))}`);
  }

  let emailToLogin = identifier;
  const isEmail = identifier.includes("@");
  const isPhone = /^\+?[0-9\s]+$/.test(identifier);

  // If they didn't type an email, look up their email via username or phone
  if (!isEmail) {
    let lookupData;
    let lookupError;

    if (isPhone) {
      const { data, error } = await supabase.from("users").select("email").eq("phone_number", identifier).single();
      lookupData = data;
      lookupError = error;
    } else {
      const { data, error } = await supabase.from("users").select("email").eq("username", identifier.toLowerCase()).single();
      lookupData = data;
      lookupError = error;
    }

    if (lookupError || !lookupData || !lookupData.email) {
      redirect(`/${lang}/login?error=${encodeURIComponent(getAuthMessage(lang, "invalidLoginCredentials"))}`);
    }
    
    emailToLogin = lookupData.email;
  }

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: emailToLogin,
    password,
  });

  if (error) {
    redirect(`/${lang}/login?error=${encodeURIComponent(error.message)}`);
  }

  // --- 📝 AUDIT LOG: Record the Login ---
  if (authData?.user) {
    await supabase.from("audit_logs").insert({
      user_id: authData.user.id,
      action: "user_login",
      details: "User logged into the dashboard.",
    });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { isComplete } = await getUserProfileState(user.id, supabase);

    if (!isComplete) {
      redirect(`/${lang}/complete-profile`);
    }
  }

  revalidatePath("/", "layout");
  redirect(`/${lang}/dashboard`);
}

// 2. New Signup (First Name, Last Name, Username, Phone)
export async function signup(formData: FormData) {
  const supabase = await createClient();
  
  const firstName = ((formData.get("firstName") as string) || "").trim();
  const lastName = ((formData.get("lastName") as string) || "").trim();
  const username = ((formData.get("username") as string) || "").trim();
  const phoneNumber = ((formData.get("phoneNumber") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const lang = (formData.get("lang") as string) || (await getLocaleFromHeaders());

  if (!firstName || !lastName || !username || !phoneNumber || !email || !password || !confirmPassword) {
    redirect(`/${lang}/register?error=${encodeURIComponent(getAuthMessage(lang, "allFieldsRequired"))}`);
  }

  if (password !== confirmPassword) {
    redirect(`/${lang}/register?error=${encodeURIComponent(getAuthMessage(lang, "passwordsDoNotMatch"))}`);
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (username.length < 5) {
    redirect(`/${lang}/register?error=${encodeURIComponent(getAuthMessage(lang, "usernameMinLength"))}`);
  }

  if (!usernameRegex.test(username)) {
    redirect(`/${lang}/register?error=${encodeURIComponent(getAuthMessage(lang, "usernameInvalid"))}`);
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { 
      data: { 
        first_name: firstName,
        last_name: lastName,
        username: username.toLowerCase(),
        phone_number: phoneNumber
      } 
    },
  });

  if (authError) {
    redirect(`/${lang}/register?error=${encodeURIComponent(authError.message)}`);
  }

  if (authData.user) {
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      email: email,
      first_name: firstName,
      last_name: lastName,
      username: username.toLowerCase(),
      phone_number: phoneNumber,
    });

    if (dbError) {
      redirect(`/${lang}/register?error=${encodeURIComponent(dbError.message)}`);
    }
  }

  await supabase.auth.signOut();
  redirect(`/${lang}/login?message=${encodeURIComponent(getAuthMessage(lang, "accountCreated"))}`);
}

// 3. Google Login
export async function signInWithGoogle(formData: FormData) {
  const lang = (formData.get("lang") as string) || (await getLocaleFromHeaders());
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/${lang}/dashboard`,
    },
  });

  if (error) {
    redirect(`/${lang}/login?error=${encodeURIComponent(getAuthMessage(lang, "googleAuthFailed"))}`);
  }
  if (data.url) redirect(data.url);
}

// 4. Complete Profile (For Google Users)
export async function completeProfile(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const username = formData.get("username") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const lang = formData.get("lang") as string || "en";

  if (!username || !phoneNumber) {
    redirect(`/${lang}/complete-profile?error=${encodeURIComponent(getAuthMessage(lang, "fillAllFields"))}`);
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (username.trim().length < 5) {
    redirect(`/${lang}/complete-profile?error=${encodeURIComponent(getAuthMessage(lang, "usernameMinLength"))}`);
  }

  if (!usernameRegex.test(username)) {
    redirect(`/${lang}/complete-profile?error=${encodeURIComponent(getAuthMessage(lang, "usernameInvalid"))}`);
  }

  const { error } = await supabase
    .from("users")
    .update({ 
      username: username.toLowerCase(),
      phone_number: phoneNumber 
    })
    .eq("id", user.id);

  if (error) {
    if (error.code === '23505') {
      redirect(`/${lang}/complete-profile?error=${encodeURIComponent(getAuthMessage(lang, "usernameOrPhoneTaken"))}`);
    }
    redirect(`/${lang}/complete-profile?error=${encodeURIComponent(error.message)}`);
  }

  // --- 📝 AUDIT LOG: Record Google Profile Completion ---
  await supabase.from("audit_logs").insert({
    user_id: user.id,
    action: "profile_completed",
    details: "User completed their Google SSO profile setup.",
  });

  redirect(`/${lang}/dashboard`);
}

// 5. Logout
export async function logout(formData: FormData) {
  const lang = (formData.get("lang") as string) || (await getLocaleFromHeaders());
  const supabase = await createClient();
  
  // --- 📝 AUDIT LOG: Record the Logout ---
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      action: "user_logout",
      details: "User manually logged out.",
    });
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(`/${lang}/login`);
}

// 6. Send Password Reset Email
export async function sendPasswordResetEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const lang = (formData.get("lang") as string) || "en";

  if (!email) {
    redirect(`/${lang}/forgot-password?error=${encodeURIComponent(getAuthMessage(lang, "emailRequired"))}`);
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/${lang}/reset-password`,
  });

  if (error) {
    redirect(`/${lang}/forgot-password?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/${lang}/forgot-password?message=${encodeURIComponent(getAuthMessage(lang, "checkResetEmail"))}`);
}

// 7. Update Password (After clicking the email link)
export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const lang = (formData.get("lang") as string) || "en";

  if (!password || !confirmPassword) {
    redirect(`/${lang}/reset-password?error=${encodeURIComponent(getAuthMessage(lang, "allFieldsRequired"))}`);
  }

  if (password !== confirmPassword) {
    redirect(`/${lang}/reset-password?error=${encodeURIComponent(getAuthMessage(lang, "passwordsDoNotMatch"))}`);
  }

  const { data, error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect(`/${lang}/reset-password?error=${encodeURIComponent(error.message)}`);
  }

  // --- 📝 AUDIT LOG: Record Password Reset ---
  if (data?.user) {
    await supabase.from("audit_logs").insert({
      user_id: data.user.id,
      action: "password_reset",
      details: "User successfully reset their password.",
    });
  }

  await supabase.auth.signOut();
  redirect(`/${lang}/login?message=${encodeURIComponent(getAuthMessage(lang, "passwordUpdated"))}`);
}
