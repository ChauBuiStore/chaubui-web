"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { PAGINATION } from "@/lib/constants";
import { getVisiblePages } from "@/lib/helpers";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "@/lib/hooks";

interface XPaginationProps {
  currentPage?: number;
  totalItems: number;
  itemsPerPage?: number;
  className?: string;
  onPageChange?: (page: number) => void;
}

export function XPagination({
  currentPage = 1,
  totalItems,
  itemsPerPage = PAGINATION.LIMIT,
  className,
  onPageChange,
}: XPaginationProps) {
  const t = useTranslations("pagination");
  const validCurrentPage = Number.isFinite(currentPage) ? currentPage : 1;
  const validTotalItems = Number.isFinite(totalItems) ? totalItems : 0;
  const validItemsPerPage =
    Number.isFinite(itemsPerPage) && itemsPerPage > 0
      ? itemsPerPage
      : PAGINATION.LIMIT;

  const totalPages = Math.ceil(validTotalItems / validItemsPerPage);

  if (!Number.isFinite(totalPages) || totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visiblePages = getVisiblePages(validCurrentPage, totalPages);

  return (
    <Pagination className={`${className} mt-4`}>
      <PaginationContent>
        {validCurrentPage > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                handlePageChange(Math.max(1, validCurrentPage - 1))
              }
              className="cursor-pointer hover:bg-transparent group transition-all duration-200 ease-in-out"
              size="default"
              aria-label={t("goToPrevious")}
            >
              <ArrowLeft className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}

        {visiblePages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page as number)}
                isActive={validCurrentPage === page}
                className={`font-bold cursor-pointer hover:bg-transparent hover:text-primary group transition-all duration-200 ease-in-out ${validCurrentPage === page
                    ? "border-none shadow-none ring-0 outline-none"
                    : ""
                  }`}
                size="default"
              >
                <span
                  className={`transition-all duration-200 ease-in-out ${validCurrentPage === page
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-primary"
                    }`}
                >
                  {page}
                </span>
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {validCurrentPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                handlePageChange(Math.min(totalPages, validCurrentPage + 1))
              }
              className="cursor-pointer hover:bg-transparent group transition-all duration-200 ease-in-out"
              size="default"
              aria-label={t("goToNext")}
            >
              <ArrowRight className="size-4" />
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
