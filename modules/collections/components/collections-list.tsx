'use client';

import { XLoadMore, XProduct, XSkeletonProduct } from '@/components/common';
import { PaginationMeta } from '@/lib/types';
import { Product } from '@/modules/products/types';
import { useTranslations } from 'next-intl';
import { useLoadMoreProducts } from '@/modules/products/hooks';
import { Package } from 'lucide-react';

interface CollectionsListProps {
  initialProducts: Product[];
  initialMeta?: PaginationMeta;
  locale: string;
  categoryGroupSlug?: string;
  categorySlug?: string;
}

export function CollectionsList({
  initialProducts,
  initialMeta,
  locale,
  categoryGroupSlug,
  categorySlug,
}: CollectionsListProps) {
  const t = useTranslations('product');
  const { products, isLoading, hasMore, handleLoadMore } = useLoadMoreProducts({
    initialProducts,
    initialMeta,
    locale,
    categoryGroupSlug,
    categorySlug,
  });

  if (products.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16 md:py-24">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground text-lg">{t('noProductsFound')}</p>
      </div>
    );
  }

  if (products.length === 0 && isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {[...Array(8)].map((_, i) => (
          <XSkeletonProduct key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <XProduct
            key={product.id}
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
    </div>
  );
}

