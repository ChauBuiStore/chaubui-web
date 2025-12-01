"use client";

import { XButton, XCard, XPage } from "@/components/common";
import { ROUTER } from "@/lib/constants";
import { useTranslations } from "@/lib/hooks";
import { Link } from "@/lib/i18n/routing";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <XPage
      showBreadcrumb={false}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8"
    >
      <div className="w-full max-w-2xl mx-auto px-4">
        <XCard className="shadow-none border-none">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                404
              </h1>
              <p className="text-muted-foreground text-md max-w-lg mx-auto">
                {t("description")}
              </p>
            </div>

            <div className="w-full space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <XButton asChild className="w-full">
                  <Link href={ROUTER.HOME}>
                    <Home className="w-4 h-4 mr-2" />
                    {t("backToHome")}
                  </Link>
                </XButton>

                <XButton asChild variant="outline" className="w-full">
                  <Link href={ROUTER.PRODUCT}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {t("continueShopping")}
                  </Link>
                </XButton>
              </div>
            </div>
          </div>
        </XCard>
      </div>
    </XPage>
  );
}

