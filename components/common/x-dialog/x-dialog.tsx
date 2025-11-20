"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";

export interface XDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  showCloseButton?: boolean;
}

export const XDialog = React.forwardRef<HTMLDivElement, XDialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      footer,
      className,
      contentClassName,
      headerClassName,
      footerClassName,
      showCloseButton = true,
    },
    ref
  ) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          ref={ref}
          className={cn("max-w-2xl max-h-[90vh] overflow-y-auto", contentClassName)}
          showCloseButton={showCloseButton}
        >
          {(title || description) && (
            <DialogHeader className={headerClassName}>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}

          <div className={cn("space-y-4", className)}>{children}</div>

          {footer && <DialogFooter className={footerClassName}>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
    );
  }
);

XDialog.displayName = "XDialog";

