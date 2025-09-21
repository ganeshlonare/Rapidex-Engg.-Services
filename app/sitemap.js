import { siteConfig } from '@/lib/seo'
import { connectDB } from '@/lib/databaseConnection'
import Product from '@/models/Product.model'
import Category from '@/models/Category.model'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

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

  // Dynamic product pages (query directly instead of HTTP fetch)
  let productPages = []
  try {
    await connectDB()
    const products = await Product.find({
      status: 'active',
      isDeleted: false,
    })
      .select('slug updatedAt')
      .lean()

    productPages = (products || []).map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
  }

  // Dynamic category pages
  let categoryPages = []
  try {
    // DB already connected above; safe to reuse
    const categories = await Category.find({
      status: 'active',
      isDeleted: false,
    })
      .select('slug updatedAt')
      .lean()

    categoryPages = (categories || []).map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date(category.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error)
  }

  return [...staticPages, ...productPages, ...categoryPages]
}
