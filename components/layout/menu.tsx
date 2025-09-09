"use client";

import { XMenu } from "../common/x-menu";

const MENU_ITEMS = [
  {
    title: "Trang chủ",
    href: "/",
  }
];

export function Menu({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <XMenu
      orientation="vertical"
      items={MENU_ITEMS}
      className="p-4"
      onItemClick={onItemClick}
    />
  );
}
