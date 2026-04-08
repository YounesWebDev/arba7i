import Link from "next/link";
import { ArrowRight, Building2, Headset, Mail, Send, Share2 } from "lucide-react";
import { FadeInView } from "@/components/public/fade-in-view";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const channels = [
    {
      icon: Mail,
      title: dict?.contactPage?.channels?.salesTitle || "Sales",
      body:
        dict?.contactPage?.channels?.salesBody ||
        "Talk to us about the right plan and how the platform fits your operation.",
      value: "webdevyns@gmail.com",
    },
    {
      icon: Headset,
      title: dict?.contactPage?.channels?.supportTitle || "Support",
      body:
        dict?.contactPage?.channels?.supportBody ||
        "Get help with setup, workflows, or any issue affecting daily work.",
      value: "webdevyns@gmail.com",
    },
    {
      icon: Share2,
      title: dict?.contactPage?.channels?.partnerTitle || "Partnerships",
      body:
        dict?.contactPage?.channels?.partnerBody ||
        "Reach out for strategic partnerships, integrations, or regional collaboration.",
      value: "webdevyns@gmail.com",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-background pb-20 font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <FadeInView as="section" className="relative overflow-hidden px-6 pb-20 pt-32 md:pt-44">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-primary to-primary/80" />
            {dict?.contactPage?.hero?.eyebrow || "Contact"}
          </span>
          <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
            {dict?.contactPage?.hero?.title1 || "We are here to help your"}
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {dict?.contactPage?.hero?.title2 || "business scale"}
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {dict?.contactPage?.hero?.description ||
              "Whether you have a product question or need direct help, the team is available."}
          </p>
        </div>
      </FadeInView>

      <FadeInView as="section" className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((channel, index) => (
            <FadeInView key={`channel-${index}`} delay={index * 60}>
              <div className="group rounded-2xl bg-muted/40 p-10 text-center transition-all duration-300 hover:bg-card">
                <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:scale-110">
                  <channel.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{channel.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{channel.body}</p>
                <a href={`mailto:${channel.value}`} className="mt-6 inline-block font-bold text-primary">
                  {channel.value}
                </a>
              </div>
            </FadeInView>
          ))}
        </div>
      </FadeInView>

      <FadeInView as="section" className="bg-muted/40 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[2.5rem] border border-border/20 bg-card p-8 shadow-sm md:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {dict?.contactPage?.form?.title || "Send us a message"}
            </h2>
            <form className="mt-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {dict?.contactPage?.form?.nameLabel || "Full Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={dict?.contactPage?.form?.namePlaceholder || "Your name"}
                    className="w-full rounded-2xl border border-border/20 bg-muted/40 px-4 py-4 outline-none transition-all focus:border-primary/30"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {dict?.contactPage?.form?.emailLabel || "Business Email"}
                  </label>
                  <input
                    type="email"
                    placeholder={dict?.contactPage?.form?.emailPlaceholder || "webdevyns@gmail.com"}
                    className="w-full rounded-2xl border border-border/20 bg-muted/40 px-4 py-4 outline-none transition-all focus:border-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {dict?.contactPage?.form?.subjectLabel || "Subject"}
                </label>
                <input
                  type="text"
                  placeholder={dict?.contactPage?.form?.subjectPlaceholder || "How can we help?"}
                  className="w-full rounded-2xl border border-border/20 bg-muted/40 px-4 py-4 outline-none transition-all focus:border-primary/30"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {dict?.contactPage?.form?.messageLabel || "Message"}
                </label>
                <textarea
                  rows={6}
                  placeholder={dict?.contactPage?.form?.messagePlaceholder || "Tell us what you need"}
                  className="w-full rounded-2xl border border-border/20 bg-muted/40 px-4 py-4 outline-none transition-all focus:border-primary/30"
                />
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-primary to-primary/80 px-8 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20"
              >
                {dict?.contactPage?.form?.submit || "Send Message"}
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2.5rem] border border-border/20 bg-card p-8 shadow-sm">
              <h2 className="text-3xl font-extrabold tracking-tight">
                {dict?.contactPage?.help?.title || "Looking for quick answers?"}
              </h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {dict?.contactPage?.help?.description ||
                  "For common questions about setup, billing, and workflows, our help center usually gets you there faster."}
              </p>
              <Link
                href={`/${lang}/help`}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-border/20 px-6 py-4 font-bold text-primary transition-all hover:bg-muted"
              >
                {dict?.contactPage?.help?.cta || "Visit the help center"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[2.5rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground shadow-2xl shadow-primary/20">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-2xl font-bold">
                {dict?.contactPage?.commitment?.title || "Our commitment"}
              </h3>
              <p className="mt-4 text-primary-foreground/85">
                {dict?.contactPage?.commitment?.body ||
                  "We aim to respond to business inquiries within one working day."}
              </p>
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
                {dict?.contactPage?.commitment?.title || "Our commitment"}
              </h2>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed opacity-90">
                {dict?.contactPage?.commitment?.body ||
                  "We aim to respond to business inquiries within one working day."}
              </p>
              <div className="flex flex-col items-center justify-center gap-6 pt-6 sm:flex-row">
                <Link
                  href={`/${lang}/help`}
                  className="rounded-2xl border border-transparent bg-background px-10 py-5 text-lg font-black text-primary shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                  {dict?.contactPage?.help?.cta || "Visit the help center"}
                </Link>
                <a
                  href="mailto:webdevyns@gmail.com"
                  className="font-bold text-primary-foreground underline decoration-white/30 underline-offset-8 decoration-2 transition-all hover:decoration-white"
                >
                  webdevyns@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </FadeInView>
    </div>
  );
}
