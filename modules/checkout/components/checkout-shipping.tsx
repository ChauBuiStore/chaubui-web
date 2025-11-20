"use client";

import { XInput, XTextarea } from "@/components/common";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "@/lib/hooks";
import type { CheckoutFormValues } from "@/modules/checkout/schemas/checkout.schema";
import type { UseFormReturn } from "react-hook-form";

interface CheckoutShippingProps {
  form: UseFormReturn<CheckoutFormValues>;
}

export function CheckoutShippingForm({ form }: CheckoutShippingProps) {
  const t = useTranslations("checkout");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("shippingAddress")}</h3>

      <FormField
        control={form.control}
        name="address.address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("address")} <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <XInput
                placeholder={t("addressPlaceholder")}
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address.note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("note")}</FormLabel>
            <FormControl>
              <XTextarea
                placeholder={t("notePlaceholder")}
                rows={3}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

