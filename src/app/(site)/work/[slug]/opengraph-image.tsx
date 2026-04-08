import { ImageResponse } from 'next/og';
import { CASE_STUDIES } from '@/lib/content';

export const alt = 'Noah Williams | Creative Director';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);

  if (!study) {
    return new ImageResponse(
      (
        <div
          style={{
            background: '#0E0C0A',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F5F0E6',
            fontSize: 48,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          Noah Williams | Creative Director
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0C0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top section */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Case study number */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              color: '#E04458',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              opacity: 0.9,
            }}
          >
            {study.number}
          </div>

          {/* Client name */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#F5F0E6',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginTop: 16,
            }}
          >
            {study.client}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 22,
              color: '#777777',
              marginTop: 16,
              lineHeight: 1.4,
              maxWidth: '80%',
            }}
          >
            {study.tagline}
          </div>
        </div>

        {/* Bottom section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: '#444444',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#E04458',
                marginRight: 12,
              }}
            />
            Noah Williams | Creative Director
          </div>

          <div
            style={{
              fontSize: 16,
              color: '#444444',
            }}
          >
            noahisdabomb.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
