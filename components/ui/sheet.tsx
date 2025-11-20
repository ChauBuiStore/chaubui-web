"use client";

import * as React from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

const Sheet = Drawer.Root;
const SheetTrigger = Drawer.Trigger;
const SheetPortal = Drawer.Portal;
const SheetClose = Drawer.Close;

const SheetOverlay = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Drawer.Overlay>>(
  ({ className, ...props }, ref) => (
    <Drawer.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/40",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
);
SheetOverlay.displayName = "SheetOverlay";

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Drawer.Content> & {
  side?: "left" | "right" | "bottom" | "top";
  title?: string;
  description?: string;
  hideDefaultTitle?: boolean;
  hideDefaultDescription?: boolean;
};

const sideClassMap: Record<NonNullable<SheetContentProps["side"]>, string> = {
  left: "inset-y-0 left-0 h-full w-72 data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
  right: "inset-y-0 right-0 h-full w-72 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
  bottom: "inset-x-0 bottom-0 w-full data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
  top: "inset-x-0 top-0 w-full data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
};

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ 
    side = "left", 
    className, 
    children, 
    title = "Sheet", 
    description = "Navigation menu",
    hideDefaultTitle = false,
    hideDefaultDescription = false,
    ...props 
  }, ref) => (
    <SheetPortal>
      <SheetOverlay />
      <Drawer.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-background shadow-lg outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          sideClassMap[side],
          className
        )}
        {...props}
      >
        {!hideDefaultTitle && (
          <VisuallyHidden>
            <Drawer.Title>{title}</Drawer.Title>
          </VisuallyHidden>
        )}
        {!hideDefaultDescription && (
          <VisuallyHidden>
            <Drawer.Description>{description}</Drawer.Description>
          </VisuallyHidden>
        )}
        {children}
      </Drawer.Content>
    </SheetPortal>
  )
);
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1 p-4", className)} {...props} />
);

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<typeof Drawer.Title>>(
  ({ className, ...props }, ref) => (
    <Drawer.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
);
SheetTitle.displayName = "SheetTitle";

const SheetDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose };


