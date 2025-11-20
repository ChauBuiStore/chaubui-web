import { APP_CONFIG } from "@/lib/configs";
import { routing } from "@/lib/i18n";

export default function manifest() {
  const baseUrl = APP_CONFIG.baseUrl;

  return {
    name: "Livin N Decoration",
    short_name: "Livin N",
    description: "High quality furniture and home decoration",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    lang: "vi",
    dir: "ltr",
    categories: ["shopping", "lifestyle"],
    scope: "/",
    id: baseUrl,
    related_applications: [],
    prefer_related_applications: false,
    shortcuts: routing.locales.map((locale) => ({
      name: locale === "vi" ? "Trang chủ" : locale === "en" ? "Home" : "ទំព័រដើម",
      short_name: locale === "vi" ? "Trang chủ" : locale === "en" ? "Home" : "ទំព័រដើម",
      description: locale === "vi" ? "Về trang chủ" : locale === "en" ? "Go to home" : "ទៅទំព័រដើម",
      url: `/${locale}`,
      icons: [{ src: "/icon-192.png", sizes: "192x192" }],
    })),
  };
}

