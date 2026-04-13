import type { Locale } from "@/i18n-config";
import { getAuthDictionary } from "@/lib/dictionary";
import { RegisterForm } from "./RegisterForm";

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getAuthDictionary(lang as Locale);

  return <RegisterForm lang={lang} copy={dict.authPages?.register} />;
}
