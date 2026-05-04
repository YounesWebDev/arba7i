// --- app/(admin)/admin/page.tsx ---
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAdminDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n-config";
import { i18n } from "@/i18n-config";

export default async function AdminHomePage() {
  // Get default locale
  const dict = await getAdminDictionary(i18n.defaultLocale as Locale);

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{dict.adminPage.title}</h1>
          <p className="mt-2 text-muted-foreground">{dict.adminPage.description}</p>
        </div>
      </header>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              {dict.adminPage.totalActiveSellers}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-card-foreground">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              {dict.adminPage.platformRevenue}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-card-foreground">0 DZD</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              {dict.adminPage.systemStatus}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{dict.adminPage.statusOnline}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
