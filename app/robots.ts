import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/account', '/partner/dashboard', '/admin', '/checkout', '/payment'],
    },
    sitemap: 'https://nielsprive.com/sitemap.xml',
  }
}
