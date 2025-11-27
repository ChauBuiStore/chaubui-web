import { ROUTER } from "@/lib/constants";
import { productService } from "@/lib/services/product.service";
import { ProductPage } from "@/modules/products/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BreadcrumbStructuredData } from "@/components/seo";
import { APP_CONFIG } from "@/lib/configs";
import { truncateTitle, truncateDescription } from "@/lib/utils";

interface ProductsPageRootProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProductsPageRootProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const allProductsTitle = t("menu.allProducts");
  const siteName = t("seo.siteName");
  const baseUrl = APP_CONFIG.baseUrl;

  const title = truncateTitle(`${allProductsTitle} | ${siteName}`);
  const description = truncateDescription(t("seo.description"));
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
}

export default async function ProductsPageRoot({
  params,
}: ProductsPageRootProps) {
  const { locale } = await params;

  const [productsResponse, t] = await Promise.all([
    productService.getProducts({ locale, page: 1, limit: 10 }),
    getTranslations({ locale }),
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

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <ProductPage
        products={products}
        meta={meta}
        locale={locale}
      />
    </>
  );
}

