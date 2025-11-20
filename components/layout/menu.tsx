"use client";

import { XError, XMenu, XSkeletonMenu } from "@/components/common";
import { ScrollArea } from "@/components/ui";
import { ROUTER } from "@/lib/constants";
import { useMenuItems, useTranslations } from "@/lib/hooks";

export function Menu({ onItemClick }: { onItemClick?: () => void }) {
  const t = useTranslations();
  const { menuItems, isLoading, isError, error } = useMenuItems();

  if (isLoading) {
    return <XSkeletonMenu orientation="vertical" itemCount={10} />;
  }

  if (isError) {
    return (
      <>
        <XError error={error} />
        <XMenu
          orientation="vertical"
          items={[{ title: t("menu.home"), href: ROUTER.HOME }]}
          className="mt-4"
          onItemClick={onItemClick}
        />
      </>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh)]">
      <XMenu
        orientation="vertical"
        items={menuItems}
        className="p-4"
        onItemClick={onItemClick}
      />
    </ScrollArea>
  );
}
