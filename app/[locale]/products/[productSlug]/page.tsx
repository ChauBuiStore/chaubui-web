import { ROUTER } from "@/lib/constants";
import { routing } from "@/lib/i18n";
import { productService } from "@/lib/services/product.service";
import { categoryGroupService } from "@/lib/services/category-group.service";
import { ProductDetailPage } from "@/modules/products/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ProductStructuredData, BreadcrumbStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { truncateTitle, truncateDescription } from "@/lib/utils";
import { XPage } from "@/components/common";
import type { BreadcrumbItem as BreadcrumbItemUI, Category, CategoryGroup, TransformedCategoryGroup, TransformCategory } from "@/lib/types";

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
  try {
    const productDetailResponse = await productService.getProductById(productSlug, locale);
    return productDetailResponse.data ?? null;
  } catch (error) {
    console.error(`Error fetching product ${productSlug} for locale ${locale}:`, error);
    return null;
  }
});

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


export async function generateMetadata({
  params,
}: ProductSlugPageRootProps): Promise<Metadata> {
  try {
    const { productSlug, locale } = await params;

    let productDetail: Awaited<ReturnType<typeof getCachedProduct>> = null;
    let siteName = "Livin N Decoration";

    try {
      const [product, t] = await Promise.all([
        getCachedProduct(productSlug, locale),
        getTranslations({ locale }),
      ]);
      productDetail = product;
      siteName = t("seo.siteName");
    } catch (error) {
      console.error(`Error fetching data for product ${productSlug}:`, error);
      productDetail = await getCachedProduct(productSlug, locale).catch(() => null);
    }

    const baseUrl = APP_CONFIG.baseUrl;

    if (!productDetail) {
      return {
        title: `Product Not Found | ${siteName}`,
        description: "Product not found",
      };
    }

    const title = truncateTitle(`${productDetail.name || productSlug} | ${siteName}`);
    const description = truncateDescription(
      productDetail.description ||
      `${productDetail.name || productSlug} - High quality furniture and decor`
    );
    const imageUrl =
      productDetail.images?.[0]?.file?.url || `${baseUrl}/og-image.jpg`;
    const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`;
    const url = `${baseUrl}/${locale}${ROUTER.PRODUCT}/${productSlug}`;

    return {
      title,
      description,
      keywords: [
        productDetail.name || productSlug,
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
            url: fullImageUrl,
            width: 1200,
            height: 630,
            alt: productDetail.name || productSlug,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [fullImageUrl],
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
  } catch (error) {
    console.error("Error generating metadata for product:", error);
    return {
      title: "Product | Livin N Decoration",
      description: "High quality furniture and decor",
    };
  }
}

export default async function ProductSlugPageRoot({
  params,
}: ProductSlugPageRootProps) {
  try {
    const { productSlug, locale } = await params;

    const product = await getCachedProduct(productSlug, locale);

    if (!product) {
      notFound();
    }

    let t: Awaited<ReturnType<typeof getTranslations>>;
    try {
      t = await getTranslations({ locale });
    } catch (error) {
      console.error("Error loading translations for locale:", locale, error);
      t = ((key: string) => {
        const fallbacks: Record<string, string> = {
          "menu.home": "Trang chủ",
        };
        return fallbacks[key] || key;
      }) as Awaited<ReturnType<typeof getTranslations>>;
    }
    const baseUrl = APP_CONFIG.baseUrl;

    const category = product.category;
    let categoryGroup = category?.group;

    if (category && !categoryGroup && category.slug) {
      try {
        const categoryGroups = await getCachedCategoryGroups(locale);

        for (const cg of categoryGroups) {
          if (cg.categories) {
            const foundCategory = cg.categories.find(
              (cat: TransformCategory) => cat.slug === category?.slug
            );
            if (foundCategory) {
              categoryGroup = {
                id: cg.id,
                slug: cg.slug,
                nameVi: (cg as TransformedCategoryGroup & { nameVi?: string }).nameVi || cg.name || "",
                nameEn: (cg as TransformedCategoryGroup & { nameEn?: string }).nameEn || cg.name || "",
                nameKm: (cg as TransformedCategoryGroup & { nameKm?: string }).nameKm,
                createdAt: cg.createdAt,
                updatedAt: cg.updatedAt,
                categories: [],
              } as CategoryGroup;
              break;
            }
          }
        }
      } catch (error) {
        console.error("Error fetching category groups for breadcrumb:", error);
      }
    }

    type CategoryWithName = Category & { name?: string };
    type CategoryGroupWithName = CategoryGroup & { name?: string };

    const getCategoryName = (cat: Category | null | undefined): string => {
      if (!cat) return "";

      const categoryWithName = cat as CategoryWithName;
      if (categoryWithName.name) {
        return categoryWithName.name;
      }

      if (locale === "vi" && cat.nameVi) return cat.nameVi;
      if (locale === "en" && cat.nameEn) return cat.nameEn;
      if (locale === "km" && cat.nameKm) return cat.nameKm;

      return cat.nameVi || cat.nameEn || cat.nameKm || cat.slug || "";
    };

    const getCategoryGroupName = (group: CategoryGroup | null | undefined): string => {
      if (!group) return "";

      const groupWithName = group as CategoryGroupWithName;
      if (groupWithName.name) {
        return groupWithName.name;
      }

      if (locale === "vi" && group.nameVi) return group.nameVi;
      if (locale === "en" && group.nameEn) return group.nameEn;
      if (locale === "km" && group.nameKm) return group.nameKm;

      return group.nameVi || group.nameEn || group.nameKm || group.slug || "";
    };

    const categoryName = getCategoryName(category);
    const categoryGroupName = getCategoryGroupName(categoryGroup);

    const buildBreadcrumbItems = () => {
      const items: Array<{ name: string; url: string }> = [
        {
          name: t("menu.home"),
          url: `${baseUrl}/${locale}`,
        },
      ];

      if (categoryGroup && categoryGroup.slug && categoryGroupName) {
        items.push({
          name: categoryGroupName,
          url: `${baseUrl}/${locale}${ROUTER.COLLECTIONS}/${categoryGroup.slug}`,
        });
      }

      if (category && category.slug && categoryName) {
        items.push({
          name: categoryName,
          url: `${baseUrl}/${locale}${ROUTER.COLLECTIONS}/${category.slug}`,
        });
      }

      items.push({
        name: product.name,
        url: `${baseUrl}/${locale}${ROUTER.PRODUCT}/${productSlug}`,
      });

      return items;
    };

    const buildUIBreadcrumbItems = (): BreadcrumbItemUI[] => {
      const items: BreadcrumbItemUI[] = [
        {
          label: t("menu.home"),
          href: ROUTER.HOME,
          isActive: false,
        },
      ];

      if (categoryGroup && categoryGroup.slug && categoryGroupName) {
        items.push({
          label: categoryGroupName,
          href: `${ROUTER.COLLECTIONS}/${categoryGroup.slug}`,
          isActive: false,
        });
      }

      if (category && category.slug && categoryName) {
        items.push({
          label: categoryName,
          href: `${ROUTER.COLLECTIONS}/${category.slug}`,
          isActive: false,
        });
      }

      items.push({
        label: product.name,
        href: `${ROUTER.PRODUCT}/${productSlug}`,
        isActive: true,
      });

      return items;
    };

    const breadcrumbItems = buildBreadcrumbItems();
    const uiBreadcrumbItems = buildUIBreadcrumbItems();

    return (
      <>
        <ProductStructuredData
          product={product}
          baseUrl={baseUrl}
          locale={locale}
        />
        <BreadcrumbStructuredData items={breadcrumbItems} />
        <XPage breadcrumbItems={uiBreadcrumbItems} aria-label={product.name}>
          <ProductDetailPage product={product} />
        </XPage>
      </>
    );
  } catch (error) {
    console.error("Error rendering product page:", error);
    throw error;
  }
}

