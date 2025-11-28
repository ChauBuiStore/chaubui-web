"use client";

import { forwardRef, ReactNode } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface XPopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  className?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  modal?: boolean;
}

export const XPopover = forwardRef<HTMLDivElement, XPopoverProps>(
  (
    {
      trigger,
      children,
      align = "center",
      side = "bottom",
      sideOffset = 4,
      className,
      contentClassName,
      open,
      onOpenChange,
      disabled = false,
      modal = false,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={className}>
        <Popover open={open} onOpenChange={onOpenChange} modal={modal}>
          <PopoverTrigger asChild disabled={disabled}>
            {trigger}
          </PopoverTrigger>
          <PopoverContent
            align={align}
            side={side}
            sideOffset={sideOffset}
            className={cn("rounded-none", contentClassName)}
          >
            {children}
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

XPopover.displayName = "XPopover";

