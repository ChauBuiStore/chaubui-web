"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

export interface XDropdownMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  prefix?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export interface XDropdownMenuProps {
  trigger: ReactNode;
  children?: ReactNode;
  items?: XDropdownMenuItem[];
  label?: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
  showChevron?: boolean;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const XDropdownMenu = forwardRef<HTMLDivElement, XDropdownMenuProps>(
  (
    {
      trigger,
      children,
      items = [],
      label,
      align = "end",
      side = "bottom",
      sideOffset = 4,
      className,
      contentClassName,
      showChevron = true,
      disabled = false,
      open,
      onOpenChange,
    },
    ref,
  ) => {
    const router = useRouter();
    
    const handleItemClick = (item: XDropdownMenuItem) => {
      if (item.disabled) return;
      if (item.href) {
        router.push(item.href);
      } else if (item.onClick) {
        item.onClick();
      }
    };

    return (
      <div ref={ref} className={cn("relative", className)}>
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
          <DropdownMenuTrigger asChild disabled={disabled}>
            <div className="flex items-center gap-1 sm:gap-2 cursor-pointer">
              {trigger}
              {showChevron && <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 opacity-50" />}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={align}
            side={side}
            sideOffset={sideOffset}
            className={contentClassName}
          >
            {label && (
              <>
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            {children
              ? children
              : items.map((item, index) => {
                const isDestructive = item.className?.includes("destructive");
                const shouldShowSeparator = isDestructive && index > 0;

                return (
                  <Fragment key={item.id}>
                    {shouldShowSeparator && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={() => handleItemClick(item)}
                      disabled={item.disabled}
                      variant={isDestructive ? "destructive" : "default"}
                      className={cn("flex items-center gap-2 cursor-pointer", item.className)}
                    >
                      {item.prefix && <span className="flex-shrink-0">{item.prefix}</span>}
                      <span className="flex-1">{item.label}</span>
                      {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    </DropdownMenuItem>
                  </Fragment>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
);

XDropdownMenu.displayName = "XDropdownMenu";
