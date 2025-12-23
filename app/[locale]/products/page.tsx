import { ROUTER } from "@/lib/constants";
import { productService } from "@/lib/services/product.service";
import { ProductPage } from "@/modules/products/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BreadcrumbStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { truncateTitle, truncateDescription } from "@/lib/utils";
import { XPage } from "@/components/common";
import type { BreadcrumbItem as BreadcrumbItemUI } from "@/lib/types";

interface ProductsPageRootProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductsPageRootProps): Promise<Metadata> {
  try {
    const { locale } = await params;
    let allProductsTitle = "Tất cả sản phẩm";
    let siteName = "Livin N Decoration";
    let descriptionText = "High quality furniture and decor";
    
    try {
      const t = await getTranslations({ locale });
      allProductsTitle = t("menu.allProducts");
      siteName = t("seo.siteName");
      descriptionText = t("seo.description");
    } catch (error) {
      console.error("Error loading translations for products page:", error);
    }
    
    const baseUrl = APP_CONFIG.baseUrl;

    const title = truncateTitle(`${allProductsTitle} | ${siteName}`);
    const description = truncateDescription(descriptionText);
    const url = `${baseUrl}/${locale}${ROUTER.PRODUCT}`;

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
        vi: `${baseUrl}/vi${ROUTER.PRODUCT}`,
        en: `${baseUrl}/en${ROUTER.PRODUCT}`,
        km: `${baseUrl}/km${ROUTER.PRODUCT}`,
        "x-default": `${baseUrl}/vi${ROUTER.PRODUCT}`,
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
    console.error("Error generating metadata for products page:", error);
    return {
      title: "Tất cả sản phẩm | Livin N Decoration",
      description: "High quality furniture and decor",
    };
  }
}

export default async function ProductsPageRoot({
  params,
}: ProductsPageRootProps) {
  const { locale } = await params;

  const [productsResponse, t] = await Promise.all([
    productService.getProducts({ locale, page: 1, limit: 12 }).catch((error) => {
      if (process.env.NODE_ENV === "development") {
        console.error(`Error fetching products for locale ${locale}:`, error);
      }
      return { data: [], meta: null, status: "error" as const, statusCode: 500, message: "Failed to load products" };
    }),
    getTranslations({ locale }).catch(() => {
      return ((key: string) => {
        const fallbacks: Record<string, string> = {
          "menu.home": "Trang chủ",
          "menu.allProducts": "Tất cả sản phẩm",
        };
        return fallbacks[key] || key;
      }) as Awaited<ReturnType<typeof getTranslations>>;
    }),
  ]);

  const products = productsResponse.data || [];
  const meta = productsResponse.meta;

  const baseUrl = APP_CONFIG.baseUrl;
  const url = `${baseUrl}/${locale}${ROUTER.PRODUCT}`;

  const breadcrumbItems = [
    {
      name: t("menu.home"),
      url: `${baseUrl}/${locale}`,
    },
    {
      name: t("menu.allProducts"),
      url: url,
    },
  ];

  const uiBreadcrumbItems: BreadcrumbItemUI[] = [
    {
      label: t("menu.home"),
      href: ROUTER.HOME,
      isActive: false,
    },
    {
      label: t("menu.allProducts"),
      href: ROUTER.PRODUCT,
      isActive: true,
    },
  ];

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <XPage breadcrumbItems={uiBreadcrumbItems} aria-label={t("menu.allProducts")}>
        <ProductPage
          products={products}
          meta={meta ?? undefined}
          locale={locale}
        />
      </XPage>
    </>
  );
}

