import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionary";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return <LoginForm lang={lang} copy={dict.authPages?.login} />;
}