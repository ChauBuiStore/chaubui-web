"use client";

import {
  XAvatar,
  XButton,
  XDropdownMenu,
} from "@/components/common";
import { getFirstLetter } from "@/lib/helpers";
import { useAuth, useTranslations } from "@/lib/hooks";
import { useAccountUser } from "../hooks";


export function AccountUser() {
  const t = useTranslations("auth");
  const { user } = useAuth();
  const firstLetter = getFirstLetter(user?.fullName);
  const { open, setOpen, createMenuItems } = useAccountUser();
  const menuItems = createMenuItems(t("logout"));

  return (
    <XDropdownMenu
      trigger={
        <XButton
          variant="ghost"
          size="icon"
          className="relative uppercase font-semibold !bg-transparent hover:text-primary h-9 w-9 sm:h-10 sm:w-10 touch-manipulation p-0"
          aria-label="Account menu"
        >
          <XAvatar
            size="sm"
            fallback={
              <span className="bg-muted text-muted-foreground text-xs sm:text-sm font-semibold">
                {firstLetter}
              </span>
            }
            className="bg-muted h-7 w-7 sm:h-8 sm:w-8"
          />
        </XButton>
      }
      label={
        <div className="flex flex-col">
          <span className="font-medium">{user?.fullName || ""}</span>
          {user?.email ? (
            <span className="text-xs text-muted-foreground">{user.email}</span>
          ) : null}
        </div>
      }
      items={menuItems}
      align="end"
      sideOffset={8}
      side="bottom"
      contentClassName="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] lg:w-64"
      showChevron={false}
      open={open}
      onOpenChange={setOpen}
    />
  );
}
