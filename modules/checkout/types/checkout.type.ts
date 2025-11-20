export interface CheckoutContact {
  email: string;
  phone: string;
  fullName: string;
}

export interface CheckoutAddress {
  address: string;
  note?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays?: string;
  description?: string;
}

export interface CheckoutData {
  contact: CheckoutContact;
  shippingAddress: CheckoutAddress;
  note?: string;
}

export interface OrderData {
  contact: CheckoutContact;
  address: CheckoutAddress;
  orderCode: string;
}

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  contact: CheckoutContact;
  shippingAddress: CheckoutAddress;
  shippingMethod: ShippingMethod;
  items: Array<{
    productId: string;
    productSlug: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    variantId?: string;
    variantName?: string;
  }>;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: "pending" | "confirmed" | "shipping" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}
