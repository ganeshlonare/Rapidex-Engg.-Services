import mongoose from "mongoose";
// Import all models to ensure they are registered
import MediaModel from "@/models/Media.model";
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/ProductVariant.model";

const MONGODB_URL = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {
        conn: null,
        promise: null,
    }
}

export const connectDB = async () => {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            dbName: 'YT-NEXTJS-ECOMMERCE',
            bufferCommands: false
        })
    }

    cached.conn = await cached.promise

    return cached.conn
}