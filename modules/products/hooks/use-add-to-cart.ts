import { useState, useRef, useEffect } from "react";
import { useToast } from "@/lib/hooks";
import { useCart } from "@/modules/cart/hooks";
import { createAddToCartInput } from "@/modules/cart/helpers";
import { Product, ProductVariant } from "../types";

export function useAddToCart(
  product: Product,
  selectedVariant: ProductVariant | null,
  quantity: number,
  onSuccess?: () => void
) {
  const { addToCart } = useCart();
  const toast = useToast();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);

    try {
      const addToCartInput = createAddToCartInput(
        product,
        selectedVariant,
        quantity
      );
      addToCart(addToCartInput);
      if (onSuccessRef.current) {
        onSuccessRef.current();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    } finally {
      setIsAdding(false);
    }
  };

  return {
    isAdding,
    handleAddToCart,
  };
}

