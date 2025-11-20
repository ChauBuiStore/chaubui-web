'use client';

import { XButton } from '@/components/common';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface XLoadMoreProps {
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  loadMoreText?: string;
  className?: string;
}

const XLoadMore = React.forwardRef<HTMLDivElement, XLoadMoreProps>(
  ({ 
    onLoadMore, 
    isLoading = false, 
    hasMore = true,
    loadMoreText = 'Xem thêm',
    className = '',
  }, ref) => {
    if (!hasMore && !isLoading) {
      return null;
    }

    return (
      <div ref={ref} className={`text-center py-8 ${className}`}>
        <XButton
          onClick={onLoadMore}
          disabled={isLoading || !hasMore}
          variant="default"
          size="lg"
          className="uppercase"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Đang tải...' : loadMoreText}
        </XButton>
      </div>
    );
  }
);

XLoadMore.displayName = 'XLoadMore';

export { XLoadMore };
export type { XLoadMoreProps };

