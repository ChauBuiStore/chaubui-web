import { Color } from "@/lib/types/color.type";
import { Size } from "@/lib/types/size.type";

export enum VariantType {
  COLOR = "COLOR",
  SIZE = "SIZE",
  COMBO = "COMBO",
  NONE = "NONE",
}

export interface ProductVariant {
  id: string;
  size?: Size;
  color?: Color;
  stock?: number;
  originalPrice?: number;
  discountPercent?: number;
  salePrice?: number;
  variantType?: VariantType;
}
