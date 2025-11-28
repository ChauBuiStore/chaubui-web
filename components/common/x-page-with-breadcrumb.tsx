import { ReactNode } from "react";
import { XPage } from "@/components/common";
import { BreadcrumbConfig } from "@/lib/types/breadcrumb-config.type";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { getTranslations } from "next-intl/server";
import { cache } from "react";
import {
  buildBreadcrumbFromMenu,
  createProductMenuItems,
  createProductBreadcrumbs,
  createSimpleBreadcrumbs,
} from "@/lib/helpers";
import { BreadcrumbItem } from "@/lib/types";

const getCachedCategoryGroups = cache(async (locale: string) => {
  try {
    const categoryGroupsResponse = await categoryGroupService.getCategoryGroups(
      { isAll: true },
      locale
    );
    return categoryGroupsResponse.data || [];
  } catch (error) {
    console.error(`Error fetching category groups for locale ${locale}:`, error);
    return [];
  }
});

interface XPageWithBreadcrumbProps {
  children: ReactNode;
  breadcrumbConfig: BreadcrumbConfig;
  locale: string;
  showBreadcrumb?: boolean;
  className?: string;
  "aria-label"?: string;
}

async function buildBreadcrumbItems(
  config: BreadcrumbConfig,
  locale: string
): Promise<BreadcrumbItem[]> {
  const t = await getTranslations({ locale });

  switch (config.type) {
    case "simple":
      return createSimpleBreadcrumbs(
        config.homeLabel,
        config.currentLabel,
        config.currentHref
      );

    case "collection": {
      const categoryGroups = await getCachedCategoryGroups(locale);
      const menuItems = createProductMenuItems(categoryGroups, t);
      return buildBreadcrumbFromMenu(
        menuItems,
        config.collectionSlug,
        config.isAllProducts
      );
    }

    case "product": {
      const categoryGroups = await getCachedCategoryGroups(locale);
      const menuItems = createProductMenuItems(categoryGroups, t);
      const breadcrumbs = buildBreadcrumbFromMenu(
        menuItems,
        config.collectionSlug,
        false
      );
      return createProductBreadcrumbs(breadcrumbs, config.productName);
    }

    case "custom":
      return config.items;

    default:
      return [];
  }
}

export async function XPageWithBreadcrumb({
  children,
  breadcrumbConfig,
  locale,
  showBreadcrumb = true,
  className = "",
  "aria-label": ariaLabel,
}: XPageWithBreadcrumbProps) {
  const breadcrumbItems = await buildBreadcrumbItems(breadcrumbConfig, locale);

  return (
    <XPage
      breadcrumbItems={breadcrumbItems}
      showBreadcrumb={showBreadcrumb}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </XPage>
  );
}
