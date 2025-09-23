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
        // Use API base directly; it already contains '/api'
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`
        const { data: getProduct } = await axios.get(url)
        
        if (!getProduct.success || !getProduct.data?.product) {
            return {
                title: 'Product Not Found | Rapidex Engineering Services',
                description: 'The requested product could not be found.',
                robots: 'noindex,nofollow',
            }
        }
        
        const product = getProduct.data.product
        const productDescription = product.description || `Buy ${product.name} - high quality industrial component with fast shipping and expert support.`
        const productImage = product.images?.[0]?.url || "/assets/images/rapidex-social-share.png"
        
        return {
            metadataBase: new URL('https://www.rapidex.tech'),
            title: `${product.name} - ${product.category?.name || 'Industrial Components'}`,
            description: productDescription.length > 160 ? productDescription.substring(0, 157) + '...' : productDescription,
            keywords: [
                product.name, 
                product.category?.name, 
                product.brand?.name,
                "industrial components", 
                "robotics parts", 
                "automation solutions",
                "buy online",
                "rapidex"
            ].filter(Boolean),
            authors: [{ name: "Rapidex Engineering Services" }],
            creator: "Rapidex Engineering Services",
            publisher: "Rapidex Engineering Services",
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
            openGraph: {
                type: "website",
                locale: "en_US",
                url: `/product/${slug}`,
                title: `${product.name} - ${product.category?.name || 'Industrial Components'}`,
                description: productDescription,
                siteName: "Rapidex Engineering Services",
                images: [
                    {
                        url: productImage,
                        width: 800,
                        height: 600,
                        alt: `${product.name} - ${product.category?.name || 'Industrial Component'}`,
                        type: 'image/jpeg',
                    },
                    {
                        url: "/assets/images/rapidex-social-share.png",
                        width: 1200,
                        height: 630,
                        alt: "Rapidex Engineering Services - Premium Industrial Components",
                        type: 'image/png',
                    }
                ],
            },
            twitter: {
                card: "summary_large_image",
                site: "@rapidextech",
                creator: "@rapidextech",
                title: `${product.name} - ${product.category?.name || 'Industrial Components'}`,
                description: productDescription.length > 200 ? productDescription.substring(0, 197) + '...' : productDescription,
                images: [
                    {
                        url: productImage,
                        alt: `${product.name} - ${product.category?.name || 'Industrial Component'}`,
                    }
                ],
            },
            alternates: {
                canonical: `/product/${slug}`,
            },
            category: 'technology',
            classification: `${product.category?.name || 'Industrial Components'} - E-commerce Product`,
            other: {
                'product:brand': product.brand?.name || 'Rapidex',
                'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
                'product:condition': 'new',
                'product:price:amount': product.sellingPrice?.toString() || '',
                'product:price:currency': 'INR',
                'og:price:amount': product.sellingPrice?.toString() || '',
                'og:price:currency': 'INR',
                'product:retailer_item_id': product.sku || product._id,
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