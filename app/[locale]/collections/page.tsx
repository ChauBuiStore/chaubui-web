import { BreadcrumbStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { ROUTER } from "@/lib/constants";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { CollectionsPage } from "@/modules/collections/pages";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import { XPageWithBreadcrumb } from "@/components/common";

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

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <XPageWithBreadcrumb
        breadcrumbConfig={{
          type: "simple",
          homeLabel: t("menu.home"),
          currentLabel: t("menu.collections"),
          currentHref: ROUTER.COLLECTIONS,
        }}
        locale={locale}
      >
        <CollectionsPage
          categoryGroups={categoryGroups}
          collectionsLabel={t("menu.collections")}
        />
      </XPageWithBreadcrumb>
    </>
  );
}
