"use client";

import { XButton, XMenu } from "@/components/common";
import { useAuth, useToast, useTranslations } from "@/lib/hooks";
import { LogOut } from "lucide-react";

export function AccountMenu() {
  const t = useTranslations("account");
  const { logout } = useAuth();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t("logoutSuccess"));
    } catch {
      toast.error(t("logoutError"));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <XMenu items={[]} orientation="vertical" className="mb-1" />

      <XButton
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start gap-3 px-3 py-2 text-sm font-bold uppercase hover:text-primary hover:bg-accent cursor-pointer rounded-md"
      >
        <LogOut className="w-4 h-4" />
        <span>{t("logout")}</span>
      </XButton>
    </div>
  );
}
