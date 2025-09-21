import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/databaseConnection'
import Category from '@/models/Category.model'

export async function GET() {
    try {
        await connectDB()
        
        const categories = await Category.find({ 
            status: 'active',
            isDeleted: false 
        })
        .select('slug name updatedAt')
        .lean()
        
        return NextResponse.json({
            success: true,
            data: categories
        })
    } catch (error) {
        console.error('Error fetching categories for sitemap:', error)
        return NextResponse.json({
            success: false,
            data: []
        })
    }
}
