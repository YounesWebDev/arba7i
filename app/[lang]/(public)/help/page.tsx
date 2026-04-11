import Link from "next/link";
import {
  CircleHelp,
  Code2,
  CreditCard,
  Headset,
  Mail,
  Rocket,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { FadeInView } from "@/components/public/fade-in-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function HelpPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const categories = [
    {
      icon: Rocket,
      title: dict?.helpPage?.categories?.item1Title || "Getting Started",
      body:
        dict?.helpPage?.categories?.item1Body ||
        "Set up your workspace, invite teammates, and connect the essentials.",
    },
    {
      icon: CreditCard,
      title: dict?.helpPage?.categories?.item2Title || "Billing",
      body:
        dict?.helpPage?.categories?.item2Body ||
        "Plans, invoices, payment methods, and account billing changes.",
    },
    {
      icon: Truck,
      title: dict?.helpPage?.categories?.item3Title || "Shipping",
      body:
        dict?.helpPage?.categories?.item3Body ||
        "Carrier setup, handoff flow, and shipment tracking guidance.",
    },
    {
      icon: ShieldCheck,
      title: dict?.helpPage?.categories?.item4Title || "Account",
      body:
        dict?.helpPage?.categories?.item4Body ||
        "Security settings, access management, and account protection.",
    },
    {
      icon: Code2,
      title: dict?.helpPage?.categories?.item5Title || "Integrations",
      body:
        dict?.helpPage?.categories?.item5Body ||
        "Platform connections, tracking setup, and technical references.",
    },
  ];

  const faqs = [
    {
      q: dict?.helpPage?.faq?.q1 || "How do I set up my store for the first time?",
      a:
        dict?.helpPage?.faq?.a1 ||
        "Create your workspace, add your store details, and connect delivery partners before processing your first orders.",
    },
    {
      q: dict?.helpPage?.faq?.q2 || "Can I change my plan later?",
      a:
        dict?.helpPage?.faq?.a2 ||
        "Yes. You can upgrade when your operation grows or adjust your billing cycle from your account settings.",
    },
    {
      q: dict?.helpPage?.faq?.q3 || "Where can I manage team access?",
      a:
        dict?.helpPage?.faq?.a3 ||
        "Team members, permissions, and access roles are managed from the administration area inside your workspace.",
    },
    {
      q: dict?.helpPage?.faq?.q4 || "How do I contact support?",
      a:
        dict?.helpPage?.faq?.a4 ||
        "Use live chat, email support, or the contact page depending on the urgency and type of request.",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-background pb-20 font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <FadeInView as="section" className="relative overflow-hidden px-6 pb-20 pt-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-primary to-primary/80" />
            {dict?.helpPage?.hero?.eyebrow || "Help Center"}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
            {dict?.helpPage?.hero?.title || "How can we help you?"}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.helpPage?.hero?.description ||
              "Find setup guidance, operational answers, and direct support paths for the Arba7i platform."}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="inline-flex h-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-accent px-8 py-4 font-bold text-primary-foreground shadow-xl shadow-primary/12 transition-all hover:scale-105 active:scale-95"
            >
              <Link href={`/${lang}/contact`}>
                <Headset className="h-4 w-4" />
                {dict?.helpPage?.support?.cta1 || "Contact support"}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="inline-flex h-auto items-center justify-center gap-2 rounded-2xl border-border/20 px-8 py-4 font-bold text-primary"
            >
              <a href="mailto:webdevyns@gmail.com">
                <Mail className="h-4 w-4" />
                {dict?.helpPage?.support?.cta2 || "Email support"}
              </a>
            </Button>
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {dict?.helpPage?.categories?.item1Title || "Getting started"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dict?.helpPage?.categories?.item1Body ||
              "Set up your account, invite your team, and start using the platform step by step."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <FadeInView key={`category-${index}`} delay={index * 60}>
              <Card className="group rounded-[2rem] border-0 bg-muted/40 transition-all duration-300 hover:bg-card">
                <CardContent className="p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {category.body}
                </p>
                </CardContent>
              </Card>
            </FadeInView>
          ))}
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              {dict?.helpPage?.faq?.title || "Frequently asked questions"}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {dict?.helpPage?.faq?.subtitle ||
                "Direct answers to the questions merchants usually ask when getting started or scaling operations."}
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <FadeInView key={`help-faq-${index}`} delay={index * 60}>
                <Card className="rounded-2xl border-border/20 bg-card shadow-sm">
                  <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <CircleHelp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{item.q}</h3>
                      <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2.5rem] border border-border/20 bg-card p-8 shadow-sm md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                {dict?.helpPage?.support?.title || "Still need help? Talk to our team."}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {dict?.helpPage?.support?.description ||
                  "If the answer is not in the help center, reach out directly and we will point you to the right next step."}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="inline-flex h-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Link href={`/${lang}/contact`}>
                  <Headset className="h-4 w-4" />
                  {dict?.helpPage?.support?.cta1 || "Contact support"}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="inline-flex h-auto items-center justify-center gap-2 rounded-2xl border-border/20 px-8 py-4 font-bold text-primary"
              >
                <a href="mailto:webdevyns@gmail.com">
                  {dict?.helpPage?.support?.cta2 || "Email support"}
                </a>
              </Button>
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
                {dict?.helpPage?.finalCta?.title || "Ready to move faster with better support?"}
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                {dict?.helpPage?.finalCta?.description ||
                  "Start with a clearer operating system and keep direct help close when your business needs it."}
              </p>
              <div className="flex flex-col items-center justify-center gap-6 pt-6 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-auto rounded-2xl border border-transparent bg-background px-10 py-5 text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  <Link href={`/${lang}/register`}>
                    {dict?.helpPage?.finalCta?.cta1 || "Start free"}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 font-bold text-primary-foreground underline decoration-white/30 underline-offset-8 decoration-2 transition-all hover:decoration-white"
                >
                  <Link href={`/${lang}/pricing`}>
                    {dict?.helpPage?.finalCta?.cta2 || "View pricing"}
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
