'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { IoStar } from "react-icons/io5";
import { WEBSITE_CART, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
import { decode, encode } from "entities";
import { HiMinus, HiPlus } from "react-icons/hi2";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart } from "@/store/reducer/cartReducer";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import loadingSvg from '@/public/assets/images/loading.svg'
import ProductReveiw from "@/components/Application/Website/ProductReveiw";
const ProductDetails = ({ product, variant, reviewCount }) => {

    const dispatch = useDispatch()
    const cartStore = useSelector((store: any) => store.cartStore)
    
    const [activeThumb, setActiveThumb] = useState<string | undefined>(undefined)
    const [qty, setQty] = useState(1)
    const [isAddedIntoCart, setIsAddedIntoCart] = useState(false)
    const [isProductLoading, setIsProductLoading] = useState(false)
    useEffect(() => {
        // Prefer variant media; fallback to product media; then placeholder
        const firstVariantImage = variant?.media?.[0]?.secure_url
        const firstProductImage = product?.media?.[0]?.secure_url
        setActiveThumb(firstVariantImage || firstProductImage || imgPlaceholder.src)
    }, [variant, product])

    useEffect(() => {
        if (cartStore.count > 0 && variant) {
            const existingProduct = cartStore.products.findIndex((cartProduct) => cartProduct.productId === product._id && cartProduct.variantId === variant._id)

            if (existingProduct >= 0) {
                setIsAddedIntoCart(true)
            } else {
                setIsAddedIntoCart(false)
            }
        }

        setIsProductLoading(false)

    }, [variant, cartStore.count, cartStore.products, product._id])

    const handleThumb = (thumbUrl) => {
        setActiveThumb(thumbUrl)
    }

    const handleQty = (actionType) => {
        if (actionType === 'inc') {
            setQty(prev => prev + 1)
        } else {
            if (qty !== 1) {
                setQty(prev => prev - 1)
            }
        }
    }


    const handleAddToCart = () => {
        // Prefer variant media array; fallback to product media array; finally placeholder string
        const mediaForCart = (variant?.media && Array.isArray(variant.media) && variant.media.length > 0)
            ? variant.media
            : ((product?.media && Array.isArray(product.media) && product.media.length > 0)
                ? product.media
                : imgPlaceholder.src)

        const cartProduct = {
            productId: product._id,
            variantId: variant?._id || product._id, // Use product ID if no variant
            name: product.name,
            url: product.slug,
            mrp: variant?.mrp || product.mrp,
            sellingPrice: variant?.sellingPrice || product.sellingPrice,
            media: mediaForCart,
            qty: qty
        }

        dispatch(addIntoCart(cartProduct))
        setIsAddedIntoCart(true)
        showToast('success', 'Product added into cart.')
    }

    return (
        <div className="lg:px-32 px-4">

            {isProductLoading &&
                <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50">
                    <Image src={loadingSvg} width={80} height={80} alt="Loading" />
                </div>
            }

            <div className="my-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>{product?.name} </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
                <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
                    <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
                        <Image
                            src={activeThumb || imgPlaceholder.src}
                            width={650}
                            height={650}
                            alt="product"
                            className="border rounded max-w-full"
                        />
                    </div>
                    <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px]">
                        {(variant?.media?.length ? variant.media : (product?.media || [])).map((thumb: any, idx: number) => (
                            <Image
                                key={thumb?._id || idx}
                                src={thumb?.secure_url || imgPlaceholder.src}
                                width={100}
                                height={100}
                                alt="product thumbnail"
                                className={`md:max-w-full max-w-16 rounded cursor-pointer ${thumb?.secure_url === activeThumb ? 'border-2 border-primary' : 'border'}`}
                                onClick={() => handleThumb(thumb?.secure_url || imgPlaceholder.src)}
                            />
                        ))}
                    </div>
                </div>

                <div className="md:w-1/2 md:mt-0 mt-5">
                    <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
                    <div className="flex items-center gap-1 mb-5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <IoStar key={i} />
                        ))}
                        <span className="text-sm ps-2">({reviewCount} Reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl font-semibold">{(variant?.sellingPrice || product.sellingPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
                        <span className="text-sm line-through text-gray-500">{(variant?.mrp || product.mrp).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>

                        <span className="bg-red-500 rounded-2xl px-3 py-1 text-white text-xs ms-5">-{variant?.discountPercentage || product.discountPercentage}%</span>
                    </div>

                    <div className="line-clamp-3" dangerouslySetInnerHTML={{ __html: decode(product.description) }}></div>


                    <div className="mt-5">
                        <p className="font-bold mb-2">Quantity</p>
                        <div className="flex items-center h-10 border w-fit rounded-full">

                            <button type="button" className="h-full w-10 flex justify-center items-center" onClick={() => handleQty('desc')}>
                                <HiMinus />
                            </button>
                            <input type="text" value={qty} className="w-14 text-center border-none outline-offset-0" readOnly />
                            <button type="button" className="h-full w-10 flex justify-center items-center" onClick={() => handleQty('inc')}>
                                <HiPlus />
                            </button>

                        </div>
                    </div>


                    <div className="mt-5">
                        {!isAddedIntoCart ?
                            <ButtonLoading type="button" text="Add To Cart" loading={false} className="w-full rounded-full py-6 text-md cursor-pointer" onClick={handleAddToCart} />
                        :
                            <Button variant="default" size="default" className="w-full rounded-full py-6 text-md cursor-pointer" type="button" asChild>
                                <Link href={WEBSITE_CART}>Go To Cart</Link>
                            </Button>
                        }


                    </div>

                </div>
            </div>


            <div className="mb-10">
                <div className="shadow rounded border">
                    <div className="p-3 bg-gray-50 border-b">
                        <h2 className="font-semibold text-2xl">Product Description</h2>
                    </div>
                    <div className="p-3">
                        <div dangerouslySetInnerHTML={{ __html: encode(product.description) }}></div>
                    </div>
                </div>
            </div>

            <ProductReveiw productId={product._id} />

        </div>
    )
}

export default ProductDetails