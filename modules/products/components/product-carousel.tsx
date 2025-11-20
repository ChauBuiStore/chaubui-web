'use client';

import { XCard, XThumbnailButton } from '@/components/common';
import { useCarouselScroll } from '@/lib/hooks';
import { ProductImage as ProductImageType } from '../types';
import { getProductImageAlt } from '../helpers';
import { ProductImage } from './product-image';
import { useProductCarousel, createGoToImageHandler } from '../hooks';

interface ProductCarouselProps {
  images: ProductImageType[];
}

export function ProductCarousel({ images }: ProductCarouselProps) {
  const { currentImageIndex, goToImage: goToImageHandler } = useProductCarousel(images.length);

  const { containerRef: desktopThumbnailRef } = useCarouselScroll({
    currentIndex: currentImageIndex,
    containerSelector: 'thumbnail'
  });

  const { containerRef: mobileThumbnailRef } = useCarouselScroll({
    currentIndex: currentImageIndex,
    containerSelector: 'thumbnail',
    scrollInline: 'center'
  });

  const { containerRef: imageScrollRef, scrollToIndex } = useCarouselScroll({
    currentIndex: currentImageIndex,
    containerSelector: 'image',
    scrollBlock: 'center',
    disableAutoScroll: true
  });

  const goToImage = createGoToImageHandler(goToImageHandler, scrollToIndex);

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-square bg-muted rounded-lg">
        <span className="text-muted-foreground">Không có hình ảnh</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div
        className="hidden md:flex flex-col gap-3 sticky top-20 self-start max-h-[calc(100vh-2rem)] overflow-y-auto scrollbar-hide"
        ref={desktopThumbnailRef}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {images.map((image, index) => {
          const altText = getProductImageAlt(image, index, "Xem hình ảnh");

          return (
            <XThumbnailButton
              key={index}
              image={{ src: image.file.url, alt: altText }}
              index={index}
              isActive={index === currentImageIndex}
              onClick={goToImage}
              size="md"
            />
          );
        })}
      </div>
      <div className="flex-1">
        <XCard className="p-0 overflow-hidden shadow-none border-none bg-transparent">
          <div className="p-0">
            <div ref={imageScrollRef} className="hidden md:flex flex-col gap-4 h-full">
              {images.map((image, index) => (
                <div key={index} data-image-index={index} className="relative w-full flex-shrink-0 flex items-center justify-center">
                  <ProductImage image={image} index={index} />
                </div>
              ))}
            </div>
            <div className="md:hidden relative h-[250px] overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                    <ProductImage image={image} index={index} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </XCard>
        <div className="md:hidden mt-3">
          <div
            ref={mobileThumbnailRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {images.map((image, index) => {
              const altText = getProductImageAlt(image, index, "Xem hình ảnh");

              return (
                <XThumbnailButton
                  key={index}
                  image={{ src: image.file.url, alt: altText }}
                  index={index}
                  isActive={index === currentImageIndex}
                  onClick={goToImage}
                  size="sm"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
