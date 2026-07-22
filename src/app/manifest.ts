import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lourdu Raju — Machine Learning Engineer',
    short_name: 'Lourdu Raju',
    description:
      'ML Engineer specializing in GenAI, Computer Vision, and Production ML systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#0A0A0A',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/icon', sizes: '512x512', type: 'image/png' },
    ],
  }
}
