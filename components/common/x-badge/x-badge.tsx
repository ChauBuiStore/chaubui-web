import { Badge, badgeVariants } from "@/components/ui";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import React from "react";

interface XBadgeProps
  extends Omit<React.ComponentProps<typeof Badge>, "variant">,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

const XBadge = React.forwardRef<HTMLSpanElement, XBadgeProps>(
  ({ children, variant, className, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        variant={variant}
        className={cn("rounded-none", className)}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);

XBadge.displayName = "XBadge";

export { XBadge };
export type { XBadgeProps };

