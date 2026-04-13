import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type PricingDict = {
  home?: {
    pricing?: Record<string, string | undefined>;
  };
};

export function PricingSection({ dict }: { dict: PricingDict }) {
  const plans = [
    {
      name: dict?.home?.pricing?.welcomeName || "Welcome Offer",
      monthlyPrice: "0",
      annualPrice: "0",
      description:
        dict?.home?.pricing?.welcomeDescription ||
        "A zero-cost starting point to explore the platform and begin organizing your workflow.",
      cta: dict?.home?.pricing?.ctaWelcome || "Start for Free",
      featured: false,
      features: [
        dict?.home?.pricing?.welcomeFeature1 || "Up to 50 orders / month",
        dict?.home?.pricing?.welcomeFeature2 || "1 store and 1 team member",
        dict?.home?.pricing?.welcomeFeature3 || "Order tracking from one dashboard",
        dict?.home?.pricing?.welcomeFeature4 || "Basic stock visibility",
        dict?.home?.pricing?.welcomeFeature5 || "Email support",
      ],
    },
    {
      name: dict?.home?.pricing?.basicName || "Basic",
      monthlyPrice: "1,500",
      annualPrice: "15,000",
      description:
        dict?.home?.pricing?.basicDescription ||
        "The ideal plan to launch your business without unnecessary complexity.",
      cta: dict?.home?.pricing?.ctaStart || "Start Now for Free",
      featured: false,
      features: [
        dict?.home?.pricing?.basicFeature1 || "Up to 500 orders / month",
        dict?.home?.pricing?.basicFeature2 ||
          "Unlimited stores and team members",
        dict?.home?.pricing?.basicFeature3 ||
          "Manage all your orders from one screen",
        dict?.home?.pricing?.basicFeature4 || "Stock alerts to avoid sellouts",
        dict?.home?.pricing?.basicFeature5 ||
          "Accurate net profit calculations",
      ],
    },
    {
      name: dict?.home?.pricing?.proName || "Professional",
      monthlyPrice: "2,000",
      annualPrice: "20,000",
      description:
        dict?.home?.pricing?.proDescription ||
        "The preferred choice for merchants who want to scale cleanly and avoid preventable losses.",
      cta: dict?.home?.pricing?.ctaPro || "Unlock Full Power",
      featured: true,
      features: [
        dict?.home?.pricing?.proFeature1 || "Up to 3,000 orders / month",
        dict?.home?.pricing?.proFeature2 ||
          "Detect hidden delivery losses automatically",
        dict?.home?.pricing?.proFeature3 ||
          "Choose the fastest and cheapest carrier automatically",
        dict?.home?.pricing?.proFeature4 ||
          "Simple workflows to reduce and manage returns",
        dict?.home?.pricing?.proFeature5 || "Highest-priority support",
      ],
    },
    {
      name: dict?.home?.pricing?.ultraName || "Ultra",
      monthlyPrice: "3,000",
      annualPrice: "30,000",
      description:
        dict?.home?.pricing?.ultraDescription ||
        "Built for large teams and high-volume operations with no practical limits.",
      cta: dict?.home?.pricing?.ctaUltra || "Scale My Profits",
      featured: false,
      features: [
        dict?.home?.pricing?.ultraFeature1 || "Unlimited orders",
        dict?.home?.pricing?.ultraFeature2 ||
          "Manage and track multiple warehouses",
        dict?.home?.pricing?.ultraFeature3 ||
          "Custom API integration for your internal systems",
        dict?.home?.pricing?.ultraFeature4 ||
          "Personal account manager on WhatsApp",
      ],
    },
  ];

  return (
    <section
      id="pricing-section"
      className="pricing-section mx-auto max-w-7xl px-6 py-24"
    >
      <input
        id="pricing-billing-monthly"
        type="radio"
        name="pricing-billing"
        className="sr-only"
        defaultChecked
      />
      <input
        id="pricing-billing-annual"
        type="radio"
        name="pricing-billing"
        className="sr-only"
      />

      <div className="mb-12 text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tighter md:text-5xl">
          {dict?.home?.pricing?.title || "Choose Your Plan"}
        </h2>
        <p className="mb-8 text-muted-foreground">
          {dict?.home?.pricing?.subtitle ||
            "Simple, transparent pricing that grows with your business."}
        </p>

        <div className="inline-flex items-center justify-center rounded-full border border-border/50 bg-card p-1 shadow-sm">
          <label
            htmlFor="pricing-billing-monthly"
            className="pricing-billing-option relative cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold text-muted-foreground transition-all"
            data-billing-option="monthly"
          >
            {dict?.home?.pricing?.monthly || "Monthly"}
          </label>
          <label
            htmlFor="pricing-billing-annual"
            className="pricing-billing-option relative cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold text-muted-foreground transition-all"
            data-billing-option="annual"
          >
            {dict?.home?.pricing?.annually || "Annually"}
            <span className="absolute -right-2 -top-3 z-10 rounded-full border border-primary/20 bg-accent px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-accent-foreground shadow-lg">
              {dict?.home?.pricing?.saveBadge || "2 Months Free"}
            </span>
          </label>
        </div>
      </div>

      <div className="grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan, index) => (
          <Card
            key={`plan-${index}`}
            className={
              plan.featured
                ? "relative overflow-visible flex flex-col rounded-[2.5rem] border-2 border-primary bg-card p-8 shadow-2xl shadow-primary/10 transition-all duration-500 md:scale-105"
                : "overflow-visible flex flex-col rounded-3xl border border-border/20 bg-card p-8 transition-all duration-500"
            }
          >
            <CardContent className="flex h-full flex-col p-0">
            {plan.featured ? (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-br from-primary to-primary/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                {dict?.home?.pricing?.featuredBadge || "Most Popular"}
              </div>
            ) : null}

            <div className="mb-4">
              <h3 className="mb-2 text-xl font-black">{plan.name}</h3>
              <p className="h-10 text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1 transition-all duration-500">
                <span data-billing-value="monthly" className="text-4xl font-extrabold">
                  {plan.monthlyPrice}
                </span>
                <span data-billing-value="annual" className="text-4xl font-extrabold">
                  {plan.annualPrice}
                </span>
                <span data-billing-label="monthly" className="text-sm font-medium text-muted-foreground">
                  {plan.monthlyPrice === "0" && plan.annualPrice === "0"
                    ? "DZD"
                    : dict?.home?.pricing?.monthlySuffix || "DZD / month"}
                </span>
                <span data-billing-label="annual" className="text-sm font-medium text-muted-foreground">
                  {plan.monthlyPrice === "0" && plan.annualPrice === "0"
                    ? "DZD"
                    : dict?.home?.pricing?.annualSuffix || "DZD / year"}
                </span>
              </div>
            </div>

            <ul className="mb-10 flex-grow space-y-4">
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={`plan-${index}-feature-${featureIndex}`}
                  className="flex items-center gap-3 text-sm font-medium"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              type="button"
              variant={plan.featured ? "default" : "outline"}
              className={
                plan.featured
                  ? "h-12 w-full rounded-2xl bg-gradient-to-br from-primary to-primary/80 font-bold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                  : "h-12 w-full rounded-2xl border-border font-bold transition-all hover:bg-muted active:scale-95"
              }
            >
              {plan.cta}
            </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
