import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonCartSummaryProps {
  className?: string;
}

export function XSkeletonCartSummary({
  className,
}: XSkeletonCartSummaryProps) {
  return (
    <div className={cn("border border-gray-200 p-4", className)}>
      <Skeleton className="h-6 w-32 mb-4 rounded-none" />
      <div className="space-y-3 border-t border-b border-gray-200 border-dashed py-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20 rounded-none" />
          <Skeleton className="h-5 w-24 rounded-none" />
        </div>
      </div>
      <Skeleton className="h-12 w-full mt-4 rounded-none" />
      <Skeleton className="h-10 w-full mt-4 rounded-none" />
    </div>
  );
}

