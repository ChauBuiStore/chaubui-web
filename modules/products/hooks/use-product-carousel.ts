import { useState } from "react";

export function useProductCarousel(imagesLength: number) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToImage = (index: number) => {
    if (index >= 0 && index < imagesLength) {
      setCurrentImageIndex(index);
    }
  };

  return {
    currentImageIndex,
    goToImage,
  };
}

export function createGoToImageHandler(
  goToImage: (index: number) => void,
  scrollToIndex?: (index: number) => void
) {
  return (index: number) => {
    goToImage(index);
    scrollToIndex?.(index);
  };
}
