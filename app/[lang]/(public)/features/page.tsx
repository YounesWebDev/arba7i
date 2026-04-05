import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Brush,
  CheckCircle2,
  Crosshair,
  ShieldCheck,
  Truck,
  UserCog,
  Wallet,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const features = [
    {
      icon: Brush,
      title: dict?.featuresPage?.cards?.storefrontTitle || "Storefront Builder",
      body:
        dict?.featuresPage?.cards?.storefrontBody ||
        "Shape a clean storefront experience without fighting your tools.",
    },
    {
      icon: Truck,
      title: dict?.featuresPage?.cards?.shippingTitle || "Shipping Operations",
      body:
        dict?.featuresPage?.cards?.shippingBody ||
        "Connect carriers, route orders faster, and keep delivery under control.",
    },
    {
      icon: Wallet,
      title: dict?.featuresPage?.cards?.financeTitle || "Profit Visibility",
      body:
        dict?.featuresPage?.cards?.financeBody ||
        "See how costs, returns, and delivery fees affect your net result.",
    },
    {
      icon: Boxes,
      title: dict?.featuresPage?.cards?.inventoryTitle || "Inventory Control",
      body:
        dict?.featuresPage?.cards?.inventoryBody ||
        "Track stock across products and warehouses before issues become losses.",
    },
    {
      icon: UserCog,
      title: dict?.featuresPage?.cards?.teamTitle || "Team Permissions",
      body:
        dict?.featuresPage?.cards?.teamBody ||
        "Assign responsibilities clearly and keep sensitive actions restricted.",
    },
    {
      icon: Crosshair,
      title: dict?.featuresPage?.cards?.insightsTitle || "Actionable Insights",
      body:
        dict?.featuresPage?.cards?.insightsBody ||
        "Use the right numbers to make faster and more confident decisions.",
    },
  ];

  const highlights = [
    dict?.featuresPage?.highlights?.item1 ||
      "A single workspace for storefront, orders, shipping, and finance.",
    dict?.featuresPage?.highlights?.item2 ||
      "Operational workflows built for COD and regional fulfillment realities.",
    dict?.featuresPage?.highlights?.item3 ||
      "Sharper visibility into the margin behind every order you send.",
  ];

  const adminItems = [
    {
      icon: Wallet,
      title: dict?.featuresPage?.admin?.item1Title || "Real-time Profit Tracking",
      body:
        dict?.featuresPage?.admin?.item1Body ||
        "Follow revenue, delivery fees, and return costs from one dashboard.",
    },
    {
      icon: CheckCircle2,
      title: dict?.featuresPage?.admin?.item2Title || "Expense Logging",
      body:
        dict?.featuresPage?.admin?.item2Body ||
        "Keep marketing, stock, and overhead costs attached to the right operation.",
    },
    {
      icon: ShieldCheck,
      title: dict?.featuresPage?.admin?.item3Title || "Controlled Access",
      body:
        dict?.featuresPage?.admin?.item3Body ||
        "Give each team member the access they need without exposing everything.",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-7xl text-center">
          <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {dict?.featuresPage?.hero?.eyebrow || "Features"}
          </span>
          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold tracking-tighter md:text-7xl">
            {dict?.featuresPage?.hero?.title1 || "All-in-One"}
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {dict?.featuresPage?.hero?.title2 || "E-commerce Control"}
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.featuresPage?.hero?.description ||
              "A practical operating layer for stores, orders, shipping, stock, and profit."}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${lang}/register`}
              className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/15 transition-all hover:scale-[1.02]"
            >
              {dict?.featuresPage?.hero?.cta1 || "Start Free"}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="flex items-center gap-2 rounded-2xl border border-border/30 px-8 py-4 text-base font-semibold transition-all hover:bg-muted"
            >
              {dict?.featuresPage?.hero?.cta2 || "Talk to Our Team"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {dict?.featuresPage?.overview?.title || "Everything your operation needs"}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict?.featuresPage?.overview?.subtitle ||
                "Built to reduce friction across the daily work that actually moves revenue."}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl bg-muted/40 p-8 transition-all duration-300 hover:bg-card"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2.5rem] border border-border/20 bg-card p-8 shadow-sm md:p-10">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
              {dict?.featuresPage?.highlights?.title || "Why teams move faster with Arba7i"}
            </h2>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex gap-4 rounded-2xl border border-border/20 bg-muted/40 p-5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-foreground/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground shadow-2xl shadow-primary/20 md:p-10">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl">
              {dict?.featuresPage?.metrics?.title || "Built for measurable improvement"}
            </h2>
            <p className="mb-10 text-primary-foreground/85">
              {dict?.featuresPage?.metrics?.subtitle ||
                "Cleaner operations, better margin visibility, and fewer avoidable errors."}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  value: dict?.featuresPage?.metrics?.value1 || "24/7",
                  label: dict?.featuresPage?.metrics?.label1 || "Operational visibility",
                },
                {
                  value: dict?.featuresPage?.metrics?.value2 || "-40%",
                  label: dict?.featuresPage?.metrics?.label2 || "Manual follow-up pressure",
                },
                {
                  value: dict?.featuresPage?.metrics?.value3 || "+1",
                  label: dict?.featuresPage?.metrics?.label3 || "Unified control center",
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <div className="text-3xl font-black">{item.value}</div>
                  <div className="mt-2 text-sm text-primary-foreground/75">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[3rem] bg-foreground px-6 py-24 text-background md:mx-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-flex rounded-full bg-primary/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {dict?.featuresPage?.admin?.eyebrow || "Administration"}
              </span>
              <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
                {dict?.featuresPage?.admin?.title || "Data-driven control for daily decisions"}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-background/70">
                {dict?.featuresPage?.admin?.description ||
                  "See the financial effect of operations as they happen and keep your team aligned."}
              </p>
              <div className="mt-10 space-y-8">
                {adminItems.map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-background/65">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="font-bold">
                  {dict?.featuresPage?.admin?.panelTitle || "Financial Health"}
                </h3>
                <span className="font-bold text-accent">
                  {dict?.featuresPage?.admin?.panelDelta || "+18.5% This Month"}
                </span>
              </div>
              <div className="space-y-6">
                {[
                  {
                    label: dict?.featuresPage?.admin?.panelItem1 || "Total Sales",
                    value: "450,000 DZD",
                    width: "w-full",
                    tone: "bg-gradient-to-r from-primary to-accent",
                  },
                  {
                    label: dict?.featuresPage?.admin?.panelItem2 || "Operating Costs",
                    value: "-124,000 DZD",
                    width: "w-[45%]",
                    tone: "bg-white/30",
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-background/60">{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5">
                      <div className={`h-full rounded-full ${item.width} ${item.tone}`} />
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-lg font-bold">
                    {dict?.featuresPage?.admin?.panelFooterLabel || "Net Profit"}
                  </span>
                  <span className="text-2xl font-black text-accent">28.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-primary/10 p-12 text-center md:p-20">
          <h2 className="text-4xl font-extrabold tracking-tighter text-primary md:text-5xl">
            {dict?.featuresPage?.finalCta?.title || "Start scaling with better control"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {dict?.featuresPage?.finalCta?.description ||
              "Bring your store, shipping, team, and numbers into one clear operating system."}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${lang}/register`}
              className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-4 text-base font-bold text-primary-foreground"
            >
              {dict?.featuresPage?.finalCta?.cta1 || "Create Free Account"}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="rounded-2xl border border-primary/20 bg-background px-8 py-4 text-base font-bold text-primary"
            >
              {dict?.featuresPage?.finalCta?.cta2 || "Talk to Sales"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
