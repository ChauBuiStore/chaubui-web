import type { Address } from "../types";
import type { AddressFormData } from "../schemas/address.schema";

export function removeAddressById(addresses: Address[], id: string): Address[] {
  return addresses.filter((addr) => addr.id !== id);
}

export function setDefaultAddress(addresses: Address[], id: string): Address[] {
  return addresses.map((addr) => ({
    ...addr,
    isDefault: addr.id === id,
  }));
}

export function updateAddressInList(
  addresses: Address[],
  id: string,
  data: AddressFormData
): Address[] {
  return addresses.map((addr) =>
    addr.id === id
      ? {
          ...addr,
          ...data,
        }
      : addr
  );
}

export function addAddressToList(
  addresses: Address[],
  data: AddressFormData
): Address[] {
  const newAddress: Address = {
    id: Date.now().toString(),
    ...data,
    isDefault: addresses.length === 0,
  };
  return [...addresses, newAddress];
}
