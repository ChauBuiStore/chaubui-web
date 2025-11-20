"use client";

import { XPage } from "@/components/common";
import { Form } from "@/components/ui/form";
import { useAuth, useTranslations } from "@/lib/hooks";
import { Link } from "@/lib/i18n/routing";
import { useCart } from "@/modules/cart/hooks";
import {
  CheckoutContactForm,
  CheckoutShippingForm,
  CheckoutSummary,
} from "../components";
import { useCheckout } from "../hooks";
import { createSimpleBreadcrumbs } from "@/lib/helpers";
import { ROUTER } from "@/lib/constants";

export function CheckoutPage() {
  const t = useTranslations("checkout");
  const tMenu = useTranslations("menu");
  const { isAuthenticated } = useAuth();

  const { items, totalPrice } = useCart();
  const {
    form,
    isProcessing,
    handleSubmit,
    handleLoginClick,
  } = useCheckout();
  const breadcrumbItems = createSimpleBreadcrumbs(
    tMenu("home"),
    t("title"),
    ROUTER.CHECKOUT
  );

  const total = totalPrice;
  const tAuth = useTranslations("auth");

  return (
    <XPage breadcrumbItems={breadcrumbItems} aria-label={t("title")}>
      <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
      <div className="pb-2 text-sm">
        {isAuthenticated ? null : (
          <>
            {tAuth("alreadyHaveAccount")}{" "}
            <Link
              href="#"
              onClick={handleLoginClick}
              className="text-blue-700 hover:underline cursor-pointer"
            >
              {tAuth("login")}
            </Link>
          </>
        )}
      </div>
      <Form {...form}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CheckoutContactForm form={form} />
            <CheckoutShippingForm form={form} />
          </div>

          <div className="lg:col-span-1">
            <CheckoutSummary
              items={items}
              subtotal={totalPrice}
              total={total}
              isProcessing={isProcessing}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </Form>
    </XPage>
  );
}
