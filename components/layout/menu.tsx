"use client";

import { XMenu } from "@/components/common";
import { ScrollArea } from "@/components/ui";
import { useTranslations } from "@/lib/hooks";
import type { MenuItem } from "@/lib/types";

interface MenuProps {
  menuItems: MenuItem[];
  onItemClick?: () => void;
}

export function Menu({ menuItems, onItemClick }: MenuProps) {
  const t = useTranslations();

  const hasItems = menuItems && menuItems.length > 0;

  const itemsToRender: MenuItem[] = hasItems
    ? menuItems
    : [{ title: t("menu.home"), href: "/" }];

  return (
    <ScrollArea className="h-[calc(100vh)]">
      <XMenu
        orientation="vertical"
        items={itemsToRender}
        className="p-4"
        onItemClick={onItemClick}
      />
    </ScrollArea>
  );
}

