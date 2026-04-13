import { redirect } from "next/navigation";
import type { Locale } from "@/i18n-config";
import { getAuthDictionary } from "@/lib/dictionary";
import { createClient } from "@/utils/supabase/server";
import ResetPasswordClientForm from "./ResetPasswordClientForm";

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { lang } = await params;
  const { error } = await searchParams;
  const dict = await getAuthDictionary(lang as Locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const resetError =
      lang === "ar"
        ? "لازم تطلب استرجاع كلمة المرور أولاً."
        : "Please request a password reset first.";

    redirect(
      `/${lang}/forget-password?error=${encodeURIComponent(resetError)}`
    );
  }

  return (
    <ResetPasswordClientForm
      lang={lang}
      error={error}
      copy={dict.authPages?.resetPassword}
    />
  );
}
