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
  isCategoryGroup?: boolean;
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
  isCategoryGroup,
}: CollectionsSlugPageProps) {
  const t = useTranslations();
  const menuItems = createProductMenuItems(categoryGroups, t);

  const breadcrumbs = buildBreadcrumbFromMenu(menuItems, collectionSlug, isAllProducts);
  const pageTitle = getPageTitleFromBreadcrumbs(breadcrumbs);

  return (
    <XPage breadcrumbItems={breadcrumbs}>
      <section aria-labelledby="collection-title" className="space-y-8 py-6 md:py-8">
        <div className="space-y-2">
          <h1 
            id="collection-title" 
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {pageTitle}
          </h1>
          {products.length > 0 && (
            <p className="text-muted-foreground text-sm md:text-base">
              {products.length} {products.length === 1 ? 'sản phẩm' : 'sản phẩm'}
            </p>
          )}
        </div>

        <CollectionsList
          initialProducts={products}
          initialMeta={meta}
          locale={locale}
          categoryGroupSlug={categoryGroupSlug}
          categorySlug={categorySlug}
          categoryGroups={isCategoryGroup}
        />
      </section>
    </XPage>
  );
}

