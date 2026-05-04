import type { Locale } from "@/i18n-config";
import { getCommonDictionary } from "@/lib/dictionary";
import { PublicFooter } from "@/components/public/footer";
import { PublicNavbar } from "@/components/public/navbar";
import Script from "next/script";

type PublicShellProps = {
  lang: string;
  dict: Record<string, unknown>;
  activeHref?: "/" | "/features" | "/pricing" | "/about" | "/contact" | "/help" | "/privacy" | "/terms";
  children: React.ReactNode;
};

export async function PublicShell({ lang, dict, activeHref, children }: PublicShellProps) {
  const commonDict = await getCommonDictionary(lang as Locale);
  const shellDict = { ...commonDict, ...dict };

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
      <PublicNavbar lang={lang} dict={shellDict} activeHref={activeHref} />
      <main className="flex-1 pt-18 sm:pt-20">
        <Script id="arba7i-structured-data" type="application/ld+json">
          {JSON.stringify(structuredData)}
        </Script>
        {children}
      </main>
      <PublicFooter lang={lang} dict={shellDict} />
    </div>
  );
}
