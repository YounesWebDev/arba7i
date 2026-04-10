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
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  // Fetch the correct dictionary before the page even renders!
  const dict = await getDictionary(lang as Locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Arba7i",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "DZD",
    },
    description:
      "The simple operating system for Algerian Cash on Delivery e-commerce. Centralize orders, inventory, and logistics.",
  };

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <PublicNavbar lang={lang} dict={dict} />

      <main className="flex-1 pt-18 sm:pt-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </main>

      <PublicFooter lang={lang} dict={dict} />
    </div>
  );
}
