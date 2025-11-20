"use client";

import { ROUTER } from "@/lib/constants";
import { useAuth, useToast, useTranslations } from "@/lib/hooks";
import { orderService } from "@/lib/services/order.service";
import { useLoginStore } from "@/lib/stores";
import { ApiResponse } from "@/lib/types/response.type";
import type { Order } from "@/modules/account/types";
import { useCart } from "@/modules/cart/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, type MouseEvent } from "react";
import { useForm } from "react-hook-form";
import {
  createDefaultFormValues,
  createOrderRequestFromCart,
  convertToOrderFormData,
  isFormEmpty,
  saveErrorToStorage,
} from "../helpers";
import {
  createCheckoutSchemas,
  type CheckoutFormValues,
} from "../schemas/checkout.schema";

export function useCheckout() {
  const t = useTranslations("checkout");
  const toast = useToast();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { items: cartItems, clearCart } = useCart();

  const { checkoutFormSchema } = createCheckoutSchemas(t);
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: createDefaultFormValues(),
  });

  useEffect(() => {
    const currentValues = form.getValues();

    if (isAuthenticated && user) {
      if (isFormEmpty(currentValues)) {
        form.reset(createDefaultFormValues(user));
      }
    } else if (!isAuthenticated) {
      form.reset(createDefaultFormValues());
    }
  }, [isAuthenticated, user, form]);

  const createOrderMutation = useMutation<
    ApiResponse<Order>,
    Error,
    CheckoutFormValues
  >({
    mutationFn: async (data: CheckoutFormValues) => {
      if (!cartItems || cartItems.length === 0) {
        throw new Error(t("cartEmpty"));
      }

      const formData = convertToOrderFormData(data);
      const userId = isAuthenticated && user ? user.id : undefined;
      const orderRequest = createOrderRequestFromCart(
        cartItems,
        formData,
        userId
      );

      const response = await orderService.createOrder(orderRequest);

      if (!response.data) {
        throw new Error(response.message || t("orderError"));
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("orderSuccess"));
      clearCart();
      router.push(ROUTER.CHECKOUT_SUCCESS);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || t("orderError");
      toast.error(errorMessage);

      const isCartEmptyError = errorMessage === t("cartEmpty");

      if (!isCartEmptyError) {
        saveErrorToStorage(errorMessage);
        router.push(ROUTER.CHECKOUT_FAILED);
      }
    },
  });

  const handleSubmit = form.handleSubmit((data: CheckoutFormValues) => {
    createOrderMutation.mutate(data);
  });

  const handleLoginClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    useLoginStore.getState().setShouldOpen(true);
  };

  return {
    form,
    isProcessing: createOrderMutation.isPending,
    handleSubmit,
    handleLoginClick,
  };
}
