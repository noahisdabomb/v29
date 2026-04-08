import { ImageResponse } from 'next/og';
import { CASE_STUDIES } from '@/lib/content';

export const alt = 'Selected Work | Noah Williams, Creative Director';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Deduplicate client names (some clients appear more than once)
  const uniqueClients = Array.from(
    new Set(CASE_STUDIES.map((s) => s.client)),
  );

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
          {/* Accent line */}
          <div
            style={{
              width: 60,
              height: 4,
              background: '#E04458',
              marginBottom: 40,
            }}
          />

          {/* Heading */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#F5F0E6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Selected Work
          </div>

          {/* Client list */}
          <div
            style={{
              fontSize: 24,
              color: '#777777',
              marginTop: 32,
              lineHeight: 1.6,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {uniqueClients.map((client, i) => (
              <div
                key={client}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span>{client}</span>
                {i < uniqueClients.length - 1 && (
                  <span
                    style={{
                      margin: '0 16px',
                      color: '#333333',
                    }}
                  >
                    /
                  </span>
                )}
              </div>
            ))}
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
