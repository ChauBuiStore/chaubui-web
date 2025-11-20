import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  isDefault: z.boolean(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
