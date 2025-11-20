import { z } from "zod";

export const createCheckoutSchemas = (t: (key: string) => string) => {
  const checkoutContactSchema = z.object({
    fullName: z.string().min(1, t("fullNameRequired")),
    email: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("emailInvalid"))
      .trim(),
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^[0-9]{10,11}$/, t("phoneInvalid")),
  });

  const checkoutAddressSchema = z.object({
    address: z.string().min(1, t("addressRequired")),
    note: z.string().optional(),
  });

  const checkoutFormSchema = z.object({
    contact: checkoutContactSchema,
    address: checkoutAddressSchema,
  });

  return { checkoutContactSchema, checkoutAddressSchema, checkoutFormSchema };
};

const defaultSchemas = createCheckoutSchemas(() => "");
export const checkoutContactSchema = defaultSchemas.checkoutContactSchema;
export const checkoutAddressSchema = defaultSchemas.checkoutAddressSchema;
export const checkoutFormSchema = defaultSchemas.checkoutFormSchema;

export type CheckoutContactSchema = z.infer<typeof checkoutContactSchema>;
export type CheckoutAddressSchema = z.infer<typeof checkoutAddressSchema>;
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
