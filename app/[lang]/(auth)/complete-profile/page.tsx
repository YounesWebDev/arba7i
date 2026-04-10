import { AlertCircle, ArrowRight, Phone } from "lucide-react";
import { redirect } from "next/navigation";
import { completeProfile } from "@/app/actions/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionary";
import { createClient } from "@/utils/supabase/server";

export default async function CompleteProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { lang } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${lang}/login`);
  }

  const { data: profile } = await supabase
    .from("users")
    .select("username, phone_number")
    .eq("id", user.id)
    .single();

  if (profile?.username && profile?.phone_number) {
    redirect(`/${lang}/dashboard`);
  }

  const dict = await getDictionary(lang as Locale);
  const copy = dict.authPages?.completeProfile;

  return (
    <>
      {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

      <form action={completeProfile} className="space-y-5">
              <input type="hidden" name="lang" value={lang} />

              <div className="space-y-2">
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 ltr:left-3 rtl:right-3 -translate-y-1/2 text-sm font-semibold text-muted-foreground">@</span>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    minLength={5}
                    className="h-14 rounded-full border-0 bg-muted px-6 ltr:pl-10 rtl:pr-10 rtl:text-right shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    placeholder={
                      copy?.usernameLabel ||
                      copy?.usernamePlaceholder ||
                      "Choose a username"
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Phone className="pointer-events-none absolute top-1/2 ltr:left-5 rtl:right-5 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className="h-14 rounded-full border-0 bg-muted px-6 ltr:pl-14 rtl:pr-14 rtl:text-right shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    placeholder={
                      copy?.phoneLabel ||
                      copy?.phonePlaceholder ||
                      "Phone number"
                    }
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="h-14 w-full rounded-full bg-gradient-to-r from-primary to-accent text-base font-bold shadow-xl shadow-primary/12 hover:shadow-2xl hover:shadow-primary/25">
                {copy?.submit || "Complete profile"}
                <ArrowRight className="h-4 w-4" />
              </Button>
      </form>
    </>
  );
}
