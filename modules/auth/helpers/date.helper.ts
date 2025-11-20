import { format } from "date-fns";

export function formatDateForApi(date: Date, formatString: string = "yyyy-MM-dd"): string {
  return format(date, formatString);
}

