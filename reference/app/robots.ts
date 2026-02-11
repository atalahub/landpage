import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.lacorte.dev'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/data/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

