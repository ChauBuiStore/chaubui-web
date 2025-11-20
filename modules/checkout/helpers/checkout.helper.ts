import type { CreateOrderRequest, User } from "@/modules/account/types";
import type { CartItem } from "@/modules/cart/types";
import type { CheckoutFormValues } from "../schemas/checkout.schema";
import type { OrderFormData } from "../types";

export const CHECKOUT_ERROR_STORAGE_KEY = "checkoutError";

export function createOrderRequestFromCart(
  cartItems: CartItem[],
  formData: OrderFormData,
  userId?: string
): CreateOrderRequest {
  return {
    userId,
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    items: cartItems.map((item) => ({
      productId: item.productId,
      variantId: item.variantId!,
      quantity: item.quantity,
    })),
  };
}

export function createDefaultFormValues(
  user?: User | null
): CheckoutFormValues {
  if (!user) {
    return {
      contact: { fullName: "", email: "", phone: "" },
      address: { address: "", note: "" },
    };
  }

  return {
    contact: {
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
    },
    address: {
      address: user.address || "",
      note: "",
    },
  };
}

export function isFormEmpty(values: CheckoutFormValues): boolean {
  return (
    !values.contact.fullName &&
    !values.contact.email &&
    !values.contact.phone &&
    !values.address.address
  );
}

export function convertToOrderFormData(
  data: CheckoutFormValues
): OrderFormData {
  return {
    fullName: data.contact.fullName,
    email: data.contact.email,
    phone: data.contact.phone,
    address: data.address.address,
  };
}

export function saveErrorToStorage(errorMessage: string): void {
  try {
    localStorage.setItem(CHECKOUT_ERROR_STORAGE_KEY, errorMessage);
  } catch (error) {
    console.error("Failed to save error to localStorage:", error);
  }
}

