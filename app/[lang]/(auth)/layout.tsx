import { AuthLayoutShell } from "@/components/auth/auth-layout-shell";
import { PublicNavbar } from "@/components/public/navbar";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionary";

export default async function AuthLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicNavbar lang={lang} dict={dict} />
      <main className="flex-1 pt-18 sm:pt-20">
        <AuthLayoutShell lang={lang} copy={dict.authPages}>
          {children}
        </AuthLayoutShell>
      </main>
    </div>
  );
}
