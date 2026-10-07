import type { MetadataRoute } from 'next'

const BASE = 'https://codemakerclub.ro'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/contact', '/termeni', '/confidentialitate'].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }))
}
