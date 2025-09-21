import { NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import Product from '@/models/Product.model'

export async function GET() {
    try {
        await connectDB()
        
        const products = await Product.find({ 
            status: 'active',
            isDeleted: false 
        })
        .select('slug name updatedAt')
        .lean()
        
        return NextResponse.json({
            success: true,
            data: products
        })
    } catch (error) {
        console.error('Error fetching products for sitemap:', error)
        return NextResponse.json({
            success: false,
            data: []
        })
    }
}
