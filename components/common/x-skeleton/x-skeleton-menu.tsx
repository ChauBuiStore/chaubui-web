import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonMenuProps {
  orientation?: "horizontal" | "vertical";
  itemCount?: number;
  className?: string;
}

export function XSkeletonMenu({
  orientation = "vertical",
  itemCount = 6,
  className,
}: XSkeletonMenuProps) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("flex space-x-4", className)}>
        {[...Array(itemCount)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-none" />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2 p-4", className)}>
      {[...Array(itemCount)].map((_, i) => (
        <div key={i}>
          <Skeleton className="h-10 w-full rounded-md" />
          {i % 3 === 0 && (
            <div className="ml-4 mt-2 space-y-2">
              <Skeleton className="h-8 w-[90%] rounded-md" />
              <Skeleton className="h-8 w-[85%] rounded-md" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

