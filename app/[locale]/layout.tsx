import { Header } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { isValidLocale, routing } from "@/lib/i18n";
import { ReactQueryProvider, CartProvider } from "@/lib/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../globals.css";
import { Footer } from "@/components/layout/footer";
import {
  OrganizationStructuredData,
  WebsiteStructuredData,
} from "@/components/seo";
import { PreconnectLinks } from "@/components/seo/preconnect-links";
import { APP_CONFIG } from "@/lib/configs";
import { truncateTitle, truncateDescription } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = APP_CONFIG.baseUrl;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = truncateTitle(t("seo.title"));
  const description = truncateDescription(t("seo.description"));
  const siteName = t("seo.siteName");
  const url = `${baseUrl}/${locale}`;

  return {
    title,
    description,
    keywords: t("seo.keywords").split(", ").filter(Boolean),
    authors: [{ name: "Livin N Decoration" }],
    creator: "Livin N Decoration",
    publisher: "Livin N Decoration",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        vi: `${baseUrl}/vi`,
        en: `${baseUrl}/en`,
        km: `${baseUrl}/km`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: url,
      title: title,
      description: description,
      siteName: siteName,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [`${baseUrl}/og-image.jpg`],
      creator: "@livinndecoration",
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
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "",
    },
    manifest: "/manifest.json",
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale });

  const siteName = t("seo.siteName");
  const description = t("seo.description");

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        <OrganizationStructuredData
          baseUrl={baseUrl}
          locale={locale}
          name={siteName}
          description={description}
          logo="/logo.png"
          address={{
            streetAddress: t("organization.address.streetAddress"),
            addressLocality: t("organization.address.addressLocality"),
            addressRegion: t("organization.address.addressRegion"),
            addressCountry: t("organization.address.addressCountry"),
          }}
          contactPoint={{
            telephone: t("organization.contact.telephone"),
            contactType: t("organization.contact.contactType"),
            areaServed: t("organization.contact.areaServed"),
            availableLanguage: routing.locales,
          }}
        />
        <WebsiteStructuredData
          baseUrl={baseUrl}
          name={siteName}
          description={description}
          locale={locale}
          alternateLocales={routing.locales.filter((l: string) => l !== locale)}
        />
        <PreconnectLinks />
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <Toaster />
            </CartProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
