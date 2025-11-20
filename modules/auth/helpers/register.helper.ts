import { formatDateForApi } from "./date.helper";
import type { RegisterFormData } from "../schemas/register.schema";
import type { RegisterRequest } from "../types";

export function transformRegisterFormToRequest(
  data: RegisterFormData
): RegisterRequest {
  const { dateOfBirth, ...rest } = data;
  return {
    ...rest,
    dateOfBirth: dateOfBirth ? formatDateForApi(dateOfBirth) : undefined,
  };
}

