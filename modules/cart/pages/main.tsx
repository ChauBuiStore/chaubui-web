"use client";

import { XPage, XSkeletonCartProduct, XSkeletonCartSummary } from "@/components/common";
import { CartEmpty, CartInfo, CartProduct, CartSummary } from "../components";
import { useTranslations } from "@/lib/hooks";
import { createSimpleBreadcrumbs } from "@/lib/helpers";
import { ROUTER } from "@/lib/constants";
import { useCart } from "../hooks";

export function CartPage() {
  const { items, totalItems, isEmpty, hasHydrated } = useCart();
  const t = useTranslations("cart");
  const tMenu = useTranslations("menu");
  const breadcrumbItems = createSimpleBreadcrumbs(
    tMenu("home"),
    t("title"),
    ROUTER.CART
  );

  if (!hasHydrated) {
    return (
      <XPage breadcrumbItems={breadcrumbItems} aria-label={t("title")}>
        <h1 className="text-3xl font-bold text-foreground mb-4 text-center">
          {t("yourCart")}
        </h1>

        <p className="mb-4 text-center">
          {t("productCount", { count: 0 })}
        </p>

        <div
          className="text-center w-[60px] bg-primary h-1 mt-[30px] mb-[30px] mx-auto"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <XSkeletonCartProduct key={`skeleton-${i}`} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <XSkeletonCartSummary />
            </div>
          </div>
        </div>
      </XPage>
    );
  }

  return (
    <XPage breadcrumbItems={breadcrumbItems} aria-label={t("title")}>
      <h1 className="text-3xl font-bold text-foreground mb-4 text-center">
        {t("yourCart")}
      </h1>

      <p className="mb-4 text-center">
        {t("productCount", { count: totalItems })}
      </p>

      <div
        className="text-center w-[60px] bg-primary h-1 mt-[30px] mb-[30px] mx-auto"
        aria-hidden="true"
      />

      {isEmpty ? (
        <CartEmpty />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartProduct key={item.id} item={item} />
            ))}
            <CartInfo />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary />
            </div>
          </div>
        </div>
      )}
    </XPage>
  );
}
