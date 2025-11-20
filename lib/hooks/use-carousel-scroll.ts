"use client";

import { useRef, useEffect } from "react";

interface UseCarouselScrollProps {
  currentIndex: number;
  containerSelector: string;
  scrollBehavior?: ScrollBehavior;
  scrollBlock?: ScrollLogicalPosition;
  scrollInline?: ScrollLogicalPosition;
  disableAutoScroll?: boolean;
}

export function useCarouselScroll({
  currentIndex,
  containerSelector,
  scrollBehavior = "smooth",
  scrollBlock = "nearest",
  scrollInline,
  disableAutoScroll = false,
}: UseCarouselScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      `[data-${containerSelector}-index]`
    );
    const targetElement = elements[index] as HTMLElement;

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: scrollBehavior,
        block: scrollBlock,
        inline: scrollInline,
      });
    }
  };

  useEffect(() => {
    if (disableAutoScroll) {
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(
      `[data-${containerSelector}-index]`
    );
    const targetElement = elements[currentIndex] as HTMLElement;

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: scrollBehavior,
        block: scrollBlock,
        inline: scrollInline,
      });
    }
  }, [
    currentIndex,
    disableAutoScroll,
    containerSelector,
    scrollBehavior,
    scrollBlock,
    scrollInline,
  ]);

  return { containerRef, scrollToIndex };
}
