import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
// Ensure Media model is registered for populate
import "@/models/Media.model";

export async function GET() {
    try {
        await connectDB()

        const getProduct = await (ProductModel as any).find({ deletedAt: null })
            .populate({ path: 'media', select: 'secure_url alt title' })
            .limit(8)
            .lean()

        if (!getProduct || getProduct.length === 0) {
            return response(false, 404, 'Product not found.', [])
        }

        return response(true, 200, 'Product found.', getProduct)

    } catch (error: any) {
        return catchError(error, 'Failed to fetch featured products')
    }
}