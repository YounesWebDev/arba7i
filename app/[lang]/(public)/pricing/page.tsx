import Link from "next/link";
import type { Metadata } from "next";
import { FadeInView } from "@/components/public/fade-in-view";
import { PricingSection } from "@/components/public/pricing-section";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const title = `Arba7i | ${dict?.pricingPage?.hero?.title1 || "Pricing"}`;
  const description =
    dict?.pricingPage?.hero?.description ||
    "Choose the Arba7i plan that fits your store today and upgrade later when your business grows.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
      siteName: "Arba7i",
    },
    twitter: {
      card: "summary_large_image",
      title: "Arba7i Pricing",
      description,
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const comparisons = [
    {
      label: dict?.pricingPage?.comparison?.row1 || "Monthly orders",
      welcome: dict?.pricingPage?.comparison?.welcome1 || "50",
      basic: dict?.pricingPage?.comparison?.basic1 || "500",
      pro: dict?.pricingPage?.comparison?.pro1 || "3,000",
      ultra: dict?.pricingPage?.comparison?.ultra1 || "Unlimited",
    },
    {
      label: dict?.pricingPage?.comparison?.row2 || "Stores and team",
      welcome: dict?.pricingPage?.comparison?.welcome2 || "1 / 1",
      basic: dict?.pricingPage?.comparison?.basic2 || "Unlimited",
      pro: dict?.pricingPage?.comparison?.pro2 || "Unlimited",
      ultra: dict?.pricingPage?.comparison?.ultra2 || "Unlimited",
    },
    {
      label: dict?.pricingPage?.comparison?.row3 || "Returns management",
      welcome: "-",
      basic: "-",
      pro: dict?.pricingPage?.comparison?.pro3 || "Included",
      ultra: dict?.pricingPage?.comparison?.ultra3 || "Advanced",
    },
    {
      label: dict?.pricingPage?.comparison?.row4 || "Multi-warehouse",
      welcome: "-",
      basic: "-",
      pro: "-",
      ultra: dict?.pricingPage?.comparison?.ultra4 || "Included",
    },
    {
      label: dict?.pricingPage?.comparison?.row5 || "Priority support",
      welcome: dict?.pricingPage?.comparison?.welcome5 || "Email",
      basic: dict?.pricingPage?.comparison?.basic5 || "Standard",
      pro: dict?.pricingPage?.comparison?.pro5 || "Priority",
      ultra: dict?.pricingPage?.comparison?.ultra5 || "Dedicated",
    },
  ];

  const faqs = [
    {
      q: dict?.pricingPage?.faq?.q1 || "Can I change plans later?",
      a:
        dict?.pricingPage?.faq?.a1 ||
        "Yes. You can move up as your operations grow without losing your existing data.",
    },
    {
      q: dict?.pricingPage?.faq?.q2 || "Is there a long-term contract?",
      a:
        dict?.pricingPage?.faq?.a2 ||
        "No. Start with the plan that fits your current stage and adjust when needed.",
    },
    {
      q: dict?.pricingPage?.faq?.q3 || "Which plan is best for multiple warehouses?",
      a:
        dict?.pricingPage?.faq?.a3 ||
        "Ultra is the right fit when your business needs multi-warehouse coordination and tailored support.",
    },
  ];

  const welcomeName = dict?.home?.pricing?.welcomeName || "Welcome Offer";
  const basicName = dict?.home?.pricing?.basicName || "Basic";
  const proName = dict?.home?.pricing?.proName || "Professional";
  const ultraName = dict?.home?.pricing?.ultraName || "Ultra";
  const welcomePeriodLabel =
    lang === "ar" ? "\u0031\u0035 \u064A\u0648\u0645" : lang === "fr" ? "15 jours" : "15 days";
  const welcomeColumnLabel = `${welcomeName} / ${welcomePeriodLabel}`;

  return (
    <div className="overflow-x-hidden bg-background pb-20 font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <FadeInView as="section" className="relative overflow-hidden px-6 pb-28 pt-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-primary to-primary/80" />
            {dict?.pricingPage?.hero?.eyebrow || "Pricing"}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
            {dict?.pricingPage?.hero?.title1 || "Simple pricing that"}
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {dict?.pricingPage?.hero?.title2 || "grows with your store"}
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.pricingPage?.hero?.description ||
              "Choose the package that fits your current stage without paying for complexity you do not need yet."}
          </p>
        </div>
      </FadeInView>

      <FadeInView as="div" className="-mt-12">
        <PricingSection dict={dict} />
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {dict?.pricingPage?.comparison?.title || "Compare plans clearly"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict?.pricingPage?.comparison?.subtitle ||
              "A direct view of what changes as your business gets more complex."}
          </p>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-border/20 bg-card shadow-sm">
          <div className="hidden grid-cols-5 border-b border-border/20 bg-muted/40 text-sm font-bold md:grid">
            <div className="p-4">
              {dict?.pricingPage?.comparison?.featureCol || "Feature"}
            </div>
            <div className="p-4 text-center">{welcomeColumnLabel}</div>
            <div className="p-4 text-center">{basicName}</div>
            <div className="p-4 text-center text-primary">{proName}</div>
            <div className="p-4 text-center">{ultraName}</div>
          </div>

          <div className="hidden md:block">
            {comparisons.map((row, index) => (
              <div
                key={`comparison-row-${index}`}
                className="grid grid-cols-5 border-b border-border/10 text-sm last:border-b-0"
              >
                <div className="p-4 font-medium">{row.label}</div>
                <div className="p-4 text-center text-muted-foreground">{row.welcome}</div>
                <div className="p-4 text-center text-muted-foreground">{row.basic}</div>
                <div className="p-4 text-center font-bold text-primary">{row.pro}</div>
                <div className="p-4 text-center text-muted-foreground">{row.ultra}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 p-4 md:hidden">
            {comparisons.map((row, index) => (
              <FadeInView key={`comparison-card-${index}`} delay={index * 60}>
                <div className="rounded-2xl border border-border/20 bg-muted/30 p-5">
                  <h3 className="mb-4 font-bold">{row.label}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">{welcomeColumnLabel}</span>
                      <span className="font-medium">{row.welcome}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">{basicName}</span>
                      <span className="font-medium">{row.basic}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-primary">{proName}</span>
                      <span className="font-bold text-primary">{row.pro}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">{ultraName}</span>
                      <span className="font-medium">{row.ultra}</span>
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {dict?.pricingPage?.faq?.title || "Common pricing questions"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict?.pricingPage?.faq?.subtitle ||
                "Short answers to the questions merchants usually ask before starting."}
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <FadeInView key={`pricing-faq-${index}`} delay={index * 60}>
                <div className="rounded-2xl border border-border/20 bg-card p-6 shadow-sm transition-all duration-300 hover:bg-muted/30">
                  <h3 className="text-lg font-bold">{item.q}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="relative overflow-hidden px-6 pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-r from-primary via-accent to-primary p-12 text-center text-primary-foreground shadow-2xl shadow-primary/20 md:p-24">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-black tracking-tighter md:text-7xl">
                {dict?.pricingPage?.finalCta?.title || "Start with the right plan today"}
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                {dict?.pricingPage?.finalCta?.description ||
                  "You do not need enterprise complexity to get operational clarity from day one."}
              </p>
              <div className="flex flex-col items-center justify-center gap-6 pt-6 sm:flex-row">
                <Link
                  href={`/${lang}/register`}
                  className="rounded-2xl border border-transparent bg-background px-10 py-5 text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  {dict?.pricingPage?.finalCta?.cta1 || "Create Free Account"}
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="font-bold text-primary-foreground underline decoration-white/30 underline-offset-8 decoration-2 transition-all hover:decoration-white"
                >
                  {dict?.pricingPage?.finalCta?.cta2 || "Talk to Sales"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </div>
  );
}
