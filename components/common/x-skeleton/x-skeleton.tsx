import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

type XSkeletonProps = React.ComponentProps<typeof Skeleton>;

const XSkeleton = React.forwardRef<HTMLDivElement, XSkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        className={cn("rounded-none", className)}
        {...props}
      />
    );
  }
);

XSkeleton.displayName = "XSkeleton";

export { XSkeleton };
export type { XSkeletonProps };
