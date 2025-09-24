import React from 'react'
import { generateBreadcrumbSchema } from '@/lib/seo'
import StructuredData from '@/components/SEO/StructuredData'
import { notFound } from 'next/navigation'
import ProductBox from '@/components/Application/Website/ProductBox'
import { Metadata } from 'next'
import getBaseUrl from '@/lib/getBaseUrl'

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate metadata for category pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params
    
    try {
        const baseUrl = getBaseUrl()
        const res = await fetch(`${baseUrl}/api/category/get-category`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch categories')
        const getCategory = await res.json()
        const category = Array.isArray(getCategory.data) ? getCategory.data.find((c) => c.slug === slug) : null

        if (!getCategory.success || !category) {
            return {
                title: 'Category Not Found | Rapidex Engineering Services',
                description: 'The requested category could not be found.',
                robots: 'noindex,nofollow',
            }
        }
        
        return {
            metadataBase: new URL('https://www.rapidex.tech'),
            title: `${category.name} - Industrial Components & Parts | Rapidex Engineering Services`,
            description: `Shop ${category.name} products including industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping.`,
            keywords: [category.name, "industrial components", "robotics parts", "automation solutions"],
            openGraph: {
                title: `${category.name} - Industrial Components & Parts | Rapidex Engineering Services`,
                description: `Shop ${category.name} products including industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping.`,
                url: `/category/${slug}`,
                images: [category.media?.secure_url || "/assets/images/rapidex-social-share.png"],
            },
            twitter: {
                card: "summary_large_image",
                title: `${category.name} - Industrial Components & Parts | Rapidex Engineering Services`,
                description: `Shop ${category.name} products including industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping.`,
                images: [category.media?.secure_url || "/assets/images/rapidex-social-share.png"],
            },
            alternates: {
                canonical: `/category/${slug}`,
            },
        }
    } catch (error) {
        return {
            title: 'Category Not Found | Rapidex Engineering Services',
            description: 'The requested category could not be found.',
            robots: 'noindex,nofollow',
        }
    }
}

const CategoryPage = async ({ params }: PageProps) => {
    const { slug } = params

    try {
        const baseUrl = getBaseUrl()
        // Fetch categories and find the matching one
        const catRes = await fetch(`${baseUrl}/api/category/get-category`, { cache: 'no-store' })
        if (!catRes.ok) throw new Error('Failed to fetch categories')
        const categories = await catRes.json()
        const category = Array.isArray(categories.data) ? categories.data.find((c) => c.slug === slug) : null

        if (!categories.success || !category) {
            notFound()
        }

        // Fetch products for this category via shop endpoint
        const shopRes = await fetch(`${baseUrl}/api/shop?category=${encodeURIComponent(slug)}&limit=60`, { cache: 'no-store' })
        if (!shopRes.ok) throw new Error('Failed to fetch products')
        const shopData = await shopRes.json()

        const products = shopData.success ? shopData.data?.products ?? [] : []

        // Generate breadcrumb schema
        const breadcrumbSchema = generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Shop', url: '/shop' },
            { name: category.name, url: `/category/${category.slug}` }
        ])

        return (
            <>
                <StructuredData data={breadcrumbSchema} />
                <div className="lg:px-32 px-4 py-10">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                        {category.description && (
                            <p className="text-lg text-gray-600">{category.description}</p>
                        )}
                    </div>
                    
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-500">No products found in this category.</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <ProductBox key={product._id} product={product} />
                            ))
                        )}
                    </div>
                </div>
            </>
        )
    } catch (error) {
        notFound()
    }
}

export default CategoryPage
