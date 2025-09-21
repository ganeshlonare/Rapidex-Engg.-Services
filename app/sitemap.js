import { siteConfig } from '@/lib/seo'

export default async function sitemap() {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic product pages (you can fetch from your API)
  let productPages = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sitemap/products`)
    if (response.ok) {
      const products = await response.json()
      productPages = products.data?.map(product => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      })) || []
    }
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // Dynamic category pages
  let categoryPages = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sitemap/categories`)
    if (response.ok) {
      const categories = await response.json()
      categoryPages = categories.data?.map(category => ({
        url: `${baseUrl}/category/${category.slug}`,
        lastModified: new Date(category.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      })) || []
    }
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return [...staticPages, ...productPages, ...categoryPages]
}
