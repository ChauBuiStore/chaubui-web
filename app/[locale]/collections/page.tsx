import { BreadcrumbStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { ROUTER } from "@/lib/constants";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { CollectionsPage } from "@/modules/collections/pages";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";

const getCachedCategoryGroups = cache(async (locale: string) => {
  const categoryGroupsResponse = await categoryGroupService.getCategoryGroups({ isAll: true }, locale);
  return categoryGroupsResponse.data || [];
});

export default async function CollectionsPageRoot() {
  const locale = await getLocale();

  const [t, categoryGroups] = await Promise.all([
    getTranslations(),
    getCachedCategoryGroups(locale),
  ]);
  const baseUrl = APP_CONFIG.baseUrl;
  const url = `${baseUrl}/${locale}/${ROUTER.COLLECTIONS}`;

  const breadcrumbItems = [
    {
      name: t("menu.home"),
      url: `${baseUrl}/${locale}`,
    },
    {
      name: t("menu.collections"),
      url: url,
    },
  ];

  const pageBreadcrumbs = [
    {
      label: t("menu.home"),
      href: ROUTER.HOME,
      isActive: false,
    },
    {
      label: t("menu.collections"),
      href: ROUTER.COLLECTIONS,
      isActive: true,
    },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <CollectionsPage
        categoryGroups={categoryGroups}
        breadcrumbItems={pageBreadcrumbs}
        collectionsLabel={t("menu.collections")}
      />
    </>
  );
}
