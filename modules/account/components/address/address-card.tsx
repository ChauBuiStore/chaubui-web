"use client";

import { XBadge, XButton, XCard } from "@/components/common";
import { Pencil, Trash2 } from "lucide-react";
import { Address } from "../../types";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <XCard
      className="hover:shadow-md transition-shadow"
      title={
        <div className="flex items-center gap-2">
          <span>{address.fullName}</span>
          {address.isDefault && (
            <XBadge variant="destructive">Mặc định</XBadge>
          )}
        </div>
      }
      action={
        <div className="flex gap-2">
          <XButton
            variant="ghost"
            size="sm"
            onClick={() => onEdit(address)}
            className="hover:text-primary"
          >
            <Pencil className="w-4 h-4" />
          </XButton>
          <XButton
            variant="ghost"
            size="sm"
            onClick={() => onDelete(address.id)}
            className="hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </XButton>
        </div>
      }
    >
      <div className="space-y-2 px-6">
        <p className="text-muted-foreground">{address.phone}</p>
        <p className="text-muted-foreground">{address.address}</p>
      </div>

      {!address.isDefault && (
        <div className="flex items-center px-6 border-t pt-6">
          <XButton
            variant="outline"
            size="sm"
            onClick={() => onSetDefault(address.id)}
            className="text-sm"
          >
            Đặt làm địa chỉ mặc định
          </XButton>
        </div>
      )}
    </XCard>
  );
}
