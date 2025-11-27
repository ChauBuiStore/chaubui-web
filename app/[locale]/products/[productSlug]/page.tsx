import { ROUTER } from "@/lib/constants";
import { routing } from "@/lib/i18n";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { productService } from "@/lib/services/product.service";
import { ProductDetailPage } from "@/modules/products/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProductStructuredData, BreadcrumbStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { truncateTitle, truncateDescription } from "@/lib/utils";

interface ProductSlugPageRootProps {
  params: Promise<{
    productSlug: string;
    locale: string;
  }>;
}

export async function generateStaticParams() {
  const params: Array<{
    productSlug: string;
    locale: string;
  }> = [];

  for (const locale of routing.locales) {
    try {
      const productsResponse = await productService.getProducts({ locale });
      const products = productsResponse.data || [];

      for (const product of products) {
        params.push({
          productSlug: product.slug,
          locale,
        });
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error);
    }
  }

  return params;
}

const getCachedProduct = cache(async (productSlug: string, locale: string) => {
  const productDetailResponse = await productService.getProductById(productSlug, locale);
  return productDetailResponse.data ?? null;
});

const getCachedCategoryGroups = cache(async (locale: string) => {
  const categoryGroupsResponse = await categoryGroupService.getCategoryGroups({ isAll: true }, locale);
  return categoryGroupsResponse.data || [];
});

export async function generateMetadata({
  params,
}: ProductSlugPageRootProps): Promise<Metadata> {
  const { productSlug, locale } = await params;

  const [productDetail, t] = await Promise.all([
    getCachedProduct(productSlug, locale),
    getTranslations({ locale }),
  ]);

  const siteName = t("seo.siteName");
  const baseUrl = APP_CONFIG.baseUrl;

  try {
    if (!productDetail) {
      return {
        title: `Product Not Found | ${siteName}`,
        description: "Product not found",
      };
    }

    const title = truncateTitle(`${productDetail.name} | ${siteName}`);
    const description = truncateDescription(
      productDetail.description ||
      `${productDetail.name} - High quality furniture and decor`
    );
    const imageUrl =
      productDetail.images?.[0]?.file?.url || `${baseUrl}/og-image.jpg`;
    const url = `${baseUrl}/${locale}${ROUTER.PRODUCT}/${productSlug}`;

    return {
      title,
      description,
      keywords: [
        productDetail.name,
        productDetail.category?.nameVi || productDetail.category?.nameEn || "",
        "furniture",
        "decor",
        siteName,
      ].filter(Boolean),
      openGraph: {
        type: "website",
        title,
        description,
        url,
        siteName: siteName,
        locale: locale,
        images: [
          {
            url: imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`,
            width: 1200,
            height: 630,
            alt: productDetail.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`],
      },
      alternates: {
        canonical: url,
        languages: {
          vi: `${baseUrl}/vi${ROUTER.PRODUCT}/${productSlug}`,
          en: `${baseUrl}/en${ROUTER.PRODUCT}/${productSlug}`,
          km: `${baseUrl}/km${ROUTER.PRODUCT}/${productSlug}`,
          "x-default": `${baseUrl}/vi${ROUTER.PRODUCT}/${productSlug}`,
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
  } catch {
    return {
      title: `Product | ${siteName}`,
      description: t("seo.description"),
    };
  }
}

export default async function ProductSlugPageRoot({
  params,
}: ProductSlugPageRootProps) {
  const { productSlug, locale } = await params;

  const [product, categoryGroups, t] = await Promise.all([
    getCachedProduct(productSlug, locale),
    getCachedCategoryGroups(locale),
    getTranslations({ locale }),
  ]);

  if (!product) {
    notFound();
  }

  const baseUrl = APP_CONFIG.baseUrl;

  const collectionSlug = product.category?.slug || product.category?.group?.slug;

  const breadcrumbItems = [
    {
      name: t("menu.home"),
      url: `${baseUrl}/${locale}`,
    },
    {
      name: t("menu.allProducts"),
      url: `${baseUrl}/${locale}${ROUTER.PRODUCT}`,
    },
  ];

  breadcrumbItems.push({
    name: product.name,
    url: `${baseUrl}/${locale}${ROUTER.PRODUCT}/${productSlug}`,
  });

  return (
    <>
      <ProductStructuredData
        product={product}
        baseUrl={baseUrl}
        locale={locale}
      />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <ProductDetailPage
        product={product}
        categoryGroups={categoryGroups}
        collectionSlug={collectionSlug}
      />
    </>
  );
}

