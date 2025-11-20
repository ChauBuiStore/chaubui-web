import { Category } from "@/lib/types/category-group.type";
import { ProductImage } from "./product-image.type";
import { ProductVariant, VariantType } from "./product-variant.type";

export interface Product {
  id: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  slug: string;
  description: string;
  stock: number;
  originalPrice: number;
  salePrice: number;
  discountPercent: number;
  category: Category;
  variantType: VariantType;
  variants: ProductVariant[];
  thumbnailUrl?: string;
  thumbnailId?: string;
  images: ProductImage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

