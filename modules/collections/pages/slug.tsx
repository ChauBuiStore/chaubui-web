import { XPage } from "@/components/common";
import { buildBreadcrumbFromMenu } from "@/lib/helpers";
import { PaginationMeta, TransformedCategoryGroup } from "@/lib/types/index";
import { Product } from "@/modules/products/types";
import { useTranslations } from "next-intl";
import { CollectionsList } from "../components/collections-list";
import { createProductMenuItems } from "@/lib/helpers";
import { getPageTitleFromBreadcrumbs } from "@/lib/helpers";

interface CollectionsSlugPageProps {
  products: Product[];
  categoryGroups: TransformedCategoryGroup[];
  collectionSlug?: string;
  isAllProducts?: boolean;
  meta?: PaginationMeta;
  locale: string;
  categoryGroupSlug?: string;
  categorySlug?: string;
}

export function CollectionsSlugPage({
  products,
  categoryGroups,
  collectionSlug,
  isAllProducts = false,
  meta,
  locale,
  categoryGroupSlug,
  categorySlug,
}: CollectionsSlugPageProps) {
  const t = useTranslations();
  const menuItems = createProductMenuItems(categoryGroups, t);

  const breadcrumbs = buildBreadcrumbFromMenu(menuItems, collectionSlug, isAllProducts);
  const pageTitle = getPageTitleFromBreadcrumbs(breadcrumbs);

  return (
    <XPage breadcrumbItems={breadcrumbs}>
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
    </XPage>
  );
}

