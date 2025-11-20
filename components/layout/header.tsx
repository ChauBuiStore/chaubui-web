"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { ROUTER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { AccountHeader } from "@/modules/account/components";
import { CartHeader } from "@/modules/cart/components";
import { SearchHeader } from "@/modules/search/components";
import { Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Language } from "./language";
import { Menu } from "./menu";
import { useTranslations } from "@/lib/hooks";

export function Header() {
  const tSeo = useTranslations("seo");
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const siteName = tSeo("siteName");
  const maybeShort = tSeo("siteNameShort");
  const siteNameShort = maybeShort === "seo.siteNameShort" ? siteName : maybeShort;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Sheet direction="left" open={open} onOpenChange={setOpen}>
      <header
        className={cn(
          "sticky top-0 z-50",
          "transition-colors duration-200",
          isScrolled
            ? "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm"
            : "bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80"
        )}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <SheetTrigger asChild>
                <button
                  className="flex-shrink-0 p-1.5 -ml-1.5 rounded-md hover:bg-muted transition-colors touch-manipulation"
                  aria-label="Menu"
                >
                  <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </button>
              </SheetTrigger>

              <Link
                href={ROUTER.HOME}
                className="flex items-center gap-2 min-w-0 group"
                aria-label={siteName}
              >
                <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold truncate group-hover:text-primary transition-colors">
                  <span className="hidden sm:inline">{siteName}</span>
                  <span className="inline sm:hidden">{siteNameShort}</span>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center flex-1 max-w-md mx-4">
              <SearchHeader />
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0">
              <Language />
              <CartHeader />
              <AccountHeader />
            </div>
          </div>

          <div className="md:hidden border-t border-border/50">
            <SearchHeader isMobile={true} />
          </div>
        </div>
      </header>
      <SheetContent side="left" className="w-[85vw] sm:w-[320px] p-0">
        <Menu onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
