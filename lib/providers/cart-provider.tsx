"use client";

import { useHydrateCartStore } from "@/lib/stores/cart.store";

export function CartProvider({ children }: { children: React.ReactNode }) {
  useHydrateCartStore();
  return <>{children}</>;
}

