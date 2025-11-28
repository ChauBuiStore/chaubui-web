"use client";

import { ProductCarousel, ProductInfo } from "../components";
import { Product } from "../types";
import { prepareProductImages } from "../helpers";

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({
  product,
}: ProductDetailPageProps) {
  const displayImages = prepareProductImages(product);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
      <div className="lg:col-span-7">
        <ProductCarousel images={displayImages} />
      </div>

      <div className="lg:col-span-5 sticky top-4 h-fit">
        <h1 id="product-title" className="text-2xl md:text-3xl font-bold mb-4">
          {product.name}
        </h1>
        <ProductInfo product={product} />
      </div>
    </section>
  );
}

