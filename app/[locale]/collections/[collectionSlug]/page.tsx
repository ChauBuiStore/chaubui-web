import { CollectionStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { ROUTER } from "@/lib/constants";
import { routing } from "@/lib/i18n";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { productService } from "@/lib/services/product.service";
import { TransformCategory, TransformedCategoryGroup } from "@/lib/types";
import { truncateDescription, truncateTitle } from "@/lib/utils";
import { CollectionsSlugPage } from "@/modules/collections/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import { XPage } from "@/components/common";
import type { BreadcrumbItem as BreadcrumbItemUI } from "@/lib/types";

interface CollectionSlugPageRootProps {
  params: Promise<{
    collectionSlug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{ collectionSlug: string; locale: string }> = [];

  for (const locale of routing.locales) {
    try {
      const categoryGroupsResponse = await categoryGroupService.getCategoryGroups(
        { isAll: true },
        locale
      );
      const categoryGroups = categoryGroupsResponse.data || [];

      for (const categoryGroup of categoryGroups) {
        params.push({
          collectionSlug: categoryGroup.slug,
          locale,
        });

        if (categoryGroup.categories) {
          for (const category of categoryGroup.categories) {
            params.push({
              collectionSlug: category.slug,
              locale,
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error);
    }
  }

  return params;
}

type TransformCategoryWithGroup = Omit<TransformCategory, "group"> & {
  group: {
    slug: string;
    name: string;
  };
};

const getCachedCategoryGroups = cache(async (locale: string) => {
  try {
    const categoryGroupsResponse = await categoryGroupService.getCategoryGroups(
      { isAll: true },
      locale
    );
    return categoryGroupsResponse.data || [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Error fetching category groups for locale ${locale}:`, error);
    }
    return [];
  }
});

function createLookupMaps(
  categoryGroups: Awaited<ReturnType<typeof getCachedCategoryGroups>>
) {
  const categoryGroupMap = new Map<string, TransformedCategoryGroup>(
    categoryGroups.map((cg: TransformedCategoryGroup) => [cg.slug, cg])
  );

  const categoryMap = new Map<string, TransformCategoryWithGroup>();
  for (const cg of categoryGroups) {
    if (cg.categories) {
      for (const category of cg.categories) {
        categoryMap.set(category.slug, {
          ...category,
          group: {
            slug: cg.slug,
            name: cg.name,
          },
        });
      }
    }
  }

  return { categoryGroupMap, categoryMap };
}

export async function generateMetadata({
  params,
}: CollectionSlugPageRootProps): Promise<Metadata> {
  const { collectionSlug, locale } = await params;

  try {

    let categoryGroups: Awaited<ReturnType<typeof getCachedCategoryGroups>> = [];
    let t: Awaited<ReturnType<typeof getTranslations>> = ((key: string) => {
      const fallbacks: Record<string, string> = {
        "seo.siteName": "Livin N Decoration",
        "seo.description": "High quality furniture and decor",
      };
      return fallbacks[key] || key;
    }) as Awaited<ReturnType<typeof getTranslations>>;
    let siteName = "Livin N Decoration";
    
    try {
      const [groups, translations] = await Promise.all([
        getCachedCategoryGroups(locale),
        getTranslations({ locale }),
      ]);
      categoryGroups = groups;
      t = translations;
      siteName = t("seo.siteName");
    } catch (error) {
      console.error(`Error fetching data for collection ${collectionSlug}:`, error);
      categoryGroups = await getCachedCategoryGroups(locale).catch(() => []);
    }

    const baseUrl = APP_CONFIG.baseUrl;

    let collectionName = collectionSlug;
    try {
      const { categoryGroupMap, categoryMap } = createLookupMaps(categoryGroups);
      const category = categoryMap.get(collectionSlug);
      const categoryGroup = categoryGroupMap.get(collectionSlug);
      collectionName = category?.name || categoryGroup?.name || collectionSlug;
    } catch (error) {
      console.error(`Error fetching collection name for ${collectionSlug}:`, error);
    }

  const title = truncateTitle(`${collectionName} | ${siteName}`);
  const description = truncateDescription(`${collectionName} - ${t("seo.description")}`);
  const url = `${baseUrl}/${locale}${ROUTER.COLLECTIONS}/${collectionSlug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: siteName,
      locale: locale,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [`${baseUrl}/og-image.jpg`],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: `${baseUrl}/vi${ROUTER.COLLECTIONS}/${collectionSlug}`,
        en: `${baseUrl}/en${ROUTER.COLLECTIONS}/${collectionSlug}`,
        km: `${baseUrl}/km${ROUTER.COLLECTIONS}/${collectionSlug}`,
        "x-default": `${baseUrl}/vi${ROUTER.COLLECTIONS}/${collectionSlug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
    } catch (error) {
      console.error("Error generating metadata for collection:", error);
      return {
        title: `${collectionSlug} | Livin N Decoration`,
        description: "High quality furniture and decor",
      };
    }
}

export default async function CollectionSlugPageRoot({
  params,
}: CollectionSlugPageRootProps) {
  try {
    const { collectionSlug, locale } = await params;

    let categoryGroups: Awaited<ReturnType<typeof getCachedCategoryGroups>> = [];
    let t: Awaited<ReturnType<typeof getTranslations>>;
    
    try {
      const [groups, translations] = await Promise.all([
        getCachedCategoryGroups(locale),
        getTranslations({ locale }),
      ]);
      categoryGroups = groups;
      t = translations;
    } catch (error) {
      console.error(`Error fetching data for collection ${collectionSlug}:`, error);
      categoryGroups = await getCachedCategoryGroups(locale).catch(() => []);
      t = ((key: string) => {
        const fallbacks: Record<string, string> = {
          "menu.home": "Trang chủ",
        };
        return fallbacks[key] || key;
      }) as Awaited<ReturnType<typeof getTranslations>>;
    }

  const { categoryGroupMap, categoryMap } = createLookupMaps(categoryGroups);

  const categoryGroup = categoryGroupMap.get(collectionSlug);
  const category = categoryMap.get(collectionSlug);

  if (!category && !categoryGroup) {
    notFound();
  }

  const collectionName = category?.name || categoryGroup?.name || collectionSlug;
  const baseUrl = APP_CONFIG.baseUrl;

  const uiBreadcrumbItems: BreadcrumbItemUI[] =
    category && category.group
      ? [
        {
          label: t("menu.home"),
          href: ROUTER.HOME,
          isActive: false,
        },
        {
          label: category.group.name,
          href: `${ROUTER.COLLECTIONS}/${category.group.slug}`,
          isActive: false,
        },
        {
          label: collectionName,
          href: `${ROUTER.COLLECTIONS}/${collectionSlug}`,
          isActive: true,
        },
      ]
      : [
        {
          label: t("menu.home"),
          href: ROUTER.HOME,
          isActive: false,
        },
        {
          label: collectionName,
          href: `${ROUTER.COLLECTIONS}/${collectionSlug}`,
          isActive: true,
        },
      ];

  const productParams: {
    locale: string;
    page: number;
    limit: number;
    categoryGroupSlug?: string;
    categorySlug?: string;
  } = {
    locale,
    page: 1,
    limit: 12,
  };

  if (category) {
    productParams.categorySlug = collectionSlug;
  } else if (categoryGroup) {
    productParams.categoryGroupSlug = collectionSlug;
  }

  let productsResponse;
  try {
    productsResponse = await productService.getProducts(productParams);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`Error fetching products for collection ${collectionSlug} (locale ${locale}):`, error);
    }
    productsResponse = { data: [], meta: null, status: "error" as const, statusCode: 500, message: "Failed to load products" };
  }

  const products = productsResponse.data || [];
  const meta = productsResponse.meta || {
    itemsPerPage: productParams.limit,
    totalItems: products.length,
    currentPage: 1,
    totalPages: 1,
  };

  return (
    <>
      <CollectionStructuredData
        name={collectionName}
        description={`${collectionName} - ${t("seo.description")}`}
        url={`${baseUrl}/${locale}${ROUTER.COLLECTIONS}/${collectionSlug}`}
        products={products}
        baseUrl={baseUrl}
        locale={locale}
      />
      <XPage breadcrumbItems={uiBreadcrumbItems} aria-label={collectionName}>
        <CollectionsSlugPage
          products={products}
          locale={locale}
          meta={meta}
          categoryGroupSlug={productParams.categoryGroupSlug}
          categorySlug={productParams.categorySlug}
          pageTitle={collectionName}
        />
      </XPage>
    </>
  );
  } catch (error) {
    console.error("Error rendering collection page:", error);
    throw error;
  }
}
