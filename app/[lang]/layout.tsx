// --- app/[lang]/layout.tsx ---
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { i18n } from "@/i18n-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arba7i | Smarter Decisions for Better Profits",
  description: "The high-end architect for your e-commerce financial health.",
};

export function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (() => {
              try {
                const storedTheme = localStorage.getItem("theme") || "system";
                const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                const resolvedTheme = storedTheme === "system"
                  ? (systemDark ? "dark" : "light")
                  : storedTheme;

                document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
                document.documentElement.style.colorScheme = resolvedTheme;
              } catch {}
            })();
          `}
        </Script>
        <ThemeProvider>
          <DirectionProvider dir={dir}>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
