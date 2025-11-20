"use client";

import { useEffect } from "react";

export function PreconnectLinks() {
  useEffect(() => {
    const existingLinks = Array.from(document.head.querySelectorAll("link[rel='preconnect'], link[rel='dns-prefetch']"));
    const existingHrefs = existingLinks.map(link => link.getAttribute("href"));

    if (!existingHrefs.includes("https://theme.hstatic.net")) {
      const preconnectTheme = document.createElement("link");
      preconnectTheme.rel = "preconnect";
      preconnectTheme.href = "https://theme.hstatic.net";
      preconnectTheme.crossOrigin = "anonymous";
      document.head.insertBefore(preconnectTheme, document.head.firstChild);

      const dnsPrefetchTheme = document.createElement("link");
      dnsPrefetchTheme.rel = "dns-prefetch";
      dnsPrefetchTheme.href = "https://theme.hstatic.net";
      document.head.insertBefore(dnsPrefetchTheme, document.head.firstChild);
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (apiBaseUrl && !existingHrefs.includes(apiBaseUrl)) {
      const preconnectApi = document.createElement("link");
      preconnectApi.rel = "preconnect";
      preconnectApi.href = apiBaseUrl;
      preconnectApi.crossOrigin = "anonymous";
      document.head.insertBefore(preconnectApi, document.head.firstChild);

      const dnsPrefetchApi = document.createElement("link");
      dnsPrefetchApi.rel = "dns-prefetch";
      dnsPrefetchApi.href = apiBaseUrl;
      document.head.insertBefore(dnsPrefetchApi, document.head.firstChild);
    }
  }, []);

  return null;
}

