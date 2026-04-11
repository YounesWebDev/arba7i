// --- app/[lang]/(public)/page.tsx ---
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Boxes, ChartColumnIncreasing,
  CheckCircle2, ClipboardList, Crosshair,
  RefreshCcw, Rocket,
  Store, TrendingUp, Truck, Users, Wallet,
  XCircle,
} from "lucide-react";
import { FadeInView } from "@/components/public/fade-in-view";
import { PricingSection } from "@/components/public/pricing-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const title = `Arba7i | ${dict?.home?.hero?.title2 || "Better Profits"}`;
  const description =
    dict?.home?.hero?.description ||
    "Manage your store, orders, delivery, stock, and real profit in one simple system.";

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
      title: "Arba7i SaaS",
      description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const precisionFeatures = [
    {
      icon: ClipboardList,
      title: dict?.home?.features?.orderTitle || "Order Management",
      body: dict?.home?.features?.orderBody || "Follow every order from checkout to confirmation and doorstep delivery with a clear operational flow.",
    },
    {
      icon: Wallet,
      title: dict?.home?.features?.financeTitle || "Finance Overview",
      body: dict?.home?.features?.financeBody || "Keep your budget, expenses, and margins visible from one financial control center.",
    },
    {
      icon: Store,
      title: dict?.home?.features?.storesTitle || "Store Management",
      body: dict?.home?.features?.storesBody || "Run multiple storefronts from one dashboard without losing visibility or control.",
    },
    {
      icon: Truck,
      title: dict?.home?.features?.carriersTitle || "Carrier Connections",
      body: dict?.home?.features?.carriersBody || "Link delivery partners directly to your workflow for faster dispatch and easier tracking.",
    },
    {
      icon: Users,
      title: dict?.home?.features?.staffTitle || "Team Control",
      body: dict?.home?.features?.staffBody || "Add staff members, split responsibilities, and manage permissions without operational chaos.",
    },
    {
      icon: Boxes,
      title: dict?.home?.features?.stockTitle || "Stock Management",
      body: dict?.home?.features?.stockBody || "Monitor quantities, catch low-stock moments early, and keep every item organized.",
    },
    {
      icon: Crosshair,
      title: dict?.home?.features?.pixelTitle || "Pixel Integration",
      body: dict?.home?.features?.pixelBody || "Connect ad pixels across stores to automate tracking and sharpen campaign performance.",
    },
    {
      icon: ChartColumnIncreasing,
      title: dict?.home?.features?.analyticsTitle || "Actionable Analytics",
      body: dict?.home?.features?.analyticsBody || "Read growth signals, evaluate performance, and make smarter decisions with confidence.",
    },
    {
      icon: RefreshCcw,
      title: dict?.home?.features?.recoveryTitle || "Recovery and Cleanup",
      body: dict?.home?.features?.recoveryBody || "Recover missed sales and filter duplicate or suspicious orders before they waste your time.",
    },
  ];

  const audienceSegments = [
    {
      icon: Store,
      title: dict?.home?.audience?.segment1Title || "Solo Seller",
      body:
        dict?.home?.audience?.segment1Body ||
        "For merchants launching their first store and needing one clean place to manage daily operations.",
    },
    {
      icon: Users,
      title: dict?.home?.audience?.segment2Title || "Growing Team",
      body:
        dict?.home?.audience?.segment2Body ||
        "For teams that need clearer roles, smoother order handling, and more control as volume increases.",
    },
    {
      icon: Boxes,
      title: dict?.home?.audience?.segment3Title || "Multi-Store Business",
      body:
        dict?.home?.audience?.segment3Body ||
        "For merchants running multiple stores and warehouses without wanting separate tools for each one.",
    },
    {
      icon: Rocket,
      title: dict?.home?.audience?.segment4Title || "High-Volume Operator",
      body:
        dict?.home?.audience?.segment4Body ||
        "For businesses handling large order flow and looking to protect margins while scaling with confidence.",
    },
  ];

  const beforeItems = [
    dict?.home?.beforeAfter?.before1 ||
      "Orders, stock, and delivery updates are scattered across too many places.",
    dict?.home?.beforeAfter?.before2 ||
      "You can see sales, but not your real net profit after costs and returns.",
    dict?.home?.beforeAfter?.before3 ||
      "Daily operations depend on manual follow-up, spreadsheets, and guesswork.",
  ];

  const afterItems = [
    dict?.home?.beforeAfter?.after1 ||
      "Orders, inventory, carriers, and finances live in one operational view.",
    dict?.home?.beforeAfter?.after2 ||
      "You know what you are actually earning and where money is leaking.",
    dict?.home?.beforeAfter?.after3 ||
      "Your team works faster with clearer workflows, fewer mistakes, and better decisions.",
  ];

  return (
    <div className="overflow-x-hidden bg-background pb-20 font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <FadeInView as="header" className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="relative mx-auto max-w-7xl space-y-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-primary to-primary/80" />
            {dict?.home?.hero?.badge || "Start Scaling Smarter"}
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tighter md:text-7xl">
            <span>{dict?.home?.hero?.title1 || "Smarter Decisions for"}</span> <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {dict?.home?.hero?.title2 || "Better Profits"}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.home?.hero?.description || "The high-end architect for your e-commerce financial health."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-auto w-full rounded-lg bg-gradient-to-br from-primary to-accent px-8 py-4 font-bold text-primary-foreground shadow-xl shadow-primary/12 transition-all duration-300 hover:scale-105 active:scale-95 sm:w-auto"
            >
              <Link href={`/${lang}/register`}>
                {dict?.home?.hero?.cta1 || "Get Started Free"}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex h-auto w-full items-center justify-center gap-2 rounded-lg border-border/30 px-8 py-4 font-semibold sm:w-auto"
            >
              <Link href="#features">
                {dict?.home?.hero?.cta2 || "Explore Features"}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="-mt-10 px-6 md:-mt-20">
        <div className="group relative mx-auto max-w-6xl">
          <div className="absolute -inset-4 rounded-[3.5rem] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 blur-3xl transition-opacity group-hover:opacity-50" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-card p-2 shadow-2xl">
            <div className="relative h-64 overflow-hidden rounded-[2rem] bg-gradient-to-br from-card via-muted/60 to-primary sm:h-80 md:h-[30rem]">
              <Image
                src="/arba7i-hero.jpg"
                alt="Hand holding cash"
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
            </div>
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {dict?.home?.features?.title || "Precision Features"}
          </h2>
          <p className="text-lg text-muted-foreground">
             {dict?.home?.features?.subtitle || "Designed for scale, architected for simplicity."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {precisionFeatures.map((feature, index) => (
            <FadeInView key={`precision-feature-${index}`} delay={index * 60}>
              <Card className="group rounded-2xl border-0 bg-muted/40 transition-all duration-300 hover:bg-card">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            </FadeInView>
          ))}
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:gap-20 xl:grid-cols-2">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
                {dict?.home?.workflow?.eyebrow || "The Workflow"}
              </span>
              <h2 className="mb-10 text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                {dict?.home?.workflow?.title1 || "From Setup to"} <br />
                <span className="text-primary">{dict?.home?.workflow?.title2 || "Optimization."}</span>
              </h2>

              <div className="space-y-8 md:space-y-10">
                {[
                  [
                    dict?.home?.workflow?.step1Title || "Connect",
                    dict?.home?.workflow?.step1Body || "Plug in your stores, warehouses, and carriers in under 5 minutes with our native API connectors.",
                  ],
                  [
                    dict?.home?.workflow?.step2Title || "Monitor",
                    dict?.home?.workflow?.step2Body || "Watch real-time data flow through your command center. Identify peaks and troughs instantly.",
                  ],
                  [
                    dict?.home?.workflow?.step3Title || "Optimize",
                    dict?.home?.workflow?.step3Body || "Let AI suggest shipping routes and inventory reorders to maximize your net profit margins.",
                  ],
                ].map(([title, body], index) => (
                  <div key={`workflow-step-${index}`} className="flex items-start gap-4 sm:gap-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-sm font-bold text-primary-foreground sm:h-11 sm:w-11">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="mb-2 text-lg font-bold sm:text-xl">{title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md xl:max-w-none">
              <div className="flex aspect-square items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-transparent p-6 sm:p-8 md:p-12">
                <div className="relative h-full w-full rounded-3xl border border-border/20 bg-card p-5 shadow-2xl sm:p-6 md:p-8">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="h-2 w-1/3 rounded bg-muted" />
                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-full animate-pulse rounded-2xl bg-muted" />
                    <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-muted" />
                    <div className="flex h-12 items-center rounded-2xl border border-primary/20 bg-primary/5 px-4">
                      <div className="h-2 w-full rounded bg-primary/40" />
                    </div>
                  </div>
                  <div className="mt-12 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-dashed border-primary/20">
                      <Rocket className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="overflow-hidden px-6 py-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-foreground p-8 text-background md:p-20">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,_rgba(107,56,212,0.15)_0%,_transparent_70%)]" />
          <div className="relative z-10 grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
                {dict?.home?.radar?.eyebrow || "AI Shield"}
              </div>
              <h2 className="text-4xl font-extrabold leading-[1.1] md:text-5xl">
                {dict?.home?.radar?.title || "Profit Leak Radar"}
              </h2>
              <p className="text-lg text-background/70">
                {dict?.home?.radar?.description || "Our proprietary radar technology scans every transaction, shipping invoice, and return to find hidden losses and recovered revenue automatically."}
              </p>
              <ul className="space-y-4 text-background/80">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {dict?.home?.radar?.point1 || "Detect shipping overcharges in seconds"}
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {dict?.home?.radar?.point2 || "Identify low-margin inventory bundles"}
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {dict?.home?.radar?.point3 || "Automatic return fraud prevention"}
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-primary/20 md:h-80 md:w-80">
                <div className="absolute inset-0 scale-110 rounded-full border-2 border-primary/10" />
                <div className="absolute inset-0 scale-125 rounded-full border-2 border-primary/5" />
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_var(--color-primary)]" />
                <div className="absolute left-1/2 top-1/2 h-[2px] w-1/2 origin-left -rotate-45 bg-gradient-to-r from-primary to-transparent" />
                <div className="absolute right-10 top-10 h-3 w-3 animate-ping rounded-full bg-destructive" />
                <div className="absolute bottom-20 left-10 h-2 w-2 rounded-full bg-accent opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Card className="group overflow-hidden rounded-[2.5rem] border border-border/20 bg-card lg:col-span-7">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="flex h-full flex-col">
                <div className="mb-10">
                  <h3 className="mb-2 text-2xl font-bold">{dict?.home?.bento?.carriersTitle || "Carrier Ecosystem"}</h3>
                  <p className="text-muted-foreground">
                    {dict?.home?.bento?.carriersDescription || "Connect and compare rates from Yalidine, ZR Express, and others instantly."}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 py-4 sm:gap-6">
                  {["Yalidine", "ZR Express", "Noest"].map((carrier, index) => (
                    <div
                      key={`carrier-${index}`}
                      className="flex min-w-[120px] flex-1 justify-center rounded-2xl border border-transparent bg-muted/50 px-6 py-4 transition-all hover:border-primary/20 sm:flex-none sm:px-8"
                    >
                      <span className="text-xl font-black italic text-muted-foreground">
                        {carrier}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-10">
                  <Card className="rounded-2xl border-0 bg-primary/5 shadow-none">
                    <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="mb-1 text-sm font-bold text-primary">
                          {dict?.home?.bento?.savingsLabel || "Total Savings This Month"}
                        </p>
                        <p className="text-3xl font-extrabold">44,500 DZD</p>
                      </div>
                      <TrendingUp className="h-10 w-10 text-primary/40" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group rounded-[2.5rem] border-0 bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-2xl shadow-primary/20 lg:col-span-5">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="flex h-full flex-col">
                <div className="mb-10">
                  <h3 className="mb-2 text-2xl font-bold">{dict?.home?.bento?.profitTitle || "Net Profit Reality"}</h3>
                  <p className="opacity-80">
                    {dict?.home?.bento?.profitDescription || "Stop looking at revenue. Start looking at what you actually keep."}
                  </p>
                </div>

                <div className="mb-8 flex h-40 flex-grow items-end gap-3 sm:h-44 md:h-48">
                  <div className="h-[40%] w-full rounded-t-lg bg-white/20" />
                  <div className="h-[60%] w-full rounded-t-lg bg-white/20" />
                  <div className="relative h-[85%] w-full rounded-t-lg bg-white/40">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-white px-2 py-1 text-[10px] font-bold text-primary shadow-lg">
                      +12%
                    </div>
                  </div>
                  <div className="h-[50%] w-full rounded-t-lg bg-white/20" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 py-3">
                    <span className="font-medium">{dict?.home?.bento?.grossRevenue || "Gross Revenue"}</span>
                    <span className="font-bold">450,000 DZD</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 py-3">
                    <span className="font-medium">{dict?.home?.bento?.totalExpenses || "Total Expenses"}</span>
                    <span className="font-bold">-124,000 DZD</span>
                  </div>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-xl font-bold">{dict?.home?.bento?.netMargin || "Net Margin"}</span>
                    <span className="text-xl font-black">28.4%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
              {dict?.home?.audience?.eyebrow || "Who It's For"}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {dict?.home?.audience?.title || "Built for merchants at every stage."}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict?.home?.audience?.subtitle ||
                "Whether you are starting small or operating at scale, the platform stays practical and clear."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {audienceSegments.map((segment, index) => (
              <FadeInView key={`audience-segment-${index}`} delay={index * 60}>
                <Card className="group rounded-2xl border-0 bg-muted/40 transition-all duration-300 hover:bg-card">
                  <CardContent className="p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                      <segment.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{segment.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {segment.body}
                    </p>
                  </CardContent>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">
            {dict?.home?.beforeAfter?.eyebrow || "Before / After"}
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {dict?.home?.beforeAfter?.title || "See the difference in daily operations."}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict?.home?.beforeAfter?.subtitle ||
              "The value is not abstract. It changes how the business runs every day."}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="rounded-[2.5rem] border border-border/20 bg-card shadow-sm">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8 inline-flex rounded-full border border-primary/15 bg-background/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                {dict?.home?.beforeAfter?.beforeLabel || "Before Arba7i"}
              </div>
              <div className="space-y-4">
                {beforeItems.map((item, index) => (
                  <FadeInView key={`before-item-${index}`} delay={index * 60}>
                    <Card className="rounded-2xl border border-border/20 bg-primary/7 shadow-none">
                      <CardContent className="flex gap-4 p-6">
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {item}
                        </p>
                      </CardContent>
                    </Card>
                  </FadeInView>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border border-primary/15 bg-gradient-to-br from-primary to-accent shadow-xl shadow-primary/10">
            <CardContent className="p-8 md:p-10">
              <div className="mb-8 inline-flex rounded-full border border-border/20 bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground">
                {dict?.home?.beforeAfter?.afterLabel || "After Arba7i"}
              </div>
              <div className="space-y-4">
                {afterItems.map((item, index) => (
                  <FadeInView key={`after-item-${index}`} delay={index * 60}>
                    <Card className="rounded-2xl border border-primary/10 bg-card shadow-none">
                      <CardContent className="flex gap-4 p-5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-sm leading-relaxed text-foreground/80">
                          {item}
                        </p>
                      </CardContent>
                    </Card>
                  </FadeInView>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInView>

      <FadeInView>
        <PricingSection dict={dict} />
      </FadeInView>

      <FadeInView as="section" className="relative overflow-hidden px-6 pt-24">
        <div className="relative mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-r from-primary via-accent to-primary p-12 text-center text-primary-foreground md:p-24">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-black tracking-tighter md:text-7xl">
                {dict?.home?.finalCta?.title || "Start Growing Today"}
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                {dict?.home?.finalCta?.description || "Join thousands of merchants who stopped guessing and started knowing their true net profit."}
              </p>
              <div className="flex flex-col items-center justify-center gap-6 pt-6 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-auto rounded-2xl border border-transparent bg-background px-10 py-5 text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <Link href={`/${lang}/register`}>
                    {dict?.home?.finalCta?.cta1 || "Create My Account"}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 font-bold text-primary-foreground underline decoration-white/30 underline-offset-8 decoration-2 transition-all hover:decoration-white"
                >
                  <Link href={`/${lang}/contact`}>
                    {dict?.home?.finalCta?.cta2 || "Talk to a specialist"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </div>
  );
}
