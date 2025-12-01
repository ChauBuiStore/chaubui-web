import { ROUTER } from "../constants";
import { BreadcrumbItem, MenuItem, TransformedCategoryGroup } from "../types";

function findMenuPath(
  items: MenuItem[],
  targetHref: string,
  currentPath: MenuItem[] = []
): MenuItem[] | null {
  for (const item of items) {
    const newPath = [...currentPath, item];

    if (item.href === targetHref) {
      return newPath;
    }

    if (item.children && item.children.length > 0) {
      const found = findMenuPath(item.children, targetHref, newPath);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

export function buildBreadcrumbFromMenu(
  menuItems: MenuItem[],
  collectionSlug?: string,
  isAllProducts?: boolean
): BreadcrumbItem[] {
  const homeItem = menuItems.find((item) => item.href === ROUTER.HOME);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: homeItem?.title,
      href: ROUTER.HOME,
      isActive: false,
    },
  ];

  if (isAllProducts) {
    const collectionsItem = menuItems.find(
      (item) => item.href === ROUTER.COLLECTIONS
    );
    breadcrumbs.push({
      label: collectionsItem?.title,
      href: ROUTER.COLLECTIONS,
      isActive: true,
    });
    return breadcrumbs;
  }

  if (collectionSlug) {
    const menuPath = findMenuPath(
      menuItems,
      `${ROUTER.COLLECTIONS}/${collectionSlug}`
    );
    if (menuPath) {
      menuPath
        .filter((item) => item.href !== "/" && item.href !== ROUTER.COLLECTIONS)
        .forEach((item, index, array) => {
          breadcrumbs.push({
            label: item.title,
            href: item.href || "",
            isActive: index === array.length - 1,
          });
        });
    }
  }

  return breadcrumbs;
}

export function createProductBreadcrumbs(
  breadcrumbs: BreadcrumbItem[],
  productName: string
): BreadcrumbItem[] {
  const updatedBreadcrumbs = breadcrumbs.map(breadcrumb => ({
    ...breadcrumb,
    isActive: false
  }));

  const productBreadcrumb: BreadcrumbItem = {
    label: productName,
    href: `#`,
    isActive: true,
  };

  return [...updatedBreadcrumbs, productBreadcrumb];
}

export function createProductMenuItems(
  categoryGroups: TransformedCategoryGroup[],
  t: (key: string) => string
): MenuItem[] {
  return [
    {
      title: t("menu.home"),
      href: ROUTER.HOME,
      children: [],
    },
    {
      title: t("collections.categories"),
      href: ROUTER.COLLECTIONS,
      children: categoryGroups.map(group => ({
        title: group.name,
        href: `${ROUTER.COLLECTIONS}/${group.slug}`,
        children: group.categories?.map(cat => ({
          title: cat.name,
          href: `${ROUTER.COLLECTIONS}/${cat.slug}`,
          children: [],
        })) || [],
      })),
    },
  ];
}

export function createSimpleBreadcrumbs(
  homeLabel: string,
  currentLabel: string,
  currentHref: string
): BreadcrumbItem[] {
  return [
    {
      label: homeLabel,
      href: ROUTER.HOME,
      isActive: false,
    },
    {
      label: currentLabel,
      href: currentHref,
      isActive: true,
    },
  ];
}

export function getActiveBreadcrumb(
  breadcrumbs: BreadcrumbItem[]
): BreadcrumbItem | undefined {
  return breadcrumbs.find((item) => item.isActive);
}

export function getPageTitleFromBreadcrumbs(
  breadcrumbs: BreadcrumbItem[],
  defaultTitle: string = "Collection"
): string {
  const activeBreadcrumb = getActiveBreadcrumb(breadcrumbs);
  return activeBreadcrumb?.label || defaultTitle;
}