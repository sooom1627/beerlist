import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NEIGHBOR Craftbeer & Grill',
    short_name: 'NEIGHBOR',
    description: 'NEIGHBOR Craftbeer & Grill / Nogata City, Nakano, Tokyo, Japan',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#fafafa',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

