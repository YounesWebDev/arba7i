import Link from "next/link";
import { AlertCircle, ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { sendPasswordResetEmail } from "@/app/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionary";

export default async function ForgotPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
}) {
  const { lang } = await params;
  const { message, error } = await searchParams;
  const dict = await getDictionary(lang as Locale);
  const copy = dict.authPages?.forgetPassword;
  const isArabic = lang === "ar";

  return (
    <>
      {(message || error) && (
              <Alert
                variant={error ? "destructive" : "default"}
                className={error ? "" : "border-primary/20 bg-primary/5 text-primary"}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{error ? (isArabic ? "خطأ" : "Error") : (isArabic ? "معلومة" : "Info")}</AlertTitle>
                <AlertDescription>{error || message}</AlertDescription>
              </Alert>
            )}

            <form action={sendPasswordResetEmail} className="space-y-5">
              <input type="hidden" name="lang" value={lang} />

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 ltr:left-5 rtl:right-5 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="h-14 rounded-full border-0 bg-muted px-6 ltr:pl-14 rtl:pr-14 rtl:text-right shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    placeholder={
                      copy?.emailLabel ||
                      copy?.emailPlaceholder ||
                      "Email address"
                    }
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="h-14 w-full rounded-full bg-gradient-to-r from-primary to-accent text-base font-bold shadow-xl shadow-primary/12 hover:shadow-2xl hover:shadow-primary/25">
                {copy?.submit || "Send reset link"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

      <Button asChild variant="ghost" className="mx-auto flex h-auto w-fit gap-2 px-0 text-sm font-semibold text-primary hover:bg-transparent hover:underline">
        <Link href={`/${lang}/login`}>
          <ArrowLeft className="h-4 w-4" />
          {copy?.back || "Back to login"}
        </Link>
      </Button>
    </>
  );
}
