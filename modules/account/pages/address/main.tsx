"use client";

import { AccountLayout } from "@/modules/account/components";
import { AddressList } from "@/modules/account/components/address/address-list";

export function AddressPage() {
  return (
    <AccountLayout>
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Địa chỉ của tôi</h2>
        <AddressList />
      </div>
    </AccountLayout>
  );
}

