import type {
  AddToCartInput,
  Cart,
  CartItem,
  CartStorage,
  UpdateCartItemInput,
} from "@/modules/cart/types";

const CART_STORAGE_KEY = "chaubui-cart";
const CART_VERSION = "2.0";

function getEmptyCart(): Cart {
  return {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  };
}

function generateItemId(productId: string, sizeId?: string, colorId?: string): string {
  const parts = [productId];
  if (sizeId) parts.push(sizeId);
  if (colorId) parts.push(colorId);
  return parts.join("-");
}

function recalculateCart(cart: Cart): Cart {
  const totalItems = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    ...cart,
    totalItems,
    totalPrice,
  };
}

export const cartService = {
  getCart(): Cart {
    if (typeof window === "undefined") {
      return getEmptyCart();
    }

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) {
        return getEmptyCart();
      }

      const data: CartStorage = JSON.parse(stored);

      if (data.version !== CART_VERSION) {
        cartService.clearCart();
        return getEmptyCart();
      }

      return data.cart;
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      return getEmptyCart();
    }
  },

  saveCart(cart: Cart): void {
    if (typeof window === "undefined") return;

    try {
      const storage: CartStorage = {
        version: CART_VERSION,
        cart: {
          ...cart,
          updatedAt: new Date().toISOString(),
        },
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(storage));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  },

  addItem(input: AddToCartInput): Cart {
    const cart = cartService.getCart();
    const quantity = input.quantity || 1;

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId === input.productId &&
        item.size?.id === input.size?.id &&
        item.color?.id === input.color?.id
    );

    if (existingItemIndex >= 0) {
      const existingItem = cart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        variantId: input.variantId ?? existingItem.variantId,
      };
    } else {
      const newItem: CartItem = {
        id: generateItemId(input.productId, input.size?.id, input.color?.id),
        productId: input.productId,
        productSlug: input.productSlug,
        name: input.name,
        nameVi: input.nameVi,
        nameEn: input.nameEn,
        nameKm: input.nameKm,
        price: input.price,
        quantity,
        image: input.image,
        size: input.size,
        color: input.color,
        variantId: input.variantId,
      };

      cart.items.push(newItem);
    }

    const updatedCart = recalculateCart(cart);
    cartService.saveCart(updatedCart);

    return updatedCart;
  },

  updateItem(itemId: string, input: UpdateCartItemInput): Cart {
    const cart = cartService.getCart();
    const itemIndex = cart.items.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
    }

    const item = cart.items[itemIndex];

    if (input.quantity <= 0) {
      throw new Error("Số lượng phải lớn hơn 0");
    }

    cart.items[itemIndex] = {
      ...item,
      quantity: input.quantity,
    };

    const updatedCart = recalculateCart(cart);
    cartService.saveCart(updatedCart);

    return updatedCart;
  },

  removeItem(itemId: string): Cart {
    const cart = cartService.getCart();
    cart.items = cart.items.filter((item) => item.id !== itemId);

    const updatedCart = recalculateCart(cart);
    cartService.saveCart(updatedCart);

    return updatedCart;
  },

  clearCart(): Cart {
    const emptyCart = getEmptyCart();
    cartService.saveCart(emptyCart);
    return emptyCart;
  },
};

