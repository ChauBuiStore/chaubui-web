"use client";

import { ROUTER } from "@/lib/constants";
import { useAuth } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { AccountMenu } from "./account-menu";
import { XSkeletonAccountLayout } from "@/components/common";

interface AccountLayoutProps {
  children: ReactNode;
}

export function AccountLayout({ children }: AccountLayoutProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(ROUTER.HOME);
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <XSkeletonAccountLayout />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <AccountMenu />
        </div>

        <div className="lg:col-span-9">{children}</div>
      </div>
    </div>
  );
}
