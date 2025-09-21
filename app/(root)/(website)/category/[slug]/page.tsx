import axios from 'axios'
import React from 'react'
import { generateBreadcrumbSchema } from '@/lib/seo'
import StructuredData from '@/components/SEO/StructuredData'
import { notFound } from 'next/navigation'
import ProductBox from '@/components/Application/Website/ProductBox'
import { Metadata } from 'next'

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate metadata for category pages
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params
    
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/details/${slug}`
        const { data: getCategory } = await axios.get(url)
        
        if (!getCategory.success || !getCategory.data?.category) {
            return {
                title: 'Category Not Found | Rapidex Engineering Services',
                description: 'The requested category could not be found.',
                robots: 'noindex,nofollow',
            }
        }
        
        const category = getCategory.data.category
        return {
            metadataBase: new URL('https://www.rapidex.tech'),
            title: `${category.name} - Industrial Components & Parts | Rapidex Engineering Services`,
            description: `Shop ${category.name} products including industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping.`,
            keywords: [category.name, "industrial components", "robotics parts", "automation solutions"],
            openGraph: {
                title: `${category.name} - Industrial Components & Parts | Rapidex Engineering Services`,
                description: `Shop ${category.name} products including industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping.`,
                url: `/category/${slug}`,
                images: [category.image?.url || "/assets/images/rapidex-social-share.png"],
            },
            twitter: {
                card: "summary_large_image",
                title: `${category.name} - Industrial Components & Parts | Rapidex Engineering Services`,
                description: `Shop ${category.name} products including industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping.`,
                images: [category.image?.url || "/assets/images/rapidex-social-share.png"],
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
        // Fetch category details
        const categoryUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/details/${slug}`
        const { data: getCategory } = await axios.get(categoryUrl)

        if (!getCategory.success || !getCategory.data?.category) {
            notFound()
        }

        // Fetch products in this category
        const productsUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/by-category/${slug}`
        const { data: getProducts } = await axios.get(productsUrl)

        const category = getCategory.data.category
        const products = getProducts.success ? getProducts.data : []

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
