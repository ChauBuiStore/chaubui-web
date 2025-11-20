import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonProductDetailProps {
  className?: string;
}

export function XSkeletonProductDetail({
  className,
}: XSkeletonProductDetailProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8", className)}>
      <div className="lg:col-span-7">
        <div className="space-y-4">
          <Skeleton className="h-96 rounded-none" />
          <div className="flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-none" />
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 sticky top-4 h-fit">
        <div className="space-y-4">
          <Skeleton className="h-6 rounded-none" />
          <Skeleton className="h-8 rounded-none" />
          <Skeleton className="h-12 rounded-none" />
          <div className="mt-8 space-y-2">
            <Skeleton className="h-6 rounded-none" />
            <Skeleton className="h-4 rounded-none" />
            <Skeleton className="h-4 rounded-none" />
            <Skeleton className="h-4 w-3/4 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
