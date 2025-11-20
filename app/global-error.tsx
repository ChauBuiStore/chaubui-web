"use client";

import "./globals.css";
import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <h1 className="text-2xl font-semibold mb-2">Đã xảy ra lỗi</h1>
            <p className="text-muted-foreground mb-6">
              Rất tiếc, có sự cố không mong muốn vừa xảy ra. Vui lòng thử lại.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground shadow hover:opacity-90 focus:outline-none"
              >
                Thử lại
              </button>
              <Link
                href="/"
                className="inline-flex items-center rounded-md border px-4 py-2 hover:bg-accent"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}


