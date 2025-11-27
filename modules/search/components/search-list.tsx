'use client';

import { XLoadMore, XProduct, XSkeletonProduct } from '@/components/common';
import { PaginationMeta } from '@/lib/types';
import { Product } from '@/modules/products/types';
import { useTranslations } from 'next-intl';
import { useLoadMoreProducts } from '@/modules/products/hooks';

interface SearchListProps {
  initialProducts: Product[];
  initialMeta?: PaginationMeta;
  searchQuery: string;
  locale: string;
}

export function SearchList({
  initialProducts,
  initialMeta,
  searchQuery,
  locale,
}: SearchListProps) {
  const t = useTranslations('product');
  const { products, isLoading, hasMore, handleLoadMore } = useLoadMoreProducts({
    initialProducts,
    initialMeta,
        locale,
    searchQuery,
  });

  if (products.length === 0 && isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mb-8">
        {[...Array(10)].map((_, i) => (
          <XSkeletonProduct key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mb-8">
        {products.map((product: Product, index: number) => (
          <XProduct
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
        {isLoading && (
          <>
            {[...Array(5)].map((_, i) => (
              <XSkeletonProduct key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </div>

      {products.length > 0 && (
        <XLoadMore
          onLoadMore={handleLoadMore}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMoreText={t('loadMore')}
        />
      )}
    </>
  );
}

