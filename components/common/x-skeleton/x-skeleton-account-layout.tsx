import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonAccountLayoutProps {
  className?: string;
}

export function XSkeletonAccountLayout({
  className,
}: XSkeletonAccountLayoutProps) {
  return (
    <div className={cn("container mx-auto px-4 py-8", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-none" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 rounded-none" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-none" />
              <Skeleton className="h-24 w-full rounded-none" />
              <Skeleton className="h-24 w-full rounded-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

