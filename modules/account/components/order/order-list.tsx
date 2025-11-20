"use client";

import { useTranslations } from "@/lib/hooks";
import { formatPrice } from "@/lib/utils";
import { Package } from "lucide-react";
import { getStatusText, getStatusColor, formatOrderDate } from "../../helpers";

const MOCK_ORDERS = [
  {
    id: "ORD001",
    date: "2025-10-05",
    status: "delivered",
    total: 2500000,
    items: 3,
  },
  {
    id: "ORD002",
    date: "2025-10-01",
    status: "shipping",
    total: 1800000,
    items: 2,
  },
];

export function OrderList() {
  const t = useTranslations("account");

  if (MOCK_ORDERS.length === 0) {
    return (
      <div className="text-center py-8">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">{t("noOrders")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {MOCK_ORDERS.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-6 hover:border-primary/50 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">
                {t("orderCode")}: {order.id}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("orderDate")}: <time dateTime={order.date}>{formatOrderDate(order.date)}</time>
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusText(order.status, t)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {order.items} {t("products")}
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{t("total")}</div>
              <div className="font-semibold text-lg text-primary">
                {formatPrice(order.total)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
