import { format } from "date-fns";
import { vi } from "date-fns/locale";

export function getGenderLabel(gender?: string): string {
  if (!gender) return "Chưa cập nhật";
  return gender === "male" ? "Nam" : "Nữ";
}

export function formatBirthday(birthday?: string): { display: string; dateTime: string | null } {
  if (!birthday) return { display: "Chưa cập nhật", dateTime: null };
  try {
    const date = new Date(birthday);
    return {
      display: format(date, "dd/MM/yyyy", { locale: vi }),
      dateTime: date.toISOString().split('T')[0],
    };
  } catch {
    return { display: "Chưa cập nhật", dateTime: null };
  }
}

