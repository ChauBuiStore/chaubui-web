"use client";

import { XPage } from "@/components/common";
import { PaginationMeta } from "@/lib/types/index";
import { Product } from "@/modules/products/types";
import { useTranslations } from "next-intl";
import { ProductsList } from "../components/products-list";
import { createSimpleBreadcrumbs } from "@/lib/helpers";
import { ROUTER } from "@/lib/constants";

interface ProductPageProps {
  products: Product[];
  meta?: PaginationMeta;
  locale: string;
}

export function ProductPage({
  products,
  meta,
  locale,
}: ProductPageProps) {
  const t = useTranslations("menu");
  
  const breadcrumbs = createSimpleBreadcrumbs(
    t("home"),
    t("allProducts"),
    ROUTER.PRODUCT
  );

  return (
    <XPage breadcrumbItems={breadcrumbs}>
      <section aria-labelledby="products-title">
        <h1 id="products-title" className="text-2xl font-bold mb-4">
          {t("allProducts")}
        </h1>

        <ProductsList
          initialProducts={products}
          initialMeta={meta}
          locale={locale}
        />
      </section>
    </XPage>
  );
}
