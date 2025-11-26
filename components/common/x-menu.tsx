"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { MenuItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface XMenuProps {
  items: MenuItem[];
  className?: string;
  orientation?: "horizontal" | "vertical";
  expandMode?: "always" | "collapse";
  onItemClick?: () => void;
}

export function XMenu({
  items,
  className,
  orientation = "horizontal",
  expandMode = "always",
  onItemClick,
}: XMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleLinkClick = () => {
    if (onItemClick) {
      onItemClick();
    }
  };

  const toggleExpanded = (itemKey: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemKey)) {
      newExpanded.delete(itemKey);
    } else {
      newExpanded.add(itemKey);
    }
    setExpandedItems(newExpanded);
  };

  const renderVerticalMenuItem = (item: MenuItem, index: number, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const itemKey = `${level}-${index}-${item.title}`;
    const isExpanded = expandedItems.has(itemKey);
    const shouldShowChildren =
      expandMode === "always" || (expandMode === "collapse" && isExpanded);

    const handleItemClick = () => {
      if (hasChildren && expandMode === "collapse") {
        toggleExpanded(itemKey);
      }
    };

    const Icon = item.icon;

    return (
      <div key={itemKey}>
        <div
          className={cn(
            "flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors",
            "hover:text-primary hover:bg-accent",
            "font-bold uppercase",
            level > 0 && "ml-4 hover:text-muted-foreground font-normal"
          )}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={handleItemClick}
        >
          {Icon && <Icon className="w-4 h-4 mr-3 flex-shrink-0" />}
          {item.href ? (
            <Link href={item.href} className="flex-1" onClick={handleLinkClick}>
              {item.title}
            </Link>
          ) : (
            <span className="flex-1">{item.title}</span>
          )}
          {hasChildren && expandMode === "collapse" && (
            <div className="ml-2">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </div>
        {hasChildren && shouldShowChildren && (
          <div className="mt-1">
            {item.children!.map((child, childIndex) =>
              renderVerticalMenuItem(child, childIndex, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderHorizontalMenuItem = (item: MenuItem, index: number) => {
    if (item.children && item.children.length > 0) {
      return (
        <NavigationMenuItem key={`${item.title}-${index}`}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {item.children.map((child, childIndex) => (
                <ListItem
                  key={`${child.title}-${childIndex}`}
                  title={child.title}
                  href={child.href || "#"}
                  onClick={handleLinkClick}
                >
                  {child.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    }

    return (
      <NavigationMenuItem key={`${item.title}-${index}`}>
        <Link href={item.href || "#"} passHref>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={handleLinkClick}
          >
            {item.title}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  if (orientation === "vertical") {
    return (
      <nav className={cn("w-full", className)}>
        <div className="space-y-1">
          {items.map((item, index) => renderVerticalMenuItem(item, index))}
        </div>
      </nav>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {items.map((item, index) => renderHorizontalMenuItem(item, index))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

type ListItemProps = React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  href: string;
};

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, href, ...props }: ListItemProps, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={href}
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            )}
          </Link>
        </NavigationMenuLink>
      </li>
    );
  });
ListItem.displayName = "ListItem";
