"use client";

import { XButton, XInput, XPopover, XRadioGroup } from "@/components/common";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ROUTER } from "@/lib/constants";
import { useAuth, useTranslations } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { vi } from "date-fns/locale";
import { transformRegisterFormToRequest, getGenderOptions, formatDateForApi } from "../helpers";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  ChevronDown,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createRegisterSchema,
  type RegisterFormData,
} from "../schemas/register.schema";

export function RegisterForm() {
  const t = useTranslations("auth");
  const tCheckout = useTranslations("checkout");
  const locale = useLocale() as "vi" | "en" | "km";
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const router = useRouter();

  const { register, isRegistering } = useAuth();
  const GENDER_OPTIONS = getGenderOptions(t("female"), t("male"));

  const registerSchema = createRegisterSchema(locale);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userName: "",
      fullName: "",
      gender: "female",
      email: "",
      dateOfBirth: undefined,
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const payload = transformRegisterFormToRequest(data);

    try {
      await register(payload);
      toast.success(t("registerSuccess"));
      form.reset();
      router.push(ROUTER.HOME);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const isPending = isRegistering;

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
            {t("createAccount")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("loginDescription")}
          </p>
        </div>

        <div className="bg-card shadow-lg rounded-lg border border-border p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="userName"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("userName")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <XInput
                          placeholder={t("userNamePlaceholder")}
                          {...field}
                          value={field.value ?? ""}
                          className={`pl-10 ${errors.userName
                            ? "border-destructive focus:border-destructive focus:ring-destructive"
                            : ""
                            }`}
                        />
                      </div>
                    </FormControl>
                    {errors.userName && (
                      <FormMessage>{errors.userName.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("fullName")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <XInput
                          placeholder={t("fullNamePlaceholder")}
                          {...field}
                          value={field.value ?? ""}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("gender")}
                    </FormLabel>
                    <FormControl>
                      <XRadioGroup
                        options={GENDER_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                        orientation="horizontal"
                      />
                    </FormControl>
                    {errors.gender && (
                      <FormMessage>{errors.gender.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {t("dateOfBirth")}
                    </FormLabel>
                    <FormControl>
                      <XPopover
                        open={calendarOpen}
                        onOpenChange={setCalendarOpen}
                        align="start"
                        contentClassName="w-auto p-0"
                        trigger={
                          <XButton
                            variant="outline"
                            className={`w-full px-3 justify-between focus:ring-0 ${errors.dateOfBirth
                              ? "border-destructive focus:border-destructive focus:ring-destructive"
                              : ""
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                              {field.value ? (
                                <span className="text-foreground text-sm font-normal">
                                  {formatDateForApi(field.value)}
                                </span>
                              ) : (
                                <span className="text-muted-foreground text-sm font-normal">
                                  {t("dateOfBirthPlaceholder")}
                                </span>
                              )}
                            </div>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </XButton>
                        }
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          captionLayout="dropdown"
                          locale={vi}
                        />
                      </XPopover>
                    </FormControl>
                    {errors.dateOfBirth && (
                      <FormMessage>{errors.dateOfBirth.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, formState: { errors } }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      {tCheckout("email")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <XInput
                          type="email"
                          placeholder={tCheckout("emailPlaceholder")}
                          {...field}
                          value={field.value ?? ""}
                          className={`pl-10 ${errors.email
                            ? "border-destructive focus:border-destructive focus:ring-destructive"
                            : ""
                            }`}
                        />
                      </div>
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
                    <FormLabel className="text-sm font-medium">
                      {t("password")}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <XInput
                          type="password"
                          placeholder={t("passwordPlaceholder")}
                          {...field}
                          value={field.value ?? ""}
                          className={`pl-10 ${errors.password
                            ? "border-destructive focus:border-destructive focus:ring-destructive"
                            : ""
                            }`}
                        />
                      </div>
                    </FormControl>
                    {errors.password && (
                      <FormMessage>{errors.password.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <XButton
                type="submit"
                disabled={isPending}
                className="w-full h-11 text-base font-semibold uppercase"
              >
                {isPending ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {t("processing")}
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-5 w-5" />
                    {t("register")}
                  </>
                )}
              </XButton>
            </form>
          </Form>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={ROUTER.HOME}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
