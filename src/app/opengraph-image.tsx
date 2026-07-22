import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            background: 'rgba(255, 59, 48, 0.06)',
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 300,
            height: 300,
            background: 'rgba(10, 10, 10, 0.03)',
            borderRadius: '50%',
            transform: 'translate(-20%, 20%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: '#22c55e',
              borderRadius: '50%',
            }}
          />
          <span style={{ fontSize: 14, color: '#999999', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Machine Learning Engineer
          </span>
        </div>
        <h1 style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.03em', color: '#0A0A0A', margin: 0, lineHeight: 1.1 }}>
          Lourdu Raju
        </h1>
        <p style={{ fontSize: 24, color: '#6B6B6B', marginTop: 16, maxWidth: 600, lineHeight: 1.4 }}>
          Building production systems at the intersection of GenAI, Computer Vision, and low-latency ML serving.
        </p>
      </div>
    ),
    { ...size }
  )
}
