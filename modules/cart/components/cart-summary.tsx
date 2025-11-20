"use client";

import { XBackButton, XButton } from "@/components/common";
import { ROUTER } from "@/lib/constants";
import { useTranslations } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCart } from "../hooks";

export function CartSummary() {
  const t = useTranslations("cart");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { totalPrice, isEmpty } = useCart();

  const handleCheckout = (isEmpty: boolean) => {
    if (!isEmpty) {
      router.push(ROUTER.CHECKOUT);
    }
  };

  return (
    <div className="border border-gray-200 p-4">
      <h3 className="text-xl font-bold mb-4">{t("orderInfo")}</h3>

      <div className="space-y-3 border-t border-b border-gray-200 border-dashed py-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 font-semibold">{t("subtotal")}</span>
          <span className="text-lg font-semibold text-red-600">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      <XButton
        className="w-full uppercase mt-4"
        size="xl"
        disabled={isEmpty}
        onClick={() => handleCheckout(isEmpty)}
      >
        {t("checkout")}
      </XButton>

      <XBackButton
        href={ROUTER.PRODUCT}
        text={tCommon("continueShopping")}
        className="mt-4 text-center w-full"
      />
    </div>
  );
}
