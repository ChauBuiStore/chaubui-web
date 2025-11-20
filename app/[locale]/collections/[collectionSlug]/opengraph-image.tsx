import { ImageResponse } from '@vercel/og';
import { getTranslations } from 'next-intl/server';
import { categoryGroupService } from '@/lib/services/category-group.service';

export const alt = 'Collection';
export const dynamicParams = false;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ collectionSlug: string; locale: string }>;
}) {
  const { collectionSlug, locale } = await params;
  const t = await getTranslations({ locale });

  const siteName = t('seo.siteName');
  const description = t('seo.description');

  let collectionName = collectionSlug;
  try {
    const categoryGroupsResponse = await categoryGroupService.getCategoryGroups(
      { isAll: true },
      locale
    );
    const categoryGroups = categoryGroupsResponse.data || [];
    const category = categoryGroups
      .flatMap((cg) => cg.categories || [])
      .find((c) => c.slug === collectionSlug);
    const categoryGroup = categoryGroups.find(
      (cg) => cg.slug === collectionSlug
    );
    collectionName = category?.name || categoryGroup?.name || collectionSlug;
  } catch (error) {
    console.error(`Error fetching collection name for ${collectionSlug}:`, error);
  }

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
          backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 120px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#0a0a0a',
              marginBottom: 24,
              lineHeight: 1.1,
              maxWidth: '100%',
            }}
          >
            {collectionName}
          </h1>
          <p
            style={{
              fontSize: 32,
              color: '#525252',
              marginBottom: 0,
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            {description}
          </p>
          <div
            style={{
              marginTop: 48,
              fontSize: 24,
              color: '#737373',
              fontWeight: 500,
            }}
          >
            {siteName}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

