import { ImageResponse } from '@vercel/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'Livin N Decoration';
export const dynamic = 'force-static';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('home.seo.title');
  const description = t('home.seo.description');
  const siteName = t('seo.siteName');

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
            {title}
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

