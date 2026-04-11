"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import { updatePassword } from "@/app/actions/auth";
import { useDirection } from "@/components/ui/direction";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ResetPasswordCopy = {
  title?: string;
  description?: string;
  alertErrorTitle?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  confirmPasswordLabel?: string;
  confirmPasswordPlaceholder?: string;
  submit?: string;
  passwordsOk?: string;
  passwordsBad?: string;
};

export default function ResetPasswordClientForm({
  lang,
  error,
  copy,
}: {
  lang: string;
  error?: string;
  copy?: ResetPasswordCopy;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordsMatch = confirmPassword.length > 0 ? password === confirmPassword : null;
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const isArabic = lang === "ar";

  return (
    <div dir={dir}>
      {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{copy?.alertErrorTitle || (isArabic ? "خطأ" : "Error")}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

      <form action={updatePassword} className="space-y-5">
              <input type="hidden" name="lang" value={lang} />

              <div className="space-y-2">
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
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={cn(
                      "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isRtl ? "pr-14 pl-14 text-right" : "pl-14 pr-14"
                    )}
                    placeholder={
                      copy?.passwordLabel ||
                      copy?.passwordPlaceholder ||
                      "New password"
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
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className={cn("flex items-center gap-4", isRtl ? "justify-end" : "justify-between")}>
                  {passwordsMatch === true && (
                    <span className="text-xs font-medium text-primary">
                      {copy?.passwordsOk || "Passwords match"}
                    </span>
                  )}
                  {passwordsMatch === false && (
                    <span className="text-xs font-medium text-destructive">
                      {copy?.passwordsBad || "Passwords do not match"}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock
                    className={cn(
                      "pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground",
                      isRtl ? "right-5" : "left-5"
                    )}
                  />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className={cn(
                      "h-14 rounded-full border-0 bg-muted px-6 shadow-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isRtl ? "pr-14 pl-14 text-right" : "pl-14 pr-14"
                    )}
                    placeholder={
                      copy?.confirmPasswordLabel ||
                      copy?.confirmPasswordPlaceholder ||
                      "Confirm password"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground",
                      isRtl ? "left-5" : "right-5"
                    )}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" size="lg" className="h-14 w-full rounded-full bg-gradient-to-r from-primary to-accent text-base font-bold shadow-xl shadow-primary/12 hover:shadow-2xl hover:shadow-primary/25">
                {copy?.submit || "Update password"}
                <ArrowRight className="h-4 w-4" />
              </Button>
      </form>
    </div>
  );
}
