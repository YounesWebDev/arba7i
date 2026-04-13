// --- components/public/footer.tsx ---
import { 
  Sparkles, CreditCard, Building, 
  Mail, ShieldCheck, FileText, HelpCircle 
} from "lucide-react";
import { LanguageSwitcher } from "@/components/public/language-switcher";

type FooterDict = {
  navbar?: Record<string, string | undefined>;
  footer?: Record<string, string | undefined>;
};

export function PublicFooter({ lang, dict }: { lang: string; dict: FooterDict }) {
  
  // Dynamic links reading from the dictionary
  const footerSections = [
    {
      title: dict?.footer?.platform || "Platform",
      links: [
        { title: dict?.navbar?.features || "Features", href: "/features", icon: Sparkles },
        { title: dict?.navbar?.pricing || "Pricing", href: "/pricing", icon: CreditCard },
      ],
    },
    {
      title: dict?.footer?.company || "Company",
      links: [
        { title: dict?.navbar?.about || "About Us", href: "/about", icon: Building },
        { title: dict?.navbar?.contact || "Contact", href: "/contact", icon: Mail },
      ],
    },
    {
      title: dict?.footer?.legal || "Legal",
      links: [
        { title: dict?.footer?.privacy || "Privacy Policy", href: "/privacy", icon: ShieldCheck },
        { title: dict?.footer?.terms || "Terms of Service", href: "/terms", icon: FileText },
      ],
    },
    {
      title: dict?.footer?.support || "Support",
      links: [
        { title: dict?.footer?.help || "Help / FAQ", href: "/help", icon: HelpCircle },
      ],
    },
  ];

  return (
    <footer className="mt-20 w-full rounded-t-[3rem] bg-muted/30">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-14 text-sm leading-relaxed sm:grid-cols-2 sm:px-6 md:grid-cols-4 md:px-10 lg:grid-cols-6 lg:px-20">
        
        <div className="space-y-6 sm:col-span-2">
          <a href={`/${lang}`} className="text-xl font-black tracking-tighter text-foreground">
            Arba7i
          </a>
          <p className="max-w-xs text-muted-foreground">
            {dict?.footer?.description || "The fluid architect for e-commerce financial intelligence."}
          </p>
          <LanguageSwitcher lang={lang} className="w-fit" />
        </div>

        {footerSections.map((section, index) => (
          <div key={`footer-section-${index}`} className="space-y-4">
            <h3 className="text-base font-bold text-foreground">{section.title}</h3>
            <ul className="space-y-3 text-muted-foreground">
              {section.links.map((link, linkIndex) => (
                <li key={`footer-link-${index}-${linkIndex}`}>
                  <a 
                    href={`/${lang}${link.href}`} 
                    className="flex items-center gap-2 transition-all hover:text-primary group"
                  >
                    <link.icon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-border/50 px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 md:flex-row md:px-10 md:text-left lg:px-20">
        <p>&copy; {new Date().getFullYear()} Arba7i. {dict?.footer?.rights || "All rights reserved."}</p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-end md:gap-6">
          <span>{dict?.footer?.status || "Status: Fully Operational"}</span>
          <span>v2.4.0</span>
        </div>
      </div>
    </footer>
  );
}
