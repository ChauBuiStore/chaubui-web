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
}: Pick<SearchPageRootProps, "params">): Promise<Metadata> {
  try {
    const { locale } = await params;
    let searchTitle = "Tìm kiếm";
    let siteName = "Livin N Decoration";
    
    try {
      const t = await getTranslations({ locale });
      searchTitle = t("menu.search") || "Tìm kiếm";
      siteName = t("seo.siteName");
    } catch (error) {
      console.error("Error loading translations for search page:", error);
    }

    const title = `${searchTitle} | ${siteName}`;

  return {
    title,
    robots: {
      index: false,
      follow: true,
    },
  };
  } catch (error) {
    console.error("Error generating metadata for search page:", error);
    return {
      title: "Tìm kiếm | Livin N Decoration",
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function SearchPageRoot({
  params,
  searchParams,
}: SearchPageRootProps) {
  const [{ locale }, { search = "" }] = await Promise.all([
    params,
    searchParams,
  ]);

  let productsResponse = null;
  if (search && search.trim()) {
    try {
      productsResponse = await productService.getProducts({
        search: search.trim(),
        locale,
        page: 1,
        limit: 12,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(`Error searching products for locale ${locale}:`, error);
      }
      productsResponse = null;
    }
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
