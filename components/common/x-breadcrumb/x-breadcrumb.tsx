import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItem as BreadcrumbItemType } from "@/lib/types";
import { Link } from "@/lib/i18n/routing";
import React from "react";

interface XBreadcrumbProps {
  items?: BreadcrumbItemType[];
}

export function XBreadcrumb({ items }: XBreadcrumbProps) {
  if (!items) {
    return null;
  }

  return (
    <div>
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          {items.map((breadcrumb: BreadcrumbItemType, index: number) => (
            <React.Fragment key={`${breadcrumb.href}-${index}`}>
              <BreadcrumbItem>
                {breadcrumb.isActive ? (
                  <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                ) : breadcrumb.href && breadcrumb.href !== "#" && breadcrumb.href !== "" ? (
                  <BreadcrumbLink asChild>
                    <Link href={breadcrumb.href}>
                      {breadcrumb.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span className="text-muted-foreground cursor-not-allowed">
                    {breadcrumb.label}
                  </span>
                )}
              </BreadcrumbItem>
              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
