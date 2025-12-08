import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { QUERY_KEYS } from "@/lib/constants";
import { productService } from "@/lib/services/product.service";
import { PaginationMeta, ApiResponse } from "@/lib/types";
import { Product } from "../types";
import { useToast, useTranslations } from "@/lib/hooks";
import { buildLoadMoreParams, type LoadMoreParams } from "@/lib/helpers";

interface UseLoadMoreProductsParams {
  initialProducts: Product[];
  initialMeta?: PaginationMeta;
  locale: string;
  searchQuery?: string;
  categoryGroupSlug?: string;
  categorySlug?: string;
}

export function useLoadMoreProducts({
  initialProducts,
  initialMeta,
  locale,
  searchQuery,
  categoryGroupSlug,
  categorySlug,
}: UseLoadMoreProductsParams) {
  const toast = useToast();
  const t = useTranslations("product");
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const productsArray = useMemo(
    () => (Array.isArray(initialProducts) ? initialProducts : []),
    [initialProducts]
  );

  const queryKey = [
    QUERY_KEYS.PRODUCTS,
    QUERY_KEYS.PRODUCTS_LOAD_MORE,
    locale,
    searchQuery,
    categoryGroupSlug,
    categorySlug,
  ];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<ApiResponse<Product[]>, Error>({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const params: LoadMoreParams = buildLoadMoreParams(
        pageParam as number,
        initialMeta,
        locale,
        searchQuery,
        categoryGroupSlug,
        categorySlug
      );

      return await productService.getProducts(params);
    },
    getNextPageParam: (
      lastPage: ApiResponse<Product[]>,
      allPages: ApiResponse<Product[]>[]
    ) => {
      const currentPage = allPages.length;
      const totalPages = lastPage.meta?.totalPages || 1;

      if (currentPage < totalPages) {
        return currentPage + 1;
      }
      return undefined;
    },
    initialData: productsArray.length > 0
      ? {
        pages: [
          {
            data: productsArray,
            meta: initialMeta,
            message: "",
            status: "success" as const,
            statusCode: 200,
          },
        ],
        pageParams: [1],
      }
      : undefined,
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || t("loadMoreError"));
    }
  }, [error, toast, t]);

  const uniqueProducts = useMemo(() => {
    const allProducts = data?.pages
      ? data.pages.flatMap((page: ApiResponse<Product[]>) => page.data || [])
      : productsArray;

    const productMap = new Map<string, Product>();
    allProducts.forEach((product) => {
      productMap.set(product.id, product);
    });
    return Array.from(productMap.values());
  }, [data, productsArray]);

  const hasMore =
    hasNextPage ??
    (initialMeta
      ? (initialMeta.currentPage || 1) < (initialMeta.totalPages || 1)
      : false);

  const handleLoadMore = async () => {
    if (!hasMore || isFetchingNextPage) return;

    await fetchNextPage();

  };

  return {
    products: uniqueProducts,
    isLoading: isLoading || isFetchingNextPage,
    hasMore,
    handleLoadMore,
    loadMoreRef,
  };
}

