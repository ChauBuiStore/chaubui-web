import { User } from "./user.type";

export interface CreateOrderItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CreateOrderRequest {
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  items: CreateOrderItem[];
}

export interface OrderItemProduct {
  id: string;
  nameVi: string;
  nameEn: string;
  thumbnailUrl?: string;
}

export interface OrderItemVariant {
  id: string;
  color: {
    id: string;
    nameVi: string;
    code: string;
  };
  originalPrice: number;
  salePrice: number;
}

export interface OrderItem {
  id: string;
  product: OrderItemProduct;
  variant: OrderItemVariant;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export enum OrderStatus {
  NEW = "NEW",
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPING = "SHIPPING",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export interface Order {
  id: string;
  orderId: string;
  userId?: string;
  user: User | null;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  paidAmount: number;
  refundAmount: number;
  status: OrderStatus | string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

