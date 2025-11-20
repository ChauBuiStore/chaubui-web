"use client";

import { XButton, XPage } from "@/components/common";
import { ROUTER } from "@/lib/constants";
import { useTranslations } from "@/lib/hooks";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function CheckoutSuccessPage() {
  const t = useTranslations("checkoutSuccess");
  const tCommon = useTranslations("common");

  return (
    <XPage
      showBreadcrumb={false}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8"
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">{t("title")}</h1>
            <p className="text-muted-foreground text-lg">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <div className="p-3 bg-muted rounded-lg border text-left">
            <p className="text-sm">
              <strong className="block mb-1.5 text-foreground">
                {t("noteTitle")}:
              </strong>
              <span className="text-muted-foreground">{t("noteContent")}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <XButton asChild size="lg" variant="outline" className="min-w-[200px]">
            <Link href={ROUTER.PRODUCT}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              {tCommon("continueShopping")}
            </Link>
          </XButton>
          <XButton asChild size="lg" className="min-w-[200px]">
            <Link href={ROUTER.HOME}>
              <Home className="w-4 h-4 mr-2" />
              {tCommon("backToHome")}
            </Link>
          </XButton>
        </div>
      </div>
    </XPage>
  );
}
