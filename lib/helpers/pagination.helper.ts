import { PaginationMeta } from "../types";

export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  delta: number = 2
): (number | string)[] {
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, "...");
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push("...", totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
}

export interface LoadMoreParams {
  page: number;
  limit: number;
  locale: string;
  search?: string;
  categoryGroupSlug?: string;
  categorySlug?: string;
  categoryGroups?: boolean;
}

export function buildLoadMoreParams(
  nextPage: number,
  initialMeta: PaginationMeta | undefined,
  locale: string,
  searchQuery?: string,
  categoryGroupSlug?: string,
  categorySlug?: string,
  categoryGroups?: boolean
): LoadMoreParams {
  const params: LoadMoreParams = {
    page: nextPage,
    limit: initialMeta?.itemsPerPage || 12,
    locale,
  };

  if (searchQuery) {
    params.search = searchQuery;
  }

  if (categoryGroupSlug) {
    params.categoryGroupSlug = categoryGroupSlug;
  }

  if (categorySlug) {
    params.categorySlug = categorySlug;
  }

  if (categoryGroups) {
    params.categoryGroups = categoryGroups;
  }

  return params;
}

