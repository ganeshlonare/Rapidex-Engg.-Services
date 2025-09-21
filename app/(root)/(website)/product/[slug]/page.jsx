import axios from 'axios'
import React from 'react'
import ProductDetails from './ProductDetails'
import { generateProductMetadata, generateProductSchema, generateBreadcrumbSchema } from '@/lib/seo'
import StructuredData, { MultipleStructuredData } from '@/components/SEO/StructuredData'
import { notFound } from 'next/navigation'

// Generate metadata for this page
export async function generateMetadata({ params }) {
    const { slug } = await params
    
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`
        const { data: getProduct } = await axios.get(url)
        
        if (!getProduct.success || !getProduct.data?.product) {
            return {
                title: 'Product Not Found',
                description: 'The requested product could not be found.',
            }
        }
        
        return generateProductMetadata(getProduct.data.product)
    } catch (error) {
        return {
            title: 'Product Not Found',
            description: 'The requested product could not be found.',
        }
    }
}

const ProductPage = async ({ params }) => {
    const { slug } = await params

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