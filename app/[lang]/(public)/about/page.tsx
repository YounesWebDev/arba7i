import Link from "next/link";
import type { Metadata } from "next";
import { FadeInView } from "@/components/public/fade-in-view";
import { ArrowRight, Lightbulb, ShieldCheck, Sparkles, Users } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const title = `Arba7i | ${dict?.aboutPage?.hero?.title2 || "About"}`;
  const description =
    dict?.aboutPage?.hero?.description ||
    "Learn what Arba7i is, why it exists, and how it helps merchants run daily operations with more clarity.";

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
      title: "About Arba7i",
      description,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const values = [
    {
      icon: ShieldCheck,
      title: dict?.aboutPage?.values?.item1Title || "Transparency",
      body:
        dict?.aboutPage?.values?.item1Body ||
        "Clear product logic, clear pricing, and clear data visibility for merchants.",
    },
    {
      icon: Lightbulb,
      title: dict?.aboutPage?.values?.item2Title || "Useful Innovation",
      body:
        dict?.aboutPage?.values?.item2Body ||
        "We focus on solving real operational friction instead of adding noise.",
    },
    {
      icon: Users,
      title: dict?.aboutPage?.values?.item3Title || "Merchant-First",
      body:
        dict?.aboutPage?.values?.item3Body ||
        "Every decision starts with the daily realities of sellers and their teams.",
    },
    {
      icon: Sparkles,
      title: dict?.aboutPage?.values?.item4Title || "Quality",
      body:
        dict?.aboutPage?.values?.item4Body ||
        "The interface should feel calm, intentional, and dependable under pressure.",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-background pb-20 font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <FadeInView as="section" className="relative overflow-hidden px-6 pb-24 pt-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-primary to-primary/80" />
            {dict?.aboutPage?.hero?.eyebrow || "About"}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
            {dict?.aboutPage?.hero?.title1 || "Reimagining commerce"}
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {dict?.aboutPage?.hero?.title2 || "with clarity and control"}
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.aboutPage?.hero?.description ||
              "Arba7i exists to give merchants a cleaner and more confident way to run daily operations."}
          </p>
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {dict?.aboutPage?.mission?.title || "Why Arba7i exists"}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {dict?.aboutPage?.mission?.body ||
                "Commerce teams should not need scattered tools and constant manual follow-up to stay in control."}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                value: dict?.aboutPage?.mission?.stat1Value || "24/7",
                label: dict?.aboutPage?.mission?.stat1Label || "Operational visibility",
              },
              {
                value: dict?.aboutPage?.mission?.stat2Value || "1",
                label: dict?.aboutPage?.mission?.stat2Label || "Unified workspace",
              },
            ].map((item, index) => (
              <FadeInView key={`mission-stat-${index}`} delay={index * 60}>
                <div className="group rounded-2xl bg-card p-8 transition-all duration-300 hover:bg-background">
                  <div className="text-4xl font-black text-primary">{item.value}</div>
                  <div className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {dict?.aboutPage?.values?.title || "The principles behind the product"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict?.aboutPage?.values?.subtitle ||
              "The product direction is grounded in clarity, discipline, and usefulness."}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value, index) => (
            <FadeInView key={`value-${index}`} delay={index * 60}>
              <div className="group rounded-2xl bg-muted/40 p-8 transition-all duration-300 hover:bg-card">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{value.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            </FadeInView>
          ))}
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2.5rem] border border-border/20 bg-card p-10 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {dict?.aboutPage?.philosophy?.eyebrow || "Product Philosophy"}
            </span>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              {dict?.aboutPage?.philosophy?.title || "The fluid architect"}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {dict?.aboutPage?.philosophy?.body1 ||
                "We build structured systems that still feel flexible in the way real teams work."}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {dict?.aboutPage?.philosophy?.body2 ||
                "As operations grow, the interface should help you stay calm instead of making the business harder to see."}
            </p>
          </div>
          <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-accent p-10 text-primary-foreground shadow-2xl shadow-primary/20">
            <h3 className="text-3xl font-extrabold tracking-tight">
              {dict?.aboutPage?.team?.title || "Built by people who care about operations"}
            </h3>
            <p className="mt-5 text-primary-foreground/85">
              {dict?.aboutPage?.team?.description ||
                "The product is shaped around the daily friction of merchants, warehouse teams, and order operations."}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[ 
                dict?.aboutPage?.team?.role1 || "Product direction",
                dict?.aboutPage?.team?.role2 || "Operational design",
                dict?.aboutPage?.team?.role3 || "Merchant experience",
                dict?.aboutPage?.team?.role4 || "Platform quality",
              ].map((role, index) => (
                <FadeInView key={`role-${index}`} delay={index * 60}>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 font-medium">
                    {role}
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="relative overflow-hidden px-6 pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-r from-primary via-accent to-primary p-12 text-center text-primary-foreground shadow-2xl shadow-primary/20 md:p-24">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-black tracking-tighter md:text-7xl">
                {dict?.aboutPage?.finalCta?.title || "Build with a clearer operating system"}
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                {dict?.aboutPage?.finalCta?.description ||
                  "If your business is scaling, your tools should give you more clarity, not more friction."}
              </p>
              <div className="flex flex-col items-center justify-center gap-6 pt-6 sm:flex-row">
                <Link
                  href={`/${lang}/register`}
                  className="rounded-2xl border border-transparent bg-background px-10 py-5 text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  {dict?.aboutPage?.finalCta?.cta1 || "Get Started"}
                </Link>
                <Link
                  href={`/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 font-bold text-primary-foreground underline decoration-white/30 underline-offset-8 decoration-2 transition-all hover:decoration-white"
                >
                  {dict?.aboutPage?.finalCta?.cta2 || "Contact Sales"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </div>
  );
}
