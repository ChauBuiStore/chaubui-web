"use client";

import { XButton, XPage } from "@/components/common";
import { ROUTER } from "@/lib/constants";
import { useTranslations } from "@/lib/hooks";
import { CHECKOUT_ERROR_STORAGE_KEY } from "../../helpers";
import { AlertCircle, ArrowLeft, Phone, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CheckoutFailedPage() {
  const t = useTranslations("checkoutFailed");
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const error = searchParams.get("error");
    const storedError = localStorage.getItem(CHECKOUT_ERROR_STORAGE_KEY);

    if (error) {
      setErrorMessage(error);
    } else if (storedError) {
      setErrorMessage(storedError);
      localStorage.removeItem(CHECKOUT_ERROR_STORAGE_KEY);
    } else {
      setErrorMessage(t("defaultError"));
    }
  }, [searchParams, t]);

  return (
    <XPage
      showBreadcrumb={false}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8"
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mx-auto">
            <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-red-600 dark:text-red-400">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-left">
              <p className="text-sm text-red-900 dark:text-red-100">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <XButton asChild variant="outline" className="w-full sm:w-auto min-w-[200px]">
              <Link href={ROUTER.CART}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t("viewCart")}
              </Link>
            </XButton>

            <XButton asChild className="w-full sm:w-auto min-w-[200px]">
              <Link href={ROUTER.CHECKOUT}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("tryAgain")}
              </Link>
            </XButton>
          </div>
        </div>

        <div className="flex-col gap-2 mt-6">
          <p className="text-sm text-muted-foreground">
            {t("needHelp")}{" "}
            <a
              href="tel:0903333388"
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <Phone className="w-3 h-3" />
              0903 333 388
            </a>
          </p>
        </div>
      </div>
    </XPage>
  );
}

