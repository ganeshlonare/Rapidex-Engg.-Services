import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";

import CategoryModel from "@/models/Category.model";
// Side-effect import to ensure model is registered for populate
import "@/models/Media.model";

export async function GET() {
    try {

        await connectDB()

        const getCategory = await CategoryModel.find({ deletedAt: null })
            .populate({ path: 'media', select: 'secure_url alt title' })
            .lean()

        if (!getCategory || getCategory.length === 0) {
            return response(false, 404, 'Category not found.', [])
        }

        return response(true, 200, 'Category found.', getCategory)

    } catch (error: any) {
        return catchError(error, 'Failed to fetch categories')
    }
}