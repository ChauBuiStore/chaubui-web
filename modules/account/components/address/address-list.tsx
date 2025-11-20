"use client";

import { XButton } from "@/components/common";
import { useToast } from "@/lib/hooks";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddressFormData } from "../../schemas/address.schema";
import { Address } from "../../types";
import { AddressCard } from "../../components/address/address-card";
import { AddressFormDialog } from "../../components/address/address-form-dialog";
import {
  removeAddressById,
  setDefaultAddress,
  updateAddressInList,
  addAddressToList,
} from "../../helpers";

export function AddressList() {
  const toast = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      fullName: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      isDefault: true,
    },
  ]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsDialogOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsDialogOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(removeAddressById(addresses, id));
    toast.success("Đã xóa địa chỉ");
  };

  const handleSetDefault = (id: string) => {
    setAddresses(setDefaultAddress(addresses, id));
    toast.success("Đã đặt làm địa chỉ mặc định");
  };

  const handleSubmit = (data: AddressFormData) => {
    if (selectedAddress) {
      setAddresses(updateAddressInList(addresses, selectedAddress.id, data));
      toast.success("Đã cập nhật địa chỉ");
    } else {
      setAddresses(addAddressToList(addresses, data));
      toast.success("Đã thêm địa chỉ mới");
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Danh sách địa chỉ</h2>
        <XButton
          onClick={handleAddAddress}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm địa chỉ mới
        </XButton>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center bg-muted rounded-lg">
          <p className="text-muted-foreground mb-4">Bạn chưa có địa chỉ nào</p>
          <XButton
            onClick={handleAddAddress}
          >
            Thêm địa chỉ đầu tiên
          </XButton>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={handleEditAddress}
              onDelete={handleDeleteAddress}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      <AddressFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
        address={selectedAddress}
      />
    </div>
  );
}
