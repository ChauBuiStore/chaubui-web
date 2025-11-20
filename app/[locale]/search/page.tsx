import { productService } from "@/lib/services/product.service";
import { SearchPage } from "@/modules/search/pages";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface SearchPageRootProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    search?: string;
  }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: SearchPageRootProps): Promise<Metadata> {
  const { locale } = await params;
  const { search } = await searchParams;
  const t = await getTranslations({ locale });

  const searchTitle = t("menu.search") || "Tìm kiếm";
  const siteName = t("seo.siteName");

  const title = search
    ? `${searchTitle}: ${search} | ${siteName}`
    : `${searchTitle} | ${siteName}`;

  return {
    title,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPageRoot({
  params,
  searchParams,
}: SearchPageRootProps) {
  const { locale } = await params;
  const { search = "" } = await searchParams;

  let productsResponse = null;
  if (search && search.trim()) {
    productsResponse = await productService.getProducts({
      search: search.trim(),
      locale,
    });
  }

  const products = productsResponse?.data || [];
  const meta = productsResponse?.meta || null;

  return (
    <SearchPage
      products={products}
      meta={meta}
      initialSearch={search}
      locale={locale}
    />
  );
}
