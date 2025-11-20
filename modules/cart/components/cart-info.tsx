"use client";

import { useTranslations } from "@/lib/hooks";

export function CartInfo() {
  const t = useTranslations("cart");

  return (
    <>
      <h3 className="font-bold text-gray-500">{t("purchasePolicy")}</h3>
      <ul className="list-disc list-inside space-y-2 text-sm mt-3">
        <li>{t("policyItem1")}</li>
        <li>{t("policyItem2")}</li>
      </ul>
    </>
  )
}