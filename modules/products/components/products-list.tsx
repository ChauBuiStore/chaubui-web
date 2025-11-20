'use client';

import { XLoadMore, XProduct, XSkeletonProduct } from '@/components/common';
import { PaginationMeta } from '@/lib/types';
import { Product } from '@/modules/products/types';
import { useTranslations } from 'next-intl';
import { useLoadMoreProducts } from '@/modules/products/hooks';

interface ProductsListProps {
  initialProducts: Product[];
  initialMeta?: PaginationMeta;
  locale: string;
}

export function ProductsList({
  initialProducts,
  initialMeta,
  locale,
}: ProductsListProps) {
  const t = useTranslations('product');
  const { products, isLoading, hasMore, handleLoadMore } = useLoadMoreProducts({
    initialProducts,
    initialMeta,
    locale,
  });

  if (products.length === 0 && !isLoading) {
    return (
      <div className="text-center">
        <p className="text-gray-500 text-lg">{t('noProductsFound')}</p>
      </div>
    );
  }

  if (products.length === 0 && isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <XSkeletonProduct key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {products.map((product, index) => (
          <XProduct
            key={`${product.id}-${index}`}
            product={product}
            priority={index < 4}
          />
        ))}
        {isLoading && (
          <>
            {[...Array(4)].map((_, i) => (
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

