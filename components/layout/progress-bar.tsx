/* Thanh progress mỏng trên đầu trang khi chuyển route (App Router) dùng NProgress */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

export function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}




