import { routing } from "@/lib/i18n";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { productService } from "@/lib/services/product.service";
import { APP_CONFIG } from "@/lib/configs";

export default async function sitemap() {
  const baseUrl = APP_CONFIG.baseUrl;

  const sitemapEntries = [];

  const homePages = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}`])
      ),
    },
  }));

  sitemapEntries.push(...homePages);

  const collectionsPages = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/collections`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${baseUrl}/${l}/collections`])
      ),
    },
  }));

  sitemapEntries.push(...collectionsPages);

  for (const locale of routing.locales) {
    try {
      const categoryGroupsResponse = await categoryGroupService.getCategoryGroups(
        { isAll: true },
        locale
      );
      const categoryGroups = categoryGroupsResponse.data || [];

      const productsResponse = await productService.getProducts({ locale });
      const products = productsResponse.data || [];

      for (const categoryGroup of categoryGroups) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/collections/${categoryGroup.slug}`,
          lastModified: new Date(categoryGroup.updatedAt || Date.now()),
          changeFrequency: "weekly" as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [
                l,
                `${baseUrl}/${l}/collections/${categoryGroup.slug}`,
              ])
            ),
          },
        });

        if (categoryGroup.categories) {
          for (const category of categoryGroup.categories) {
            sitemapEntries.push({
              url: `${baseUrl}/${locale}/collections/${category.slug}`,
              lastModified: new Date(category.updatedAt || Date.now()),
              changeFrequency: "weekly" as const,
              priority: 0.7,
              alternates: {
                languages: Object.fromEntries(
                  routing.locales.map((l) => [
                    l,
                    `${baseUrl}/${l}/collections/${category.slug}`,
                  ])
                ),
              },
            });
          }
        }
      }

      for (const product of products) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/products/${product.slug}`,
          lastModified: new Date(product.updatedAt || Date.now()),
          changeFrequency: "weekly" as const,
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              routing.locales.map((l) => [
                l,
                `${baseUrl}/${l}/products/${product.slug}`,
              ])
            ),
          },
        });
      }
    } catch (error) {
      console.error(`Error generating sitemap for locale ${locale}:`, error);
    }
  }

  return sitemapEntries;
}
