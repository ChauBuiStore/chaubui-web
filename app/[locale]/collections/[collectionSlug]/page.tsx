import { BreadcrumbStructuredData, CollectionStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { ROUTER } from "@/lib/constants";
import { routing } from "@/lib/i18n";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { productService } from "@/lib/services/product.service";
import { truncateDescription, truncateTitle } from "@/lib/utils";
import { CollectionsSlugPage } from "@/modules/collections/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
      }

      for (const categoryGroup of categoryGroups) {
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

export async function generateMetadata({
  params,
}: CollectionSlugPageRootProps): Promise<Metadata> {
  const { collectionSlug, locale } = await params;
  const t = await getTranslations({ locale });
  const siteName = t("seo.siteName");
  const baseUrl = APP_CONFIG.baseUrl;

  let collectionName = collectionSlug;
  try {
    const categoryGroupsResponse = await categoryGroupService.getCategoryGroups(
      { isAll: true },
      locale
    );
    const categoryGroups = categoryGroupsResponse.data || [];
    const category = categoryGroups
      .flatMap((cg) => cg.categories || [])
      .find((c) => c.slug === collectionSlug);
    const categoryGroup = categoryGroups.find(
      (cg) => cg.slug === collectionSlug
    );
    collectionName = category?.name || categoryGroup?.name || collectionSlug;
  } catch (error) {
    console.error(`Error fetching collection name for ${collectionSlug}:`, error);
  }

  const title = truncateTitle(`${collectionName} | ${siteName}`);
  const description = truncateDescription(`${collectionName} - ${t("seo.description")}`);
  const url = `${baseUrl}/${locale}/${ROUTER.COLLECTIONS}/${collectionSlug}`;

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
        vi: `${baseUrl}/vi/${ROUTER.COLLECTIONS}/${collectionSlug}`,
        en: `${baseUrl}/en/${ROUTER.COLLECTIONS}/${collectionSlug}`,
        km: `${baseUrl}/km/${ROUTER.COLLECTIONS}/${collectionSlug}`,
        "x-default": `${baseUrl}/vi/${ROUTER.COLLECTIONS}/${collectionSlug}`,
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
}

export default async function CollectionSlugPageRoot({
  params,
}: CollectionSlugPageRootProps) {
  const { collectionSlug, locale } = await params;

  const [productsResponse, categoryGroupsResponse] = await Promise.all([
    productService.getProducts({ locale }),
    categoryGroupService.getCategoryGroups({ isAll: true }, locale),
  ]);

  const allProducts = productsResponse.data || [];
  const categoryGroups = categoryGroupsResponse.data || [];

  const categoryGroup = categoryGroups.find(
    (cg) => cg.slug === collectionSlug
  );

  const categorySlugsInGroup = categoryGroup
    ? categoryGroup.categories?.map((c) => c.slug) || []
    : [];

  const filteredProducts = allProducts.filter((p) => {
    if (p.category?.slug === collectionSlug) {
      return true;
    }
    if (categoryGroup && categorySlugsInGroup.length > 0) {
      return categorySlugsInGroup.includes(p.category?.slug || "");
    }
    return p.category?.group?.slug === collectionSlug;
  });

  const itemsPerPage = 12;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = 1;
  
  const products = filteredProducts.slice(0, itemsPerPage);

  const meta = {
    itemsPerPage,
    totalItems,
    currentPage,
    totalPages,
  };

  const baseUrl = APP_CONFIG.baseUrl;
  const url = `${baseUrl}/${locale}/${ROUTER.COLLECTIONS}/${collectionSlug}`;
  const t = await getTranslations({ locale });

  const category = categoryGroups
    .flatMap((cg) => cg.categories || [])
    .find((c) => c.slug === collectionSlug);
  
  const collectionName =
    category?.name ||
    categoryGroup?.name ||
    collectionSlug;

  const breadcrumbItems = [
    {
      name: t("menu.home"),
      url: `${baseUrl}/${locale}`,
    },
    {
      name: t("menu.allProducts"),
      url: `${baseUrl}/${locale}/${ROUTER.COLLECTIONS}`,
    },
    {
      name: collectionName,
      url: url,
    },
  ];

  return (
    <>
      <CollectionStructuredData
        name={collectionName}
        description={`${collectionName} - ${t("seo.description")}`}
        url={url}
        products={filteredProducts}
        baseUrl={baseUrl}
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <CollectionsSlugPage
        products={products}
        categoryGroups={categoryGroups}
        collectionSlug={collectionSlug}
        locale={locale}
        isAllProducts={false}
        meta={meta}
      />
    </>
  );
}
