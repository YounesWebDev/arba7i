import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUnauthorizedDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";

export default async function UnauthorizedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getUnauthorizedDictionary(lang as Locale);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full border-border/60">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <CardTitle>
            {dict.title}
          </CardTitle>
          <CardDescription>
            {dict.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href={`/${lang}/dashboard`}>
              {dict.backToDashboard}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
