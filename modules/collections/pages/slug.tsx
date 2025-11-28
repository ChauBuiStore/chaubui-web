"use client";

import { PaginationMeta } from "@/lib/types/index";
import { Product } from "@/modules/products/types";
import { CollectionsList } from "../components/collections-list";

interface CollectionsSlugPageProps {
  products: Product[];
  meta?: PaginationMeta;
  locale: string;
  categoryGroupSlug?: string;
  categorySlug?: string;
  pageTitle: string;
}

export function CollectionsSlugPage({
  products,
  meta,
  locale,
  categoryGroupSlug,
  categorySlug,
  pageTitle,
}: CollectionsSlugPageProps) {
  return (
    <section aria-labelledby="collection-title">
      <div className="space-y-2">
        <h1 id="collection-title" className="text-2xl font-bold mb-4">
          {pageTitle}
        </h1>
      </div>

      <CollectionsList
        initialProducts={products}
        initialMeta={meta}
        locale={locale}
        categoryGroupSlug={categoryGroupSlug}
        categorySlug={categorySlug}
      />
    </section>
  );
}

