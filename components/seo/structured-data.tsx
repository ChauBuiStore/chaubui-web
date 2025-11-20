import type { Product } from "@/modules/products/types";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

interface OrganizationStructuredDataProps {
  baseUrl: string;
  locale: string;
  name: string;
  description: string;
  logo?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    areaServed?: string;
    availableLanguage?: readonly string[] | string[];
  };
  sameAs?: string[];
}

export function OrganizationStructuredData({
  baseUrl,
  name,
  description,
  logo,
  address,
  contactPoint,
  sameAs,
}: OrganizationStructuredDataProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: baseUrl,
    logo: logo ? `${baseUrl}${logo}` : `${baseUrl}/logo.png`,
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        ...(address.postalCode && { postalCode: address.postalCode }),
        addressCountry: address.addressCountry,
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contactPoint.telephone,
        contactType: contactPoint.contactType,
        ...(contactPoint.areaServed && { areaServed: contactPoint.areaServed }),
        ...(contactPoint.availableLanguage && {
          availableLanguage: contactPoint.availableLanguage,
        }),
      },
    }),
    ...(sameAs && sameAs.length > 0 && { sameAs }),
  };

  return <StructuredData data={data} />;
}

interface WebsiteStructuredDataProps {
  baseUrl: string;
  name: string;
  description: string;
  locale: string;
  alternateLocales?: string[];
}

export function WebsiteStructuredData({
  baseUrl,
  name,
  description,
  locale,
  alternateLocales = [],
}: WebsiteStructuredDataProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url: baseUrl,
    inLanguage: locale,
    ...(alternateLocales.length > 0 && {
      alternateName: alternateLocales.map((loc) => `${baseUrl}/${loc}`),
    }),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <StructuredData data={data} />;
}

interface ProductStructuredDataProps {
  product: Product;
  baseUrl: string;
  locale: string;
}

export function ProductStructuredData({
  product,
  baseUrl,
  locale,
}: ProductStructuredDataProps) {
  const imageUrl =
    product.images?.[0]?.file?.url ||
    product.thumbnailUrl ||
    `${baseUrl}/og-image.jpg`;
  const fullImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `${baseUrl}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
  const productUrl = `${baseUrl}/${locale}/products/${product.slug}`;
  const availability =
    product.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock";

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.name,
    image: fullImageUrl,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "Livin N Decoration",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "VND",
      price: product.salePrice || product.originalPrice,
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
      availability: availability,
      itemCondition: "https://schema.org/NewCondition",
      ...(product.originalPrice > (product.salePrice || product.originalPrice) && {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: product.salePrice || product.originalPrice,
          priceCurrency: "VND",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "C62",
          },
        },
      }),
    },
    ...(product.category && {
      category: product.category.nameVi || product.category.nameEn || "",
    }),
  };

  return <StructuredData data={data} />;
}

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbStructuredData({
  items,
}: BreadcrumbStructuredDataProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={data} />;
}

interface CollectionStructuredDataProps {
  name: string;
  description: string;
  url: string;
  products: Product[];
  baseUrl: string;
}

export function CollectionStructuredData({
  name,
  description,
  url,
  products,
  baseUrl,
}: CollectionStructuredDataProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.name,
          url: `${baseUrl}/products/${product.slug}`,
          image:
            product.images?.[0]?.file?.url ||
            product.thumbnailUrl ||
            `${baseUrl}/og-image.jpg`,
        },
      })),
    },
  };

  return <StructuredData data={data} />;
}

