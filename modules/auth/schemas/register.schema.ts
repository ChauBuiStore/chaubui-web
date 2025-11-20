import { z } from "zod"
import { t } from "@/lib/i18n"

export const createRegisterSchema = (locale: 'vi' | 'en' | 'km' = 'vi') => z.object({
  userName: z
    .string()
    .min(1, t("auth.validation.userNameRequired", {}, locale))
    .min(2, t("auth.validation.userNameMin", {}, locale)),
  fullName: z.string().optional().nullable(),
  gender: z.enum(["male", "female"], {
    message: t("auth.validation.genderRequired", {}, locale)
  }),
  email: z
    .string()
    .min(1, t("auth.validation.emailRequired", {}, locale))
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: t("auth.validation.emailInvalid", {}, locale)
    }),
  dateOfBirth: z.date().optional().refine((date) => date !== undefined, {
    message: t("auth.validation.dateOfBirthRequired", {}, locale)
  }),
  password: z
    .string()
    .min(1, t("auth.validation.passwordRequired", {}, locale))
    .min(8, t("auth.validation.passwordMin", { min: 8 }, locale)),
})

export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>