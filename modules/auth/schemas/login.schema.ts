import { t } from "@/lib/i18n";
import { z } from "zod";

export const createLoginSchema = (locale: "vi" | "en" | "km" = "vi") =>
  z.object({
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired", {}, locale))
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: t("auth.validation.emailInvalid", {}, locale),
      }),
    password: z
      .string()
      .min(1, t("auth.validation.passwordRequired", {}, locale))
      .min(6, t("auth.validation.passwordMin", { min: 6 }, locale)),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;


