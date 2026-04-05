import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  Code2,
  CreditCard,
  Headset,
  Rocket,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function HelpPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const categories = [
    {
      icon: Rocket,
      title: dict?.helpPage?.categories?.item1Title || "Getting Started",
      body:
        dict?.helpPage?.categories?.item1Body ||
        "Set up your workspace, invite teammates, and connect the essentials.",
      links: [
        dict?.helpPage?.categories?.item1Link1 || "Create your workspace",
        dict?.helpPage?.categories?.item1Link2 || "Invite team members",
      ],
    },
    {
      icon: CreditCard,
      title: dict?.helpPage?.categories?.item2Title || "Billing",
      body:
        dict?.helpPage?.categories?.item2Body ||
        "Plans, invoices, payment methods, and account billing changes.",
      meta: dict?.helpPage?.categories?.item2Meta || "12 articles",
    },
    {
      icon: Truck,
      title: dict?.helpPage?.categories?.item3Title || "Shipping",
      body:
        dict?.helpPage?.categories?.item3Body ||
        "Carrier setup, handoff flow, and shipment tracking guidance.",
      meta: dict?.helpPage?.categories?.item3Meta || "8 articles",
    },
    {
      icon: ShieldCheck,
      title: dict?.helpPage?.categories?.item4Title || "Account",
      body:
        dict?.helpPage?.categories?.item4Body ||
        "Security settings, access management, and account protection.",
      meta: dict?.helpPage?.categories?.item4Meta || "15 articles",
    },
    {
      icon: Code2,
      title: dict?.helpPage?.categories?.item5Title || "Integrations",
      body:
        dict?.helpPage?.categories?.item5Body ||
        "Platform connections, tracking setup, and technical references.",
      meta: dict?.helpPage?.categories?.item5Meta || "10 articles",
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
    <div className="bg-background text-foreground">
      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            {dict?.helpPage?.hero?.eyebrow || "Help Center"}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
            {dict?.helpPage?.hero?.title || "How can we help you?"}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.helpPage?.hero?.description ||
              "Find setup guidance, operational answers, and direct support paths for the Arba7i platform."}
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="group relative">
              <Search className="pointer-events-none absolute inset-y-0 left-5 my-auto h-5 w-5 text-primary transition-transform group-focus-within:scale-110" />
              <input
                type="text"
                placeholder={
                  dict?.helpPage?.hero?.searchPlaceholder ||
                  "Search for articles, guides, and answers..."
                }
                className="w-full rounded-[1.75rem] border border-border/20 bg-card py-5 pl-14 pr-5 text-base shadow-xl shadow-primary/5 outline-none transition-all placeholder:text-muted-foreground focus:border-primary/30"
              />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="font-medium text-muted-foreground">
              {dict?.helpPage?.hero?.popularLabel || "Popular:"}
            </span>
            {[
              dict?.helpPage?.hero?.popular1 || "Account setup",
              dict?.helpPage?.hero?.popular2 || "Billing cycle",
              dict?.helpPage?.hero?.popular3 || "Carrier connection",
            ].map((item) => (
              <span key={item} className="font-semibold text-primary">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[2rem] border border-border/20 bg-card p-8 shadow-sm transition-all hover:border-border/30 hover:shadow-lg md:col-span-2">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Rocket className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight">
              {categories[0].title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {categories[0].body}
            </p>
            <div className="mt-8 space-y-3">
              {categories[0].links?.map((link) => (
                <div key={link} className="flex items-center gap-2 font-semibold text-primary">
                  <ArrowRight className="h-4 w-4" />
                  <span>{link}</span>
                </div>
              ))}
            </div>
          </div>

          {categories.slice(1).map((category) => (
            <div
              key={category.title}
              className="rounded-[2rem] bg-muted/40 p-8 transition-all duration-300 hover:bg-card"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{category.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {category.body}
              </p>
              <div className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {category.meta}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/40 px-6 py-24">
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
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-border/20 bg-card p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                    <CircleHelp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{item.q}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
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
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20"
              >
                <Headset className="h-4 w-4" />
                {dict?.helpPage?.support?.cta1 || "Contact support"}
              </Link>
              <a
                href="mailto:support@arba7i.com"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/20 px-8 py-4 font-bold text-primary transition-all hover:bg-muted"
              >
                {dict?.helpPage?.support?.cta2 || "Email support"}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-br from-primary to-accent p-12 text-center text-primary-foreground shadow-2xl shadow-primary/20 md:p-20">
          <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
            {dict?.helpPage?.finalCta?.title || "Ready to move faster with better support?"}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/85">
            {dict?.helpPage?.finalCta?.description ||
              "Start with a clearer operating system and keep direct help close when your business needs it."}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${lang}/register`}
              className="rounded-2xl bg-background px-8 py-4 font-bold text-primary"
            >
              {dict?.helpPage?.finalCta?.cta1 || "Start free"}
            </Link>
            <Link
              href={`/${lang}/pricing`}
              className="rounded-2xl border border-white/20 px-8 py-4 font-bold text-primary-foreground"
            >
              {dict?.helpPage?.finalCta?.cta2 || "View pricing"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
