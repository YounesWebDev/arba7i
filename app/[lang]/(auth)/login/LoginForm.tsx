"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  UserRound,
} from "lucide-react";
import { login, signInWithGoogle } from "@/app/actions/auth";
import { useDirection } from "@/components/ui/direction";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type LoginCopy = {
  badge?: string;
  title?: string;
  description?: string;
  alertErrorTitle?: string;
  alertInfoTitle?: string;
  identifierLabel?: string;
  identifierPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  forgotPassword?: string;
  submit?: string;
  divider?: string;
  google?: string;
  footerText?: string;
  footerLink?: string;
};

export function LoginForm({
  lang,
  copy,
}: {
  lang: string;
  copy?: LoginCopy;
}) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const [showPassword, setShowPassword] = useState(false);
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const isArabic = lang === "ar";

  return (
    <div dir={dir}>
      {(error || message) && (
              <Alert
                variant={error ? "destructive" : "default"}
                className={error ? "" : "border-primary/20 bg-primary/5 text-primary"}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>
                  {error
                    ? copy?.alertErrorTitle || (isArabic ? "خطأ" : "Error")
                    : copy?.alertInfoTitle || (isArabic ? "معلومة" : "Info")}
                </AlertTitle>
                <AlertDescription>{error || message}</AlertDescription>
              </Alert>
            )}

            <form action={login} className="space-y-5">
              <input type="hidden" name="lang" value={lang} />

              <div className="space-y-2">
                <div className="relative">
                  <UserRound
                    className={cn(
                      "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                      isRtl ? "right-5" : "left-5"
                    )}
                  />
                  <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    required
                    className={cn(
                      "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isRtl ? "pr-14 text-right" : "pl-14"
                    )}
                    placeholder={
                      copy?.identifierLabel ||
                      copy?.identifierPlaceholder ||
                      "Email, phone, or username"
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className={cn("flex items-center", isRtl ? "justify-start" : "justify-end")}>
                  <Link
                    href={`/${lang}/forget-password`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    {copy?.forgotPassword || "Forgot password?"}
                  </Link>
                </div>
                <div className="relative">
                  <Lock
                    className={cn(
                      "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                      isRtl ? "right-5" : "left-5"
                    )}
                  />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className={cn(
                      "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isRtl ? "pr-14 pl-14 text-right" : "pl-14 pr-14"
                    )}
                    placeholder={
                      copy?.passwordLabel ||
                      copy?.passwordPlaceholder ||
                      "Password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground",
                      isRtl ? "left-5" : "right-5"
                    )}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="h-14 w-full rounded-full bg-gradient-to-br from-primary to-accent my-4 text-base font-bold shadow-xl shadow-primary/12 hover:shadow-2xl hover:shadow-primary/25">
                {copy?.submit || "Log in"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs font-medium text-muted-foreground">
                  {copy?.divider || "Or continue with"}
                </span>
              </div>
            </div>

            <form action={signInWithGoogle}>
              <input type="hidden" name="lang" value={lang} />
              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="h-14 w-full border-2 rounded-full my-4 border-primary/20 bg-background text-sm font-semibold"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 1２s.43 3.45 1.18 4。9３l２。８５-２。２２。８１-.６２z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {copy?.google || "Continue with Google"}
              </Button>
            </form>

      <p className="text-center text-sm text-muted-foreground">
        {copy?.footerText || "Don't have an account?"}{" "}
        <Link href={`/${lang}/register`} className="font-semibold text-primary hover:underline underline-offset-4">
          {copy?.footerLink || "Create one"}
        </Link>
      </p>
    </div>
  );
}
