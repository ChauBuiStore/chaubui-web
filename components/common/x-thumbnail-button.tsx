import { XButton } from "@/components/common";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductImage {
  src: string;
  alt: string;
}

interface XThumbnailButtonProps {
  image: ProductImage;
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  size?: "sm" | "md";
  className?: string;
}

export function XThumbnailButton({
  image,
  index,
  isActive,
  onClick,
  size = "md",
  className,
}: XThumbnailButtonProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
  };

  const imageSize = {
    sm: 64,
    md: 80,
  };

  return (
    <XButton
      variant="ghost"
      size="sm"
      onClick={() => onClick(index)}
      data-thumbnail-index={index}
      className={cn(
        `${sizeClasses[size]} p-0 overflow-hidden transition-all duration-200 !bg-transparent flex-shrink-0 border-1 snap-start cursor-pointer`,
        isActive ? "border-2 border-gray-200" : "border-gray-100",
        className
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover"
        width={imageSize[size]}
        height={imageSize[size]}
        style={{ width: "auto", height: "auto" }}
      />
    </XButton>
  );
}
