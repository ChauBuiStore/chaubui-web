import { HomePage } from "@/modules/home/pages/main";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { APP_CONFIG } from "@/lib/configs";
import { truncateTitle, truncateDescription } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    locale: string;
  }>;
}): Promise<Metadata> {
  try {
    const { locale } = await params;
    let t: Awaited<ReturnType<typeof getTranslations>>;
    let title = "Livin N Decoration";
    let description = "High quality furniture and decor";
    let siteName = "Livin N Decoration";

    try {
      t = await getTranslations({ locale });
      title = truncateTitle(t("home.seo.title"));
      description = truncateDescription(t("home.seo.description"));
      siteName = t("seo.siteName");
    } catch (error) {
      console.error("Error loading translations for home page:", error);
    }

    const baseUrl = APP_CONFIG.baseUrl;
    const url = `${baseUrl}/${locale}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        type: "website",
        siteName: siteName,
        locale: locale,
        images: [
          {
            url: `${baseUrl}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        title,
        description,
        card: "summary_large_image",
        images: [`${baseUrl}/og-image.jpg`],
      },
      alternates: {
        canonical: url,
        languages: {
          vi: `${baseUrl}/vi`,
          en: `${baseUrl}/en`,
          km: `${baseUrl}/km`,
          "x-default": `${baseUrl}/vi`,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata for home page:", error);
    return {
      title: "Livin N Decoration",
      description: "High quality furniture and decor",
    };
  }
}

export default function HomePageRoot() {
  return <HomePage />;
}
