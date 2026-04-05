import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CircleAlert,
  CreditCard,
  Gavel,
  LogOut,
  UserRound,
} from "lucide-react";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const sections = [
    {
      id: "definitions",
      icon: BookOpen,
      title: dict?.termsPage?.sections?.section1Title || "Definitions",
      body1:
        dict?.termsPage?.sections?.section1Body1 ||
        "These terms govern access to and use of the Arba7i platform, including associated web interfaces and operational tools.",
      body2:
        dict?.termsPage?.sections?.section1Body2 ||
        "References to the platform, user, and services should be interpreted in the context of Arba7i's merchant operations environment.",
    },
    {
      id: "accounts",
      icon: UserRound,
      title: dict?.termsPage?.sections?.section2Title || "User accounts",
      body1:
        dict?.termsPage?.sections?.section2Body1 ||
        "You are responsible for maintaining accurate account information and protecting access credentials for your workspace.",
      body2:
        dict?.termsPage?.sections?.section2Body2 ||
        "Unauthorized sharing of credentials or access abuse may result in suspension or termination of service.",
      note:
        dict?.termsPage?.sections?.section2Note ||
        "We may request business verification information when needed to protect the platform and comply with legal obligations.",
    },
    {
      id: "fees",
      icon: CreditCard,
      title: dict?.termsPage?.sections?.section3Title || "Fees and payment",
      body1:
        dict?.termsPage?.sections?.section3Body1 ||
        "Paid plans are billed according to the selected cycle. Taxes, payment provider conditions, and pricing changes may apply based on your region and plan.",
      bullets: [
        dict?.termsPage?.sections?.section3Point1 || "Fees are billed in advance according to your selected plan.",
        dict?.termsPage?.sections?.section3Point2 || "Plan pricing may change with reasonable prior notice.",
        dict?.termsPage?.sections?.section3Point3 || "Renewal continues until cancellation under the applicable billing policy.",
      ],
    },
    {
      id: "property",
      icon: Gavel,
      title: dict?.termsPage?.sections?.section4Title || "Intellectual property",
      body1:
        dict?.termsPage?.sections?.section4Body1 ||
        "The Arba7i service, design system, software, and brand assets remain the property of Arba7i and its licensors.",
      body2:
        dict?.termsPage?.sections?.section4Body2 ||
        "Your business data remains yours. Our software, interfaces, and supporting materials remain ours.",
      quote:
        dict?.termsPage?.sections?.section4Quote ||
        "Your data stays yours. The platform stays ours. The value comes from how they work together.",
    },
    {
      id: "termination",
      icon: LogOut,
      title: dict?.termsPage?.sections?.section5Title || "Termination",
      body1:
        dict?.termsPage?.sections?.section5Body1 ||
        "We may suspend or terminate access if these terms are breached or if continued access creates legal or operational risk.",
      body2:
        dict?.termsPage?.sections?.section5Body2 ||
        "You may stop using the service or cancel your account through the available account management process.",
    },
    {
      id: "disclaimers",
      icon: CircleAlert,
      title: dict?.termsPage?.sections?.section6Title || "Disclaimers",
      body1:
        dict?.termsPage?.sections?.section6Body1 ||
        "The service is provided on an ongoing best-effort basis. Availability may be affected by maintenance, third-party dependencies, or force majeure events.",
      body2:
        dict?.termsPage?.sections?.section6Body2 ||
        "Merchants remain responsible for business decisions, legal compliance, and operational outcomes derived from their own use of the platform.",
    },
  ];

  return (
    <div className="bg-background text-foreground">
      <section className="px-6 pb-20 pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl">
            <span className="mb-6 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {dict?.termsPage?.hero?.eyebrow || "Terms"}
            </span>
            <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl">
              {dict?.termsPage?.hero?.title || "Terms and Conditions"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {dict?.termsPage?.hero?.description ||
                "Please read these terms carefully before using the Arba7i platform to manage business operations."}
            </p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {dict?.termsPage?.hero?.updated || "Last updated: April 5, 2026"}
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row">
            <aside className="hidden lg:block lg:w-1/4">
              <div className="sticky top-32 rounded-[2rem] bg-card p-8 shadow-sm">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {dict?.termsPage?.toc?.title || "Navigation"}
                </h2>
                <nav className="mt-6 space-y-2">
                  {sections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                    >
                      {index + 1}. {section.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-10 rounded-[2rem] bg-primary/10 p-6">
                  <h3 className="text-lg font-bold text-primary">
                    {dict?.termsPage?.toc?.cardTitle || "Need clarification?"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {dict?.termsPage?.toc?.cardBody ||
                      "Our team can help explain how these terms apply to your use of the platform."}
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className="mt-5 inline-flex items-center gap-2 font-bold text-primary"
                  >
                    {dict?.termsPage?.toc?.cardCta || "Contact support"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </aside>

            <article className="flex-1 space-y-16">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/40 text-primary">
                      <section.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight">
                      {index + 1}. {section.title}
                    </h2>
                  </div>

                  <div className="rounded-[2rem] bg-card p-8 shadow-sm md:p-10">
                    <div className="space-y-4 leading-relaxed text-muted-foreground">
                      <p>{section.body1}</p>
                      {section.body2 ? <p>{section.body2}</p> : null}
                    </div>

                    {section.note ? (
                      <div className="mt-6 rounded-2xl bg-primary/10 p-5 text-sm leading-relaxed text-foreground">
                        {section.note}
                      </div>
                    ) : null}

                    {section.bullets ? (
                      <div className="mt-6 space-y-3">
                        {section.bullets.map((item) => (
                          <div key={item} className="flex gap-3">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <p className="text-muted-foreground">{item}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    {section.quote ? (
                      <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-center text-xl font-bold text-primary-foreground">
                        {section.quote}
                      </div>
                    ) : null}
                  </div>
                </section>
              ))}

              <section className="rounded-[3rem] bg-gradient-to-br from-primary to-accent p-10 text-center text-primary-foreground shadow-2xl shadow-primary/20 md:p-16">
                <h2 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
                  {dict?.termsPage?.finalCta?.title || "Have questions about these terms?"}
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/85">
                  {dict?.termsPage?.finalCta?.description ||
                    "Reach out if you need help understanding responsibilities, billing terms, or account policies."}
                </p>
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <Link
                    href={`/${lang}/contact`}
                    className="rounded-2xl bg-background px-8 py-4 font-bold text-primary"
                  >
                    {dict?.termsPage?.finalCta?.cta1 || "Contact support"}
                  </Link>
                  <Link
                    href={`/${lang}/privacy`}
                    className="rounded-2xl border border-white/20 px-8 py-4 font-bold text-primary-foreground"
                  >
                    {dict?.termsPage?.finalCta?.cta2 || "Read privacy policy"}
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
