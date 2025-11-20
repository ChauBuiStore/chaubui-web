'use client';

import { XCard } from '@/components/common';
import { ROUTER } from '@/lib/constants';
import { TransformedCategoryGroup } from '@/lib/types';
import { Link } from '@/lib/i18n/routing';
import { ChevronRight, Package, Grid3x3, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/hooks';

interface CollectionsGridProps {
  categoryGroups: TransformedCategoryGroup[];
}

export function CollectionsGrid({ categoryGroups }: CollectionsGridProps) {
  const t = useTranslations("collections");

  if (!categoryGroups || categoryGroups.length === 0) {
    return (
      <div className="text-center py-16 md:py-24">
        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground text-lg">{t("noCollections")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-0">
      {categoryGroups.map((group, index) => {
        const hasCategories = group.categories && group.categories.length > 0;
        const categoryCount = group.categories?.length || 0;
        const displayedCategories = hasCategories ? group.categories.slice(0, 6) : [];
        const remainingCount = categoryCount - displayedCategories.length;

        return (
          <div 
            key={group.id} 
            className={cn(
              "relative",
              "space-y-6"
            )}
          >
            <div className="flex items-center justify-between gap-4 pb-2 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Grid3x3 className="w-5 h-5" />
                </div>
                <div>
                  <Link 
                    href={`${ROUTER.COLLECTIONS}/${group.slug}`}
                    className="group/header"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold group-hover/header:text-primary transition-colors duration-200">
                      {group.name}
                    </h2>
                  </Link>
                  {hasCategories && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {categoryCount} {categoryCount === 1 ? t("category") : t("categories")}
                    </p>
                  )}
                </div>
              </div>
              <Link 
                href={`${ROUTER.COLLECTIONS}/${group.slug}`}
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all duration-200 group/view-all"
              >
                {t("viewAll")}
                <ArrowRight className="w-4 h-4 group-hover/view-all:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {hasCategories && displayedCategories.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {displayedCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`${ROUTER.COLLECTIONS}/${category.slug}`}
                    className="group/category"
                  >
                    <XCard className="h-full p-6 border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer bg-gradient-to-br from-background via-background to-muted/30 group-hover/category:to-primary/5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold mb-2 group-hover/category:text-primary transition-colors duration-200 line-clamp-2">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {category.description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 group-hover/category:bg-primary/20 transition-colors duration-200">
                          <ChevronRight className="w-4 h-4 text-primary group-hover/category:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </XCard>
                  </Link>
                ))}

                {remainingCount > 0 && (
                  <Link
                    href={`${ROUTER.COLLECTIONS}/${group.slug}`}
                    className="group/view-more"
                  >
                    <XCard className="h-full p-6 border-2 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[140px]">
                      <div className="text-center space-y-2">
                        <div className="inline-flex p-3 rounded-full bg-primary/10 group-hover/view-more:bg-primary/20 transition-colors duration-200">
                          <ArrowRight className="w-5 h-5 text-primary group-hover/view-more:translate-x-1 transition-transform duration-200" />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground group-hover/view-more:text-primary transition-colors duration-200">
                          {t("viewMore")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {remainingCount} {remainingCount === 1 ? t("category") : t("categories")}
                        </p>
                      </div>
                    </XCard>
                  </Link>
                )}
              </div>
            )}

            {!hasCategories && (
              <Link href={`${ROUTER.COLLECTIONS}/${group.slug}`}>
                <XCard className="p-8 md:p-12 border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer group/empty bg-gradient-to-br from-background to-muted/20">
                  <div className="text-center space-y-4">
                    <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover/empty:bg-primary/20 transition-colors duration-200">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 group-hover/empty:text-primary transition-colors duration-200">
                        {group.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t("exploreCollection")}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-primary">
                      {t("viewDetails")}
                      <ArrowRight className="w-4 h-4 group-hover/empty:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </XCard>
              </Link>
            )}

            {index < categoryGroups.length - 1 && (
              <div className="pt-8 border-t border-border/50" />
            )}
          </div>
        );
      })}
    </div>
  );
}

