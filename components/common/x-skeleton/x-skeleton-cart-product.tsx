import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonCartProductProps {
  className?: string;
}

export function XSkeletonCartProduct({
  className,
}: XSkeletonCartProductProps) {
  return (
    <div className={cn("flex border-b border-border pb-4", className)}>
      <div className="flex flex-grow">
        <Skeleton className="w-22 h-22 sm:w-22 sm:h-22 mr-5 flex-shrink-0 rounded-none" />
        <div className="flex-grow space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-none" />
          <Skeleton className="h-3 w-1/2 rounded-none" />
          <Skeleton className="h-4 w-24 rounded-none" />
          <Skeleton className="h-8 w-24 rounded-none" />
        </div>
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-8 w-8 rounded-none ml-auto" />
        <Skeleton className="h-6 w-20 rounded-none ml-auto" />
      </div>
    </div>
  );
}

