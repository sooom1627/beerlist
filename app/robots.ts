import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/auth/confirm/'],
    },
    sitemap: 'https://beerlist-sepia.vercel.app/sitemap.xml',
  }
}

