// --- app/[lang]/(public)/layout.tsx ---
import { PublicNavbar } from "@/components/public/navbar";
import { PublicFooter } from "@/components/public/footer";
import { getDictionary } from "@/lib/dictionary"; // Your new loader!
import type { Locale } from "@/i18n-config";

export default async function PublicLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>; // Use your strict Locale type here
}>) {
  const { lang } = await params;
  
  // Fetch the correct dictionary before the page even renders!
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicNavbar lang={lang} dict={dict} />
      
      <main className="flex-1 pt-18 sm:pt-20">
        {children}
      </main>
      
      <PublicFooter lang={lang} dict={dict} />
    </div>
  );
}
