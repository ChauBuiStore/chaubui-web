import React, { ReactNode } from "react";
import { XBreadcrumb } from "@/components/common";
import { BreadcrumbItem } from "@/lib/types";

interface XPageProps {
  children: ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  showBreadcrumb?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function XPage({
  children,
  breadcrumbItems,
  showBreadcrumb = true,
  className = "",
  "aria-label": ariaLabel,
}: XPageProps) {
  return (
    <main className={`min-h-screen ${className}`} aria-label={ariaLabel}>
      <div className="max-w-7xl mx-auto p-4">
        {showBreadcrumb && breadcrumbItems && (
          <XBreadcrumb items={breadcrumbItems} />
        )}
        {children}
      </div>
    </main>
  );
}

