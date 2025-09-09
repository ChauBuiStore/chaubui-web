"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product, EAvailabilityStatus } from "@/modules/product/types";

interface XProductProps extends Product {
  priority?: boolean;
}

export function XProduct({ priority = false, ...product }: XProductProps) {
  return (
    <Card className="overflow-hidden p-0 gap-0 border-none shadow-none group">
      <CardHeader className="p-0">
        <Link href="#">
          <div className="aspect-square bg-gray-200 relative cursor-pointer overflow-hidden rounded-3xl">
            {product.discountPercentage && product.discountPercentage > 0 ? (
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 z-10 bg-white text-red-500 rounded-none hover:bg-white transition-all duration-200 ease-in-out font-bold"
              >
                -{Math.round(product.discountPercentage)}%
              </Badge>
            ) : null}
            {product.availabilityStatus === EAvailabilityStatus.OUT_STOCK ? (
              <Badge
                variant="secondary"
                className="absolute bottom-2 right-2 z-10 bg-white text-red-500 rounded-none hover:bg-white transition-all duration-200 ease-in-out font-bold"
              >
                Hết hàng
              </Badge>
            ) : null}

            <Image
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-500 ease-in-out hover:scale-110 overflow-hidden"
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={priority}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="py-4 px-0">
        <Link href="#" className="block">
          <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200 ease-in-out cursor-pointer">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span
            className={`transition-colors duration-200 ease-in-out ${product.discountPercentage && product.discountPercentage > 0
                ? "text-red-500"
                : "text-black"
              }`}
          >
            {product.price}
          </span>
          {product.originalPrice && product.originalPrice > 0 ? (
            <span className="text-gray-500 line-through text-sm transition-colors duration-200 ease-in-out">
              {product.originalPrice}
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
