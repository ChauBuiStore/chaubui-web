import { Skeleton } from "@/components/ui";
import { cn } from "@/lib/utils";

interface XSkeletonFeaturedCategoriesProps {
  className?: string;
}

export function XSkeletonFeaturedCategories({
  className,
}: XSkeletonFeaturedCategoriesProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1",
        className
      )}
      aria-label="Featured categories skeleton"
    >
      {[...Array(3)].map((_, i) => (
        <div key={i} className="relative">
          <Skeleton className="w-full h-[500px] rounded-none" />
          <div className="absolute bottom-16 left-12 space-y-2">
            <Skeleton className="h-4 w-24 rounded-none" />
            <Skeleton className="h-6 w-32 rounded-none" />
            <Skeleton className="h-10 w-28 rounded-none" />
          </div>
        </div>
      ))}
    </section>
  );
}

