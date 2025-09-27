import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import ProductModel from "@/models/Product.model";
// Ensure Media model is registered for populate
import "@/models/Media.model";
import ProductVariantModel from "@/models/ProductVariant.model";
import ReviewModel from "@/models/Review.model";

export async function GET(request, { params }) {
    try {

        await connectDB()

        const getParams = await params
        const slug = getParams.slug

        const searchParams = request.nextUrl.searchParams
        const size = searchParams.get('size')
        const color = searchParams.get('color')


        if (!slug) {
            return response(false, 404, 'Product not found.')
        }

        const filter: any = {
            deletedAt: null,
            slug: slug
        }

        // get product with media populated
        const getProduct = await (ProductModel as any).findOne(filter)
            .populate({ path: 'media', select: 'secure_url alt title' })
            .lean()

        if (!getProduct) {
            return response(false, 404, 'Product not found.')
        }

        // For now, let's simplify and return just the product data
        // We can add variants later once the basic functionality works
        const productData = {
            product: getProduct,
            variant: null,
            colors: [],
            sizes: [],
            reviewCount: 0
        }

        return response(true, 200, 'Product data found.', productData)

    } catch (error: any) {
        return catchError(error, 'Failed to fetch product details')
    }
}