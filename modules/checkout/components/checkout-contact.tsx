"use client";

import { XInput } from "@/components/common";
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

interface CheckoutContactProps {
  form: UseFormReturn<CheckoutFormValues>;
}

export function CheckoutContactForm({ form }: CheckoutContactProps) {
  const t = useTranslations("checkout");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t("contactInfo")}</h3>

      <FormField
        control={form.control}
        name="contact.fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("fullName")} <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <XInput
                placeholder={t("fullNamePlaceholder")}
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
        name="contact.email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("email")} <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <XInput
                type="email"
                placeholder={t("emailPlaceholder")}
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
        name="contact.phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t("phone")} <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <XInput
                type="tel"
                placeholder={t("phonePlaceholder")}
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
