import { XCard } from "@/components/common";
import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonProductProps {
  className?: string;
}

export function XSkeletonProduct({ className }: XSkeletonProductProps) {
  return (
    <XCard className={cn("overflow-hidden p-0 gap-0 border-none shadow-none", className)}>
      <div className="p-0">
        <Skeleton className="aspect-square rounded-3xl" />
      </div>
      <div className="py-4 px-2">
        <div className="space-y-2 mb-2">
          <Skeleton className="h-4 w-full rounded-none" />
          <Skeleton className="h-4 w-3/4 rounded-none" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24 rounded-none" />
          <Skeleton className="h-4 w-20 rounded-none" />
        </div>
      </div>
    </XCard>
  );
}

