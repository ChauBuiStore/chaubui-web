import { ProductVariant } from "./product-variant.type";
import { ProductImage } from "./product-image.type";
import { Category } from "@/lib/types/category-group.type";

export interface Product {
  id: string;
  name: string;
  thumbnailUrl: string;
  nameVi: string;
  nameEn: string;
  nameKm: string;
  slug: string;
  stock?: number;
  originalPrice?: number;
  salePrice?: number;
  discountPercent?: number;
  variants?: ProductVariant[];
}

export interface ProductDetail extends Product {
  thumbnailId?: string;
  description?: string;
  images?: ProductImage[];
  category?: Category;
}