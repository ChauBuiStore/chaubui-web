"use client";

import { useTranslations } from "@/lib/hooks";
import { HeroBanner, FeaturedCategories, ProductSection } from "@/modules/home/components";

export function HomePage() {
  const t = useTranslations("home");

  return (
    <main role="main" aria-label={t("ariaLabel")} className="mt-[-100px] py-8">
      <HeroBanner />
      <ProductSection id="new-products" title={t("newProducts")} />
      <FeaturedCategories />
      <ProductSection id="available-now" title={t("availableNow")} />
    </main>
  );
}