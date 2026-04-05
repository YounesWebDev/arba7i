import Link from "next/link";
import { ArrowRight, Lightbulb, ShieldCheck, Sparkles, Users } from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

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
    <div className="bg-background text-foreground">
      <section className="px-6 pb-24 pt-32 md:pt-44">
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
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
      </section>

      <section className="bg-muted/40 px-6 py-24">
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
            ].map((item) => (
              <div key={item.label} className="rounded-[2rem] bg-card p-8 shadow-sm">
                <div className="text-4xl font-black text-primary">{item.value}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
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
          {values.map((value) => (
            <div
              key={value.title}
              className="group rounded-2xl bg-muted/40 p-8 transition-all duration-300 hover:bg-card"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{value.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2.5rem] border border-border/20 bg-muted/40 p-10">
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
              ].map((role) => (
                <div key={role} className="rounded-2xl border border-white/10 bg-white/10 p-4 font-medium">
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-primary/10 p-12 text-center md:p-20">
          <h2 className="text-4xl font-extrabold tracking-tighter text-primary md:text-5xl">
            {dict?.aboutPage?.finalCta?.title || "Build with a clearer operating system"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {dict?.aboutPage?.finalCta?.description ||
              "If your business is scaling, your tools should give you more clarity, not more friction."}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${lang}/register`}
              className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-4 font-bold text-primary-foreground"
            >
              {dict?.aboutPage?.finalCta?.cta1 || "Get Started"}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/20 bg-background px-8 py-4 font-bold text-primary"
            >
              {dict?.aboutPage?.finalCta?.cta2 || "Contact Sales"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
