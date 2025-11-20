"use client";

import { XSkeletonAccount } from "@/components/common";
import { useAuth } from "@/lib/hooks";
import { AccountGuest } from "./account-guest";
import { AccountUser } from "./account-user";

export function AccountHeader() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <XSkeletonAccount />;
  }

  if (isAuthenticated) {
    return <AccountUser />;
  }

  return <AccountGuest />;
}

