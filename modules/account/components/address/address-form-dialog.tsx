"use client";

import { XButton, XDialog, XInput } from "@/components/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "../../schemas/address.schema";
import { Address } from "../../types";
import { useTranslations } from "@/lib/hooks";

interface AddressFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AddressFormData) => void;
  address?: Address | null;
}

export function AddressFormDialog({
  open,
  onOpenChange,
  onSubmit,
  address,
}: AddressFormDialogProps) {
  const t = useTranslations("address");
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      isDefault: false,
    },
  });

  useEffect(() => {
    if (address) {
      form.reset(address);
    } else {
      form.reset({
        fullName: "",
        phone: "",
        address: "",
        isDefault: false,
      });
    }
  }, [address, form]);

  const handleSubmit = (data: AddressFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <XDialog
      open={open}
      onOpenChange={onOpenChange}
      title={address ? t("editAddress") : t("addAddress")}
      description={t("description")}
      footer={
        <>
          <XButton
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("cancel")}
          </XButton>
          <XButton
            type="submit"
            form="address-form"
            className="bg-red-500 hover:bg-red-600"
          >
            {address ? t("update") : t("add")}
          </XButton>
        </>
      }
    >
      <Form {...form}>
        <form
          id="address-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fullName")} *</FormLabel>
                <FormControl>
                  <XInput placeholder={t("fullNamePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")} *</FormLabel>
                <FormControl>
                  <XInput
                    type="tel"
                    placeholder={t("phonePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address")} *</FormLabel>
                <FormControl>
                  <XInput placeholder={t("addressPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isDefault"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="w-4 h-4 cursor-pointer"
                  />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">
                  {t("setAsDefault")}
                </FormLabel>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </XDialog>
  );
}
