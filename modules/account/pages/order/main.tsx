"use client";

import { AccountLayout, OrderList } from "@/modules/account/components";

export function OrderPage() {
  return (
    <AccountLayout>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h2>
        <OrderList />
      </div>
    </AccountLayout>
  );
}

