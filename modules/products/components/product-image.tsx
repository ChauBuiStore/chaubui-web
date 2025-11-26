"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage as ProductImageType } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductImageProps {
  image: ProductImageType;
  index: number;
  sizes?: string;
  quality?: number;
}

export function ProductImage({ 
  image, 
  index, 
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px",
  quality = 90
}: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const altText = image.alt && image.alt.trim() && !image.alt.toLowerCase().includes('thumbnail') && !image.alt.toLowerCase().includes('image')
    ? image.alt
    : `Hình ảnh ${index + 1} của sản phẩm`;

  const isPriority = index < 2;

  return (
    <div className="relative w-full aspect-square overflow-hidden">
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      <Image
        src={image.file.url}
        alt={altText}
        fill
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        sizes={sizes}
        quality={isPriority ? 95 : quality}
        priority={isPriority}
        loading={isPriority ? "eager" : "lazy"}
        placeholder="empty"
        onLoad={() => setIsLoading(false)}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}

