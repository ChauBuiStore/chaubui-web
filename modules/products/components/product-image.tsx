import Image from "next/image";
import { ProductImage as ProductImageType } from "../types";

export function ProductImage({ image, index }: { image: ProductImageType; index: number }) {
  const altText = image.alt && image.alt.trim() && !image.alt.toLowerCase().includes('thumbnail') && !image.alt.toLowerCase().includes('image')
    ? image.alt
    : `Hình ảnh ${index + 1} của sản phẩm`;

  return (
    <Image
      src={image.file.url}
      alt={altText}
      className="w-full h-full object-cover"
      width={300}
      height={300}
      style={{ width: "100%", height: "100%" }}
      priority={index < 2}
    />
  );
}

