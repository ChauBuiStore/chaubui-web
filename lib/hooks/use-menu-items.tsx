"use client";

import { QUERY_KEYS, ROUTER } from "@/lib/constants";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { MenuItem, TransformedCategoryGroup } from "@/lib/types";
import { transformLocaleFields } from "@/lib/utils/locale.utils";
import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useTranslations } from "./use-translations";

const transformCategoryGroupsToMenuItems = (
  categoryGroups: TransformedCategoryGroup[]
): MenuItem[] => {
  return categoryGroups.map((group) => {
    const children: MenuItem[] = group.categories
      ? group.categories.map((category) => ({
        title: category.name,
        href: `${ROUTER.COLLECTIONS}/${category.slug}`,
        description: category.description,
      }))
      : [];

    return {
      title: group.name,
      href: `${ROUTER.COLLECTIONS}/${group.slug}`,
      children: children.length > 0 ? children : undefined,
    };
  });
};

interface UseMenuItemsReturn {
  menuItems: MenuItem[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useMenuItems(): UseMenuItemsReturn {
  const locale = useLocale();
  const t = useTranslations();

  const {
    data: categoryGroups,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORY_GROUPS, locale],
    queryFn: async () => {
      return await categoryGroupService.getCategoryGroups(undefined, locale);
    },
  });

  const homeItem: MenuItem = {
    title: t("menu.home"),
    href: ROUTER.HOME,
  };

  const allProductsItem: MenuItem = {
    title: t("menu.allProducts"),
    href: ROUTER.PRODUCT,
  };

  let menuItems: MenuItem[] = [homeItem, allProductsItem];

  if (categoryGroups && categoryGroups.data) {
    const transformedData = transformLocaleFields(
      categoryGroups.data,
      locale
    ) as unknown as TransformedCategoryGroup[];

    const categoryMenuItems = transformCategoryGroupsToMenuItems(
      transformedData || []
    );
    menuItems = [homeItem, allProductsItem, ...categoryMenuItems];
  }

  return {
    menuItems,
    isLoading,
    isError,
    error,
  };
}

