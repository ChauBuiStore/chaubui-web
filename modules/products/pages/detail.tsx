"use client";

import { XPage } from "@/components/common";
import { buildBreadcrumbFromMenu } from "@/lib/helpers";
import { TransformedCategoryGroup } from "@/lib/types";
import { useTranslations } from "@/lib/hooks";
import { ProductCarousel, ProductInfo } from "../components";
import { Product } from "../types";
import { createProductMenuItems, createProductBreadcrumbs } from "@/lib/helpers";
import { prepareProductImages } from "../helpers";

interface ProductDetailPageProps {
  product: Product;
  categoryGroups: TransformedCategoryGroup[];
  collectionSlug?: string;
}

export function ProductDetailPage({
  product,
  categoryGroups,
  collectionSlug
}: ProductDetailPageProps) {
  const t = useTranslations();
  const menuItems = createProductMenuItems(categoryGroups, t);
  const breadcrumbs = buildBreadcrumbFromMenu(menuItems, collectionSlug, false);
  const productBreadcrumbs = createProductBreadcrumbs(breadcrumbs, product.name);
  const displayImages = prepareProductImages(product);

  return (
    <XPage breadcrumbItems={productBreadcrumbs}>
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
        <div className="lg:col-span-7">
          <ProductCarousel images={displayImages} />
        </div>

        <div className="lg:col-span-5 sticky top-4 h-fit">
          <h1 id="product-title" className="text-2xl md:text-3xl font-bold mb-4">
            {product.name}
          </h1>
          <ProductInfo product={product} />
        </div>
      </section>
    </XPage>
  );
}

