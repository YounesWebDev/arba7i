"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { signInWithGoogle, signup } from "@/app/actions/auth";
import Stepper, { Step } from "@/components/Stepper";
import { useDirection } from "@/components/ui/direction";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type RegisterCopy = {
  badge?: string;
  title?: string;
  description?: string;
  alertErrorTitle?: string;
  back?: string;
  next?: string;
  identityTitle?: string;
  identityDescription?: string;
  contactTitle?: string;
  contactDescription?: string;
  securityTitle?: string;
  securityDescription?: string;
  firstName?: string;
  firstNamePlaceholder?: string;
  lastName?: string;
  lastNamePlaceholder?: string;
  username?: string;
  usernamePlaceholder?: string;
  email?: string;
  emailPlaceholder?: string;
  phone?: string;
  phonePlaceholder?: string;
  password?: string;
  passwordPlaceholder?: string;
  confirmPassword?: string;
  confirmPasswordPlaceholder?: string;
  submit?: string;
  divider?: string;
  google?: string;
  footerText?: string;
  footerLink?: string;
  usernameOk?: string;
  usernameBad?: string;
  passwordsOk?: string;
  passwordsBad?: string;
};

export function RegisterForm({
  lang,
  copy,
}: {
  lang: string;
  copy?: RegisterCopy;
}) {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const isArabic = lang === "ar";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const usernameValid =
    username.length === 0
      ? null
      : username.length >= 5 && /^[a-zA-Z0-9_]+$/.test(username);
  const passwordsMatch =
    confirmPassword.length === 0 ? null : password === confirmPassword;

  return (
    <div dir={dir}>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{copy?.alertErrorTitle || (isArabic ? "خطأ" : "Error")}</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form action={signup} className="space-y-5 lg:space-y-1">
        <input type="hidden" name="lang" value={lang} />
        <input type="hidden" name="firstName" value={firstName} />
        <input type="hidden" name="lastName" value={lastName} />
        <input type="hidden" name="username" value={username} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="phoneNumber" value={phoneNumber} />
        <input type="hidden" name="password" value={password} />
        <input type="hidden" name="confirmPassword" value={confirmPassword} />

        <Stepper
          initialStep={1}
          stepCircleContainerClassName="rounded-[2rem] border border-border/60 bg-background/70 shadow-sm lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none"
          stepContainerClassName="gap-2 px-1 pb-4 lg:gap-1.5 lg:pb-2"
          contentClassName="px-1"
          footerClassName="px-1 pt-3 lg:pt-1"
          backButtonText={copy?.back || (isArabic ? "السابق" : "Previous")}
          nextButtonText={copy?.next || (isArabic ? "التالي" : "Next")}
          completeButtonText={copy?.submit || (isArabic ? "إنشاء الحساب" : "Create account")}
        >
          <Step>
            <div className={cn("space-y-5 lg:space-y-2", isRtl && "text-right")}>
              <div>
                <h2 className="text-xl font-bold tracking-tight lg:text-base">
                  {copy?.identityTitle || (isArabic ? "بياناتك الأساسية" : "Your identity")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground lg:text-xs">
                  {copy?.identityDescription ||
                    (isArabic
                      ? "أدخل الاسم الأول واسم العائلة واسم المستخدم الخاص بحسابك."
                      : "Add your name and choose the username for your account.")}
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:gap-2">
                <div className="space-y-2">
                  <div className="relative">
                    <UserRound
                      className={cn(
                        "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                        isRtl ? "right-5" : "left-5"
                      )}
                    />
                    <Input
                      id="firstName"
                      required
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className={cn(
                        "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                        isRtl ? "pr-14 text-right" : "pl-14"
                      )}
                      placeholder={
                        copy?.firstName || copy?.firstNamePlaceholder || (isArabic ? "الاسم الأول" : "First name")
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Input
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    className={cn(
                      "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                      isRtl && "text-right"
                    )}
                    placeholder={
                      copy?.lastName || copy?.lastNamePlaceholder || (isArabic ? "اسم العائلة" : "Last name")
                    }
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div
                  className={cn(
                    "flex min-h-5 items-center gap-4",
                    isRtl ? "justify-end" : "justify-between"
                  )}
                >
                  {usernameValid === true && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {copy?.usernameOk || (isArabic ? "ممتاز" : "Looks good")}
                    </span>
                  )}
                  {usernameValid === false && (
                    <span className="text-xs font-medium text-destructive">
                      {copy?.usernameBad ||
                        (isArabic
                          ? "استخدم الحروف والأرقام و _ فقط"
                          : "Use only letters, numbers, and _")}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <span
                    className={cn(
                      "pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground",
                      isRtl ? "right-3" : "left-3"
                    )}
                  >
                    @
                  </span>
                  <Input
                    id="username"
                    required
                    minLength={5}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className={cn(
                      "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                      isRtl ? "pr-10 text-right" : "pl-10"
                    )}
                    placeholder={
                      copy?.username || copy?.usernamePlaceholder || (isArabic ? "اسم المستخدم" : "Username")
                    }
                  />
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className={cn("space-y-5 lg:space-y-2", isRtl && "text-right")}>
              <div>
                <h2 className="text-xl font-bold tracking-tight lg:text-base">
                  {copy?.contactTitle || (isArabic ? "بيانات التواصل" : "Contact details")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground lg:text-xs">
                  {copy?.contactDescription ||
                    (isArabic
                      ? "أدخل البريد الإلكتروني ورقم الهاتف المرتبطين بالحساب."
                      : "Enter the email and phone number linked to this account.")}
                </p>
              </div>

              <div className="grid gap-5 lg:gap-2">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail
                      className={cn(
                        "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                        isRtl ? "right-5" : "left-5"
                      )}
                    />
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={cn(
                        "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                        isRtl ? "pr-14 text-right" : "pl-14"
                      )}
                      placeholder={
                        copy?.email || copy?.emailPlaceholder || (isArabic ? "البريد الإلكتروني" : "Email")
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Phone
                      className={cn(
                        "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                        isRtl ? "right-5" : "left-5"
                      )}
                    />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className={cn(
                        "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                        isRtl ? "pr-14 text-right" : "pl-14"
                      )}
                      placeholder={
                        copy?.phone || copy?.phonePlaceholder || (isArabic ? "رقم الهاتف" : "Phone number")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </Step>

          <Step>
            <div className={cn("space-y-5 lg:space-y-2", isRtl && "text-right")}>
              <div>
                <h2 className="text-xl font-bold tracking-tight lg:text-base">
                  {copy?.securityTitle || (isArabic ? "تأمين الحساب" : "Secure your account")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground lg:text-xs">
                  {copy?.securityDescription ||
                    (isArabic
                      ? "اختر كلمة مرور وأكدها قبل إنشاء الحساب."
                      : "Choose a password and confirm it before creating your account.")}
                </p>
              </div>

              <div className="grid gap-5 lg:gap-2">
                <div className="space-y-2">
                  <div className="relative">
                    <ShieldCheck
                      className={cn(
                        "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                        isRtl ? "right-5" : "left-5"
                      )}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      minLength={6}
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className={cn(
                        "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                        isRtl ? "pr-14 pl-14 text-right" : "pl-14 pr-14"
                      )}
                      placeholder={
                        copy?.password || copy?.passwordPlaceholder || (isArabic ? "كلمة المرور" : "Password")
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground",
                        isRtl ? "left-5" : "right-5"
                      )}
                      aria-label={
                        showPassword
                          ? isArabic
                            ? "إخفاء كلمة المرور"
                            : "Hide password"
                          : isArabic
                            ? "إظهار كلمة المرور"
                            : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    className={cn(
                      "flex min-h-5 items-center gap-4",
                      isRtl ? "justify-end" : "justify-between"
                    )}
                  >
                    {passwordsMatch === true && (
                      <span className="text-xs font-medium text-primary">
                        {copy?.passwordsOk || (isArabic ? "كلمتا المرور متطابقتان" : "Passwords match")}
                      </span>
                    )}
                    {passwordsMatch === false && (
                      <span className="text-xs font-medium text-destructive">
                        {copy?.passwordsBad ||
                          (isArabic ? "كلمتا المرور غير متطابقتين" : "Passwords do not match")}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <ShieldCheck
                      className={cn(
                        "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                        isRtl ? "right-5" : "left-5"
                      )}
                    />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      minLength={6}
                      required
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      className={cn(
                        "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40 lg:h-11 lg:text-sm",
                        isRtl ? "pr-14 pl-14 text-right" : "pl-14 pr-14"
                      )}
                      placeholder={
                        copy?.confirmPassword ||
                        copy?.confirmPasswordPlaceholder ||
                        (isArabic ? "تأكيد كلمة المرور" : "Confirm password")
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((current) => !current)}
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground",
                        isRtl ? "left-5" : "right-5"
                      )}
                      aria-label={
                        showConfirmPassword
                          ? isArabic
                            ? "إخفاء كلمة المرور"
                            : "Hide password"
                          : isArabic
                            ? "إظهار كلمة المرور"
                            : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Step>
        </Stepper>
      </form>

      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs font-medium text-muted-foreground">
            {copy?.divider || (isArabic ? "أو المتابعة عبر" : "Or continue with")}
          </span>
        </div>
      </div>

      <form action={signInWithGoogle} className="mt-5">
        <input type="hidden" name="lang" value={lang} />
        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="h-14 w-full rounded-full border-border/60 bg-background text-sm font-semibold"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {copy?.google || (isArabic ? "المتابعة باستخدام Google" : "Continue with Google")}
        </Button>
      </form>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        {copy?.footerText || (isArabic ? "لديك حساب بالفعل؟" : "Already have an account?")}{" "}
        <Link
          href={`/${lang}/login`}
          className="font-semibold text-primary hover:underline underline-offset-4"
        >
          {copy?.footerLink || (isArabic ? "تسجيل الدخول" : "Log in")}
        </Link>
      </p>
    </div>
  );
}
