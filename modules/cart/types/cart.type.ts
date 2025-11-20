import { Color } from "@/lib/types/color.type";
import { Size } from "@/lib/types/size.type";

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  price: number;
  quantity: number;
  image?: string;
  size?: Size;
  color?: Color;
  variantId?: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt?: string;
}

export interface AddToCartInput {
  productId: string;
  productSlug: string;
  name: string;
  nameVi?: string;
  nameEn?: string;
  nameKm?: string;
  price: number;
  quantity?: number;
  image?: string;
  size?: Size;
  color?: Color;
  variantId?: string;
}

export interface UpdateCartItemInput {
  quantity: number;
}

export interface CartStorage {
  version: string;
  cart: Cart;
}

