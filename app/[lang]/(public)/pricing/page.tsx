import Link from "next/link";
import { PricingSection } from "@/components/public/pricing-section";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const comparisons = [
    {
      label: dict?.pricingPage?.comparison?.row1 || "Monthly orders",
      basic: dict?.pricingPage?.comparison?.basic1 || "500",
      pro: dict?.pricingPage?.comparison?.pro1 || "3,000",
      ultra: dict?.pricingPage?.comparison?.ultra1 || "Unlimited",
    },
    {
      label: dict?.pricingPage?.comparison?.row2 || "Stores and team",
      basic: dict?.pricingPage?.comparison?.basic2 || "Unlimited",
      pro: dict?.pricingPage?.comparison?.pro2 || "Unlimited",
      ultra: dict?.pricingPage?.comparison?.ultra2 || "Unlimited",
    },
    {
      label: dict?.pricingPage?.comparison?.row3 || "Returns management",
      basic: "-",
      pro: dict?.pricingPage?.comparison?.pro3 || "Included",
      ultra: dict?.pricingPage?.comparison?.ultra3 || "Advanced",
    },
    {
      label: dict?.pricingPage?.comparison?.row4 || "Multi-warehouse",
      basic: "-",
      pro: "-",
      ultra: dict?.pricingPage?.comparison?.ultra4 || "Included",
    },
    {
      label: dict?.pricingPage?.comparison?.row5 || "Priority support",
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

  const basicName = dict?.home?.pricing?.basicName || "Basic";
  const proName = dict?.home?.pricing?.proName || "Professional";
  const ultraName = dict?.home?.pricing?.ultraName || "Ultra";

  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pb-28 pt-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
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
      </section>

      <div className="-mt-12">
        <PricingSection dict={dict} />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {dict?.pricingPage?.comparison?.title || "Compare plans clearly"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict?.pricingPage?.comparison?.subtitle ||
              "A direct view of what changes as your business gets more complex."}
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border/20 bg-card shadow-sm">
          <div className="hidden grid-cols-4 border-b border-border/20 bg-muted/40 text-sm font-bold md:grid">
            <div className="p-4">
              {dict?.pricingPage?.comparison?.featureCol || "Feature"}
            </div>
            <div className="p-4 text-center">{basicName}</div>
            <div className="p-4 text-center text-primary">{proName}</div>
            <div className="p-4 text-center">{ultraName}</div>
          </div>

          <div className="hidden md:block">
            {comparisons.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-4 border-b border-border/10 text-sm last:border-b-0"
              >
                <div className="p-4 font-medium">{row.label}</div>
                <div className="p-4 text-center text-muted-foreground">{row.basic}</div>
                <div className="p-4 text-center font-bold text-primary">{row.pro}</div>
                <div className="p-4 text-center text-muted-foreground">{row.ultra}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 p-4 md:hidden">
            {comparisons.map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-border/20 bg-muted/30 p-5"
              >
                <h3 className="mb-4 font-bold">{row.label}</h3>
                <div className="space-y-3 text-sm">
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
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 px-6 py-24">
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
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-border/20 bg-card p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold">{item.q}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-br from-primary to-accent p-12 text-primary-foreground shadow-2xl shadow-primary/20 md:p-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
                {dict?.pricingPage?.finalCta?.title || "Start with the right plan today"}
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/85">
                {dict?.pricingPage?.finalCta?.description ||
                  "You do not need enterprise complexity to get operational clarity from day one."}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href={`/${lang}/register`}
                className="rounded-2xl bg-background px-8 py-4 text-center font-bold text-primary"
              >
                {dict?.pricingPage?.finalCta?.cta1 || "Create Free Account"}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="rounded-2xl border border-white/20 px-8 py-4 text-center font-bold text-primary-foreground"
              >
                {dict?.pricingPage?.finalCta?.cta2 || "Talk to Sales"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
