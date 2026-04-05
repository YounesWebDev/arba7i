import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Eye,
  Lock,
  Mail,
  Shield,
  SquarePen,
  Trash2,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const sections = [
    {
      id: "data-collection",
      number: "01",
      title: dict?.privacyPage?.sections?.section1Title || "Data collection",
      body1:
        dict?.privacyPage?.sections?.section1Body1 ||
        "We collect the information you provide directly when creating an account, contacting us, or using core platform workflows.",
      body2:
        dict?.privacyPage?.sections?.section1Body2 ||
        "This can include business contact details, operational activity, and technical usage information needed to run the service reliably.",
      bullets: [
        dict?.privacyPage?.sections?.section1Point1 || "Business identity and contact details",
        dict?.privacyPage?.sections?.section1Point2 || "Store, order, and shipment activity",
        dict?.privacyPage?.sections?.section1Point3 || "Device, browser, and security logs",
      ],
    },
    {
      id: "how-we-use",
      number: "02",
      title: dict?.privacyPage?.sections?.section2Title || "How we use data",
      body1:
        dict?.privacyPage?.sections?.section2Body1 ||
        "We use collected information to provide the platform, secure accounts, improve operational workflows, and support merchants effectively.",
      body2:
        dict?.privacyPage?.sections?.section2Body2 ||
        "We do not use merchant operational data to build advertising profiles or sell behavioral data to third parties.",
    },
    {
      id: "data-sharing",
      number: "03",
      title: dict?.privacyPage?.sections?.section3Title || "Data sharing",
      quote:
        dict?.privacyPage?.sections?.section3Quote ||
        "We do not sell your personal or operational data.",
      body1:
        dict?.privacyPage?.sections?.section3Body1 ||
        "We only share data with service providers, legal authorities where required, or trusted partners needed to operate the service under appropriate safeguards.",
    },
    {
      id: "security",
      number: "04",
      title: dict?.privacyPage?.sections?.section4Title || "Security",
      body1:
        dict?.privacyPage?.sections?.section4Body1 ||
        "We use technical and organizational safeguards designed to protect account data, operational records, and access to administrative systems.",
      cards: [
        {
          icon: Lock,
          title: dict?.privacyPage?.sections?.section4Card1Title || "Encrypted transport",
          body:
            dict?.privacyPage?.sections?.section4Card1Body ||
            "Sensitive data is protected in transit and stored using secure infrastructure practices.",
        },
        {
          icon: Shield,
          title: dict?.privacyPage?.sections?.section4Card2Title || "Access monitoring",
          body:
            dict?.privacyPage?.sections?.section4Card2Body ||
            "We monitor critical systems and restrict privileged access to authorized workflows.",
        },
      ],
    },
  ];

  const rights = [
    {
      icon: Eye,
      title: dict?.privacyPage?.rights?.item1Title || "Right to access",
      body:
        dict?.privacyPage?.rights?.item1Body ||
        "Request a copy of the personal data associated with your account.",
    },
    {
      icon: SquarePen,
      title: dict?.privacyPage?.rights?.item2Title || "Right to correction",
      body:
        dict?.privacyPage?.rights?.item2Body ||
        "Update inaccurate or incomplete information held about your business.",
    },
    {
      icon: Trash2,
      title: dict?.privacyPage?.rights?.item3Title || "Right to deletion",
      body:
        dict?.privacyPage?.rights?.item3Body ||
        "Request deletion of your account and associated personal data where applicable.",
    },
    {
      icon: Download,
      title: dict?.privacyPage?.rights?.item4Title || "Data portability",
      body:
        dict?.privacyPage?.rights?.item4Body ||
        "Ask for an export of your data in a structured and usable format.",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="px-6 pb-16 pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {dict?.privacyPage?.hero?.eyebrow || "Privacy"}
            </span>
            <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
              {dict?.privacyPage?.hero?.title || "Privacy Policy"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {dict?.privacyPage?.hero?.description ||
                "Learn how Arba7i collects, uses, protects, and manages data across the platform."}
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {dict?.privacyPage?.hero?.updated || "Last updated: April 5, 2026"}
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row">
            <aside className="lg:w-1/4">
              <div className="top-32 rounded-[2rem] bg-card p-8 shadow-sm lg:sticky">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {dict?.privacyPage?.toc?.title || "Contents"}
                </h2>
                <nav className="mt-6 space-y-3">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-3 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                      {section.title}
                    </a>
                  ))}
                  <a
                    href="#your-rights"
                    className="flex items-center gap-3 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    {dict?.privacyPage?.rights?.title || "Your rights"}
                  </a>
                </nav>
                <div className="mt-10 rounded-2xl bg-muted/40 p-5 text-sm leading-relaxed text-muted-foreground">
                  {dict?.privacyPage?.toc?.note || "Looking for the legal service terms instead?"}
                  <Link href={`/${lang}/terms`} className="mt-2 block font-bold text-primary">
                    {dict?.privacyPage?.toc?.link || "Read Terms and Conditions"}
                  </Link>
                </div>
              </div>
            </aside>

            <article className="flex-1 space-y-16">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <div className="flex gap-5">
                    <span className="text-4xl font-extrabold leading-none text-primary/25">
                      {section.number}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-3xl font-extrabold tracking-tight">{section.title}</h2>
                      <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                        {section.body1 ? <p>{section.body1}</p> : null}
                        {section.body2 ? <p>{section.body2}</p> : null}
                      </div>

                      {section.bullets ? (
                        <div className="mt-6 space-y-3">
                          {section.bullets.map((item) => (
                            <div key={item} className="flex gap-3">
                              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                              <p className="text-muted-foreground">{item}</p>
                            </div>
                          ))}
                        </div>
                      ) : null}

                      {section.quote ? (
                        <div className="mt-6 rounded-[2rem] bg-primary/10 p-6 text-lg font-medium italic text-foreground">
                          {section.quote}
                        </div>
                      ) : null}

                      {section.cards ? (
                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                          {section.cards.map((card) => (
                            <div key={card.title} className="rounded-2xl bg-muted/40 p-6">
                              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                                <card.icon className="h-5 w-5 text-primary" />
                              </div>
                              <h3 className="font-bold">{card.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {card.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </section>
              ))}

              <section id="your-rights" className="scroll-mt-32">
                <div className="flex gap-5">
                  <span className="text-4xl font-extrabold leading-none text-primary/25">05</span>
                  <div className="flex-1">
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      {dict?.privacyPage?.rights?.title || "Your rights"}
                    </h2>
                    <p className="mt-6 leading-relaxed text-muted-foreground">
                      {dict?.privacyPage?.rights?.description ||
                        "Depending on applicable law, you may request access, correction, deletion, or export of your personal data."}
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      {rights.map((item) => (
                        <div key={item.title} className="rounded-2xl bg-muted/40 p-6">
                          <div className="flex gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                              <item.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold">{item.title}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {item.body}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-[2.5rem] bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground shadow-2xl shadow-primary/20 md:p-12">
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                  {dict?.privacyPage?.contact?.title || "Privacy inquiries"}
                </h2>
                <p className="mt-4 max-w-2xl text-primary-foreground/85">
                  {dict?.privacyPage?.contact?.description ||
                    "If you have questions about this policy or how data is handled, contact our team directly."}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="mailto:privacy@arba7i.com"
                    className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-4 font-bold backdrop-blur-sm"
                  >
                    <Mail className="h-5 w-5" />
                    privacy@arba7i.com
                  </a>
                  <Link
                    href={`/${lang}/help`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-4 font-bold text-primary-foreground"
                  >
                    {dict?.privacyPage?.contact?.cta || "Visit help center"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
