import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/profesori', '/cursanti', '/cursuri', '/abonamente', '/invata', '/parinte', '/api/'],
      },
    ],
    sitemap: 'https://codekidsplay.ro/sitemap.xml',
  }
}
