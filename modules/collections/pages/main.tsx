'use client';

import { XPage } from "@/components/common";
import { BreadcrumbItem, TransformedCategoryGroup } from "@/lib/types";
import { CollectionsGrid } from "../components/collections-grid";
import { useTranslations } from "@/lib/hooks";

interface CollectionsPageProps {
  categoryGroups: TransformedCategoryGroup[];
  breadcrumbItems: BreadcrumbItem[];
  collectionsLabel: string;
}

export function CollectionsPage({ 
  categoryGroups, 
  breadcrumbItems,
  collectionsLabel 
}: CollectionsPageProps) {
  const t = useTranslations("collections");

  return (
    <XPage breadcrumbItems={breadcrumbItems}>
      <section aria-labelledby="collections-title" className="space-y-10 md:space-y-12 py-6 md:py-8">
        <div className="space-y-3 text-center md:text-left">
          <h1 
            id="collections-title" 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {collectionsLabel}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            {t("description")}
          </p>
        </div>

        <CollectionsGrid categoryGroups={categoryGroups} />
      </section>
    </XPage>
  );
}