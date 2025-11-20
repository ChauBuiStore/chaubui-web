import { useState } from "react";
import { useAuth, useToast } from "@/lib/hooks";
import type { XDropdownMenuItem } from "@/components/common";

export function useAccountUser() {
  const { logout } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error));
    }
  };

  const createMenuItems = (logoutLabel: string): XDropdownMenuItem[] => [
    {
      id: "logout",
      label: logoutLabel,
      onClick: handleLogout,
      className: "text-destructive",
    },
  ];

  return {
    open,
    setOpen,
    handleLogout,
    createMenuItems,
  };
}

