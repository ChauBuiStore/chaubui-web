"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu as MenuIcon } from "lucide-react";
import { Menu } from "./menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
          "sticky top-0 z-50 py-4",
          "transition-colors duration-200",
          isScrolled
            ? "bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 xl:px-0 flex items-center gap-3">
          <SheetTrigger>
            <MenuIcon className="h-5 w-5 cursor-pointer" />
          </SheetTrigger>

          <h1>ChauBui Store</h1>
        </div>
      </header>
      <SheetContent side="left">
        <Menu onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
