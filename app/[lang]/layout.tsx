// --- app/[lang]/layout.tsx ---
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "../globals.css";
import { DirectionProvider } from "@/components/ui/direction";
import { i18n } from "@/i18n-config";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";

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
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;
  const resolvedTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : null;
  const htmlClassName = `${inter.variable} ${inter.className} h-full antialiased${resolvedTheme === "dark" ? " dark" : ""}`;

  return (
    <html
      lang={lang}
      dir={dir}
      data-scroll-behavior="smooth"
      className={htmlClassName}
      style={resolvedTheme ? { colorScheme: resolvedTheme } : undefined}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full font-sans flex flex-col">
        <ThemeProvider>
          <DirectionProvider dir={dir}>{children}</DirectionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
