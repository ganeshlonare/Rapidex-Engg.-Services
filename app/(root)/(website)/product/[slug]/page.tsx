import axios from 'axios'
import React from 'react'
import ProductDetails from './ProductDetails'
import { generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo'
import StructuredData, { MultipleStructuredData } from '@/components/SEO/StructuredData'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
    params: {
        slug: string;
    };
}

// Generate metadata for this page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params
    
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/details/${slug}`
        const { data: getProduct } = await axios.get(url)
        
        if (!getProduct.success || !getProduct.data?.product) {
            return {
                title: 'Product Not Found | Rapidex Engineering Services',
                description: 'The requested product could not be found.',
                robots: 'noindex,nofollow',
            }
        }
        
        const product = getProduct.data.product
        return {
            metadataBase: new URL('https://www.rapidex.tech'),
            title: `${product.name} - ${product.category?.name || 'Industrial Components'} | Rapidex Engineering Services`,
            description: `${product.description || `Buy ${product.name} - high quality industrial component with fast shipping and expert support.`}`,
            keywords: [product.name, product.category?.name, "industrial components", "robotics parts", "automation solutions"],
            openGraph: {
                title: `${product.name} - ${product.category?.name || 'Industrial Components'} | Rapidex Engineering Services`,
                description: `${product.description || `Buy ${product.name} - high quality industrial component with fast shipping and expert support.`}`,
                url: `/product/${slug}`,
                images: [product.images?.[0]?.url || "/assets/images/rapidex-social-share.png"],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title: `${product.name} - ${product.category?.name || 'Industrial Components'} | Rapidex Engineering Services`,
                description: `${product.description || `Buy ${product.name} - high quality industrial component with fast shipping and expert support.`}`,
                images: [product.images?.[0]?.url || "/assets/images/rapidex-social-share.png"],
            },
            alternates: {
                canonical: `/product/${slug}`,
            },
        }
    } catch (error) {
        return {
            title: 'Product Not Found | Rapidex Engineering Services',
            description: 'The requested product could not be found.',
            robots: 'noindex,nofollow',
        }
    }
}

const ProductPage = async ({ params }: PageProps) => {
    const { slug } = params

    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`

    try {
        const { data: getProduct } = await axios.get(url)

        if (!getProduct.success || !getProduct.data?.product) {
            notFound()
        }

        const product = getProduct.data.product
        const variant = getProduct.data.variant
        const reviewCount = getProduct.data.reviewCount

        // Generate structured data
        const productSchema = generateProductSchema({
            ...product,
            reviewCount
        })

        const breadcrumbSchema = generateBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/shop' },
            { name: product.category?.name || 'Category', url: `/category/${product.category?.slug}` },
            { name: product.name, url: `/product/${product.slug}` }
        ])

        return (
            <>
                <MultipleStructuredData dataArray={[productSchema, breadcrumbSchema]} />
                <ProductDetails
                    product={product}
                    variant={variant}
                    reviewCount={reviewCount}
                />
            </>
        )
    } catch (error) {
        notFound()
    }
}

export default ProductPage