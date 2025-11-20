"use client";

import { XButton, XInput } from "@/components/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth, useTranslations } from "@/lib/hooks";
import { createLoginSchema, type LoginFormData } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps = {}) {
  const t = useTranslations("auth");
  const tCheckout = useTranslations("checkout");
  const locale = useLocale() as 'vi' | 'en' | 'km';

  const { login, isLoggingIn } = useAuth();

  const loginSchema = createLoginSchema(locale);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const isPending = isLoggingIn;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>{tCheckout("email")} *</FormLabel>
              <FormControl>
                <XInput
                  type="email"
                  placeholder={tCheckout("emailPlaceholder")}
                  {...field}
                  className={`border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                    }`}
                />
              </FormControl>
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>{t("password")} *</FormLabel>
              <FormControl>
                <XInput
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  {...field}
                  className={`border-gray-300 focus:border-gray-900 focus:ring-gray-900 ${errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : ""
                    }`}
                />
              </FormControl>
              {errors.password && (
                <FormMessage>{errors.password.message}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <XButton disabled={isPending} className="w-full uppercase">
          {t("login")}
        </XButton>
      </form>
    </Form>
  );
}
