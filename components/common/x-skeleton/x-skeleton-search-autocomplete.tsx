import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonSearchAutocompleteProps {
  itemCount?: number;
  isMobile?: boolean;
  className?: string;
}

export function XSkeletonSearchAutocomplete({
  itemCount = 5,
  isMobile = false,
  className,
}: XSkeletonSearchAutocompleteProps) {
  return (
    <div
      className={cn(
        isMobile ? "max-h-60 overflow-y-auto" : "max-h-80 overflow-y-auto",
        className
      )}
    >
      <div className="divide-y divide-gray-200">
        {[...Array(itemCount)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-full flex items-center space-x-3",
              isMobile ? "p-2.5" : "p-3.5"
            )}
          >
            <Skeleton
              className={cn(
                "flex-shrink-0 rounded-md",
                isMobile ? "w-10 h-10" : "w-12 h-12"
              )}
            />
            <div className="flex-1 min-w-0 space-y-2">
              <Skeleton
                className={cn(
                  "rounded-none",
                  isMobile ? "h-3 w-full" : "h-4 w-full"
                )}
              />
              <div className="flex items-center gap-2">
                <Skeleton
                  className={cn(
                    "rounded-none",
                    isMobile ? "h-3 w-16" : "h-4 w-20"
                  )}
                />
                <Skeleton
                  className={cn(
                    "rounded-none",
                    isMobile ? "h-2.5 w-12" : "h-3 w-16"
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

