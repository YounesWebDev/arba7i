import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UnauthorizedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isArabic = lang === "ar";

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-10">
      <Card className="w-full border-border/60">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <CardTitle>
            {isArabic ? "ما عندكش صلاحية لهذي الصفحة" : "You do not have access to this page"}
          </CardTitle>
          <CardDescription>
            {isArabic
              ? "تواصل مع صاحب الحساب أو المسؤول إذا حبيت تدخل لها."
              : "Contact your account owner or administrator if you need access."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link href={`/${lang}/dashboard`}>
              {isArabic ? "الرجوع للوحة التحكم" : "Back to dashboard"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
