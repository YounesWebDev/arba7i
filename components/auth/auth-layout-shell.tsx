"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { KeyRound, LogIn, ShieldCheck, UserCircle, Wallet } from "lucide-react";
import { useDirection } from "@/components/ui/direction";

type AuthCopy = {
  login?: { badge?: string; title?: string; description?: string };
  register?: { badge?: string; title?: string; description?: string };
  forgetPassword?: { title?: string; description?: string };
  resetPassword?: { title?: string; description?: string };
  completeProfile?: { title?: string; description?: string };
};

function getConfig(pathname: string, copy?: AuthCopy) {
  if (pathname.includes("/register")) {
    return {
      icon: <ShieldCheck className="h-8 w-8" />,
      badge: copy?.register?.badge || "New Seller Account",
      title: copy?.register?.title || "Create your account",
      description:
        copy?.register?.description ||
        "Open your account and start managing your orders, delivery, and profit in one dashboard.",
      maxWidth: "max-w-xl",
    };
  }

  if (pathname.includes("/forget-password")) {
    return {
      icon: <KeyRound className="h-8 w-8" />,
      badge: undefined,
      title: copy?.forgetPassword?.title || "Reset password",
      description:
        copy?.forgetPassword?.description ||
        "Enter the email linked to your account and we will send you a secure reset link.",
      maxWidth: "max-w-xl",
    };
  }

  if (pathname.includes("/reset-password")) {
    return {
      icon: <ShieldCheck className="h-8 w-8" />,
      badge: undefined,
      title: copy?.resetPassword?.title || "Set a new password",
      description:
        copy?.resetPassword?.description ||
        "Choose a new password for your account.",
      maxWidth: "max-w-xl",
    };
  }

  if (pathname.includes("/complete-profile")) {
    return {
      icon: <UserCircle className="h-8 w-8" />,
      badge: undefined,
      title: copy?.completeProfile?.title || "Complete your profile",
      description:
        copy?.completeProfile?.description ||
        "Add the last account details before entering the dashboard.",
      maxWidth: "max-w-xl",
    };
  }

  return {
    icon: <LogIn className="h-8 w-8" />,
    badge: copy?.login?.badge || "Account Access",
    title: copy?.login?.title || "Welcome back",
    description:
      copy?.login?.description ||
      "Log in to manage your store, orders, and daily operations from one place.",
    maxWidth: "max-w-xl",
  };
}

export function AuthLayoutShell({
  children,
  copy,
}: {
  children: ReactNode;
  lang?: string;
  copy?: AuthCopy;
}) {
  const pathname = usePathname();
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const config = getConfig(pathname, copy);

  return (
    <div className="min-h-[calc(100dvh-4.5rem)] bg-background text-foreground sm:min-h-[calc(100dvh-5rem)] lg:h-[calc(100dvh-5rem)] lg:overflow-hidden">
      <div className="grid min-h-full lg:h-full lg:grid-cols-2">
        <section
          className={`flex min-h-full items-start justify-center overflow-y-auto px-4 py-4 sm:px-6 lg:h-full lg:items-center lg:overflow-hidden lg:py-6 ${
            isRtl ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className={`w-full ${config.maxWidth}`}>
            <div className="group/auth-shell relative overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 shadow-xl shadow-primary/10 backdrop-blur-sm transition-all duration-300 focus-within:border-primary/20 focus-within:shadow-2xl focus-within:shadow-primary/12 md:rounded-[2.5rem] lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none lg:backdrop-blur-0 lg:focus-within:border-0 lg:focus-within:shadow-none">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-2 rounded-t-[inherit] bg-[length:200%_100%] bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-focus-within/auth-shell:opacity-100 group-focus-within/auth-shell:animate-auth-gradient-pan md:hidden" />

              <div className="items-center mb-4 px-4 pt-6 text-center md:px-6 md:pt-8 lg:px-0 lg:pt-6">
                <div className="mb-4 flex h-18 w-18 items-center mx-auto justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white">
                  {config.icon}
                </div>

                {config.badge ? (
                  <div className="flex items-center justify-center rounded-full bg-primary/10 px-1 py-1 text-sm font-bold uppercase tracking-[0.18em] text-primary">
                    {config.badge}
                  </div>
                ) : null}

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
                  {config.title}
                </h1>
              </div>

              <div className="space-y-4 px-4 pb-4 md:px-6 md:pb-6 lg:px-0 lg:pb-0">
                {children}
              </div>
            </div>
          </div>
        </section>

        <aside
          className={`relative hidden h-full overflow-hidden lg:block ${
            isRtl
              ? "rounded-tl-3xl rounded-bl-3xl"
              : "rounded-tr-4xl rounded-br-4xl"
          }`}
        >
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-accent px-10 text-center text-primary-foreground">
            <div className="mx-auto max-w-sm">
              <div className="mx-auto mb-6 flex h-20 w-20 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-xl">
                <Wallet className="h-9 w-9" />
                <span className="font-bold">Arba7i</span>
              </div>
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
                {config.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">
                {config.description}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
