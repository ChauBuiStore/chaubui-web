import { ImageResponse } from '@vercel/og';
import { getTranslations } from 'next-intl/server';
import { productService } from '@/lib/services/product.service';
import { APP_CONFIG } from '@/lib/configs';
import { formatPriceForOG } from '@/lib/utils/currency.utils';
import { cache } from 'react';

export const alt = 'Product';
export const dynamicParams = false;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const getCachedProduct = cache(async (productSlug: string, locale: string) => {
  const productDetailResponse = await productService.getProductById(productSlug, locale);
  return productDetailResponse.data ?? null;
});

export default async function Image({
  params,
}: {
  params: Promise<{ productSlug: string; locale: string }>;
}) {
  const { productSlug, locale } = await params;
  const t = await getTranslations({ locale });

  const siteName = t('seo.siteName');
  const baseUrl = APP_CONFIG.baseUrl;

  try {
    const productDetail = await getCachedProduct(productSlug, locale);

    if (!productDetail) {
      return new ImageResponse(
        (
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ffffff',
            }}
          >
            <h1 style={{ fontSize: 48, color: '#0a0a0a' }}>Product Not Found</h1>
            <p style={{ fontSize: 24, color: '#737373', marginTop: 16 }}>{siteName}</p>
          </div>
        ),
        {
          ...size,
        }
      );
    }

    const productName = productDetail.name || 'Product';
    const productPrice = productDetail.salePrice || productDetail.originalPrice || 0;
    const hasDiscount = productDetail.salePrice != null && productDetail.originalPrice != null && productDetail.salePrice < productDetail.originalPrice;
    const originalPrice = productDetail.originalPrice || 0;
    const productImageUrl = productDetail.images?.[0]?.file?.url;

    const formattedPrice = formatPriceForOG(productPrice, locale);
    const formattedOriginalPrice = hasDiscount ? formatPriceForOG(originalPrice, locale) : '';

    const displayName = productName.length > 50 ? productName.substring(0, 50) + '...' : productName;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: '#ffffff',
            position: 'relative',
          }}
        >
          {productImageUrl ? (
            <div
              style={{
                width: '50%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fafafa',
                overflow: 'hidden',
              }}
            >
              <img
                src={productImageUrl.startsWith('http') ? productImageUrl : `${baseUrl}${productImageUrl}`}
                alt={productName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '50%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  color: '#d4d4d4',
                  fontWeight: 600,
                }}
              >
                {siteName}
              </div>
            </div>
          )}

          <div
            style={{
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 60px',
              justifyContent: 'center',
            }}
          >
            <h1
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: '#0a0a0a',
                marginBottom: 32,
                lineHeight: 1.2,
                maxWidth: '100%',
              }}
            >
              {displayName}
            </h1>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    color: '#dc2626',
                  }}
                >
                  {formattedPrice}
                </span>
                {hasDiscount && (
                  <span
                    style={{
                      fontSize: 32,
                      color: '#737373',
                      textDecoration: 'line-through',
                    }}
                  >
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>

              <div
                style={{
                  marginTop: 24,
                  fontSize: 24,
                  color: '#737373',
                  fontWeight: 500,
                }}
              >
                {siteName}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <h1 style={{ fontSize: 48, color: '#0a0a0a' }}>{siteName}</h1>
          <p style={{ fontSize: 24, color: '#737373', marginTop: 16 }}>High quality furniture and decor</p>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

