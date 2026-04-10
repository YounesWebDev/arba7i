import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Store, User2, Package, Users, CheckCircle } from "lucide-react";
import { hasPermission, Role } from "@/lib/permissions";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect(`/${lang}/login`);

  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single();

  if (!userData?.username || !userData?.phone_number) {
    return redirect(`/${lang}/complete-profile`);
  }

  // Get their role from the database, default to owner if missing
  const userRole = (userData?.role as Role) || "owner";

  return (
    <div className="space-y-6 text-foreground">
      {/* Header Banner */}
      <div className="rounded-3xl border border-border/60 bg-[radial-gradient(circle_at_top_left,rgba(0,109,74,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.08),transparent_24%),hsl(var(--background))] p-6 shadow-sm">
        <Badge variant="secondary" className="mb-4 rounded-full bg-primary/10 text-primary hover:bg-primary/10 uppercase tracking-wider font-bold">
          Role: {userRole.replace('_', ' ')}
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userData?.first_name || user.email}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This is your role-restricted dashboard view. You only see the modules you have permission to access.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        
        {/* 1. Account Profile - Visible to EVERYONE */}
        <Card className="border-border/60 bg-background">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User2 className="h-4 w-4 text-primary" />
              Account Profile
            </CardTitle>
            <CardDescription>Your authenticated identity.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{userData?.first_name} {userData?.last_name}</p>
            <p className="mt-1 text-sm text-muted-foreground">@{userData?.username}</p>
          </CardContent>
        </Card>

        {/* 2. Analytics - Only visible if they have 'view_financials' permission */}
        {hasPermission(userRole, "view_financials") && (
          <Card className="border-border/60 bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-primary" />
                Analytics & Revenue
              </CardTitle>
              <CardDescription>Financial reports and payouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View your store&apos;s financial performance.</p>
            </CardContent>
          </Card>
        )}

        {/* 3. Store Settings - Only visible if they have 'manage_store_settings' */}
        {hasPermission(userRole, "manage_store_settings") && (
          <Card className="border-border/60 bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Store className="h-4 w-4 text-primary" />
                Store Settings
              </CardTitle>
              <CardDescription>Configure your domain and policies.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Manage global store configurations.</p>
            </CardContent>
          </Card>
        )}

        {/* 4. Products - Owners & Managers */}
        {hasPermission(userRole, "manage_products") && (
          <Card className="border-border/60 bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Package className="h-4 w-4 text-primary" />
                Products
              </CardTitle>
              <CardDescription>Manage your store&apos;s inventory.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Add, edit, or delete products.</p>
            </CardContent>
          </Card>
        )}

        {/* 5. Team - Owners only */}
        {hasPermission(userRole, "manage_team") && (
          <Card className="border-border/60 bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-4 w-4 text-primary" />
                Team Management
              </CardTitle>
              <CardDescription>Manage staff roles and access.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Invite or remove team members.</p>
            </CardContent>
          </Card>
        )}

        {/* 6. Confirm Orders - Call Center, Managers, Owners */}
        {hasPermission(userRole, "confirm_orders") && (
          <Card className="border-border/60 bg-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle className="h-4 w-4 text-primary" />
                Confirm Orders
              </CardTitle>
              <CardDescription>Call center order confirmation.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Process and confirm customer orders.</p>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
