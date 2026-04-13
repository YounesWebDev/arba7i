import type { Locale } from "@/i18n-config";
import { getAuthDictionary } from "@/lib/dictionary";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getAuthDictionary(lang as Locale);

  return <LoginForm lang={lang} copy={dict.authPages?.login} />;
}
