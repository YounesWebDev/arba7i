// --- app/[lang]/layout.tsx ---
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arba7i | Smarter Decisions for Better Profits",
  description: "The high-end architect for your e-commerce financial health.",
};

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
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <DirectionProvider dir={dir}>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </DirectionProvider>
      </body>
    </html>
  );
}
