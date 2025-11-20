import { APP_CONFIG } from "@/lib/configs";

export default function robots() {
  const baseUrl = APP_CONFIG.baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
