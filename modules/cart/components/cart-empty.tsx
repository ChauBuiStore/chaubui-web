"use client";

import { XBackButton } from "@/components/common";
import { ROUTER } from "@/lib/constants";
import { useTranslations } from "@/lib/hooks";
import { ShoppingCart } from "lucide-react";

export function CartEmpty() {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");

  return (
    <div className="text-center">
      <div className="mb-6">
        <ShoppingCart className="h-24 w-24 mx-auto" />
      </div>
      <p className="text-gray-600 mb-2">{t("empty")}</p>
      <XBackButton href={ROUTER.PRODUCT} text={tCommon("continueShopping")} />
    </div>
  );
}
