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
  let title = "Livin N Decoration";
  let description = "High quality furniture and decor";
  let siteName = "Livin N Decoration";
  
  try {
    const { locale } = await params;
    let t: Awaited<ReturnType<typeof getTranslations>>;
    
    try {
      t = await getTranslations({ locale });
      title = t('home.seo.title');
      description = t('home.seo.description');
      siteName = t('seo.siteName');
    } catch (error) {
      console.error("Error loading translations for OG image:", error);
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
          <p style={{ fontSize: 24, color: '#737373', marginTop: 16 }}>{description}</p>
        </div>
      ),
      {
        ...size,
      }
    );
  }
}

