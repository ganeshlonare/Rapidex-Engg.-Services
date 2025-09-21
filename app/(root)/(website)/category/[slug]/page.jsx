import axios from 'axios'
import React from 'react'
import { generateCategoryMetadata, generateBreadcrumbSchema } from '@/lib/seo'
import StructuredData from '@/components/SEO/StructuredData'
import { notFound } from 'next/navigation'
import ProductBox from '@/components/Application/Website/ProductBox'

// Generate metadata for category pages
export async function generateMetadata({ params }) {
    const { slug } = params
    
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/details/${slug}`
        const { data: getCategory } = await axios.get(url)
        
        if (!getCategory.success || !getCategory.data?.category) {
            return {
                title: 'Category Not Found',
                description: 'The requested category could not be found.',
            }
        }
        
        return generateCategoryMetadata(getCategory.data.category)
    } catch (error) {
        return {
            title: 'Category Not Found',
            description: 'The requested category could not be found.',
        }
    }
}

const CategoryPage = async ({ params }) => {
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
