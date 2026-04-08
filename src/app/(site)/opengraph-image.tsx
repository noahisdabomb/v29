import { ImageResponse } from 'next/og';

export const alt = 'Noah Williams | Freelance Creative Director';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0E0C0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 60,
            height: 4,
            background: '#E04458',
            marginBottom: 40,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#F5F0E6',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Noah Williams
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#777777',
            marginTop: 20,
            lineHeight: 1.4,
          }}
        >
          Freelance Creative Director. Strategy to Final Files.
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 18,
            color: '#444444',
            marginTop: 40,
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
          Bangkok, GMT+7
        </div>
      </div>
    ),
    { ...size },
  );
}
