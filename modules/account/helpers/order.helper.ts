export function getStatusText(status: string, t: (key: string) => string): string {
  const statusMap: Record<string, string> = {
    pending: t("orderStatus.pending"),
    processing: t("orderStatus.processing"),
    shipping: t("orderStatus.shipping"),
    delivered: t("orderStatus.delivered"),
    cancelled: t("orderStatus.cancelled"),
  };
  return statusMap[status] || status;
}

export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    shipping: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    cancelled: "bg-destructive/10 text-destructive",
  };
  return colorMap[status] || "bg-muted text-muted-foreground";
}

