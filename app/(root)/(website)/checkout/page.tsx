'use client'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { zSchema } from '@/lib/zodSchema'
import { WEBSITE_ORDER_DETAILS, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { addIntoCart, clearCart } from '@/store/reducer/cartReducer'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useActionState, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { IoCloseCircleSharp } from "react-icons/io5";
import { z } from 'zod'
import { FaShippingFast } from "react-icons/fa";
import { Textarea } from '@/components/ui/textarea'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import getImageSrc from '@/lib/getImageSrc'

import loading from '@/public/assets/images/loading.svg'
import imgPlaceholder from '@/public/assets/images/img-placeholder.webp'
const breadCrumb = {
    title: 'Checkout',
    links: [
        { label: "Checkout" }
    ]
}
const Checkout = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const cart = useSelector((store: any) => store.cartStore)
    const authStore = useSelector((store: any) => store.authStore)
    const [verifiedCartData, setVerifiedCartData] = useState([])
    const { data: getVerifiedCartData } = useFetch('/api/cart-verification', 'POST', { data: cart.products })

    const [isCouponApplied, setIsCouponApplied] = useState(false)
    const [subtotal, setSubTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [couponDiscountAmount, setCouponDiscountAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [couponLoading, setCouponLoading] = useState(false)
    const [couponCode, setCouponCode] = useState('')

    const [placingOrder, setPlacingOrder] = useState(false)
    const [savingOrder, setSavingOrder] = useState(false)
    useEffect(() => {
        if (getVerifiedCartData && getVerifiedCartData.success) {
            const cartData = getVerifiedCartData.data
            const validItems = (Array.isArray(cartData) ? cartData : []).filter(Boolean)
            setVerifiedCartData(validItems)
        }
    }, [getVerifiedCartData])

    useEffect(() => {
        const cartProducts = (Array.isArray(cart?.products) ? cart.products : []).filter(Boolean)
        const verifiedProducts = (Array.isArray(verifiedCartData) ? verifiedCartData : []).filter(Boolean)
        const sourceProducts = cartProducts.length > 0 ? cartProducts : verifiedProducts

        const subTotalAmount = sourceProducts.reduce((sum, product) => sum + (Number(product?.sellingPrice ?? 0) * Number(product?.qty ?? 0)), 0)

        const discount = sourceProducts.reduce((sum, product) => sum + ((Number(product?.mrp ?? 0) - Number(product?.sellingPrice ?? 0)) * Number(product?.qty ?? 0)), 0)

        setSubTotal(subTotalAmount)
        setDiscount(discount)
        setTotalAmount(subTotalAmount)

        couponForm.setValue('minShoppingAmount', subTotalAmount)

    }, [cart, verifiedCartData])



    // coupon form 

    const couponFormSchema = zSchema.pick({
        code: true,
        minShoppingAmount: true
    })

    const couponForm = useForm({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            code: "",
            minShoppingAmount: subtotal
        }
    })

    const applyCoupon = async (values) => {
        setCouponLoading(true)
        try {
            const { data: response } = await axios.post('/api/coupon/apply', values)
            if (!response.success) {
                throw new Error(response.message)
            }

            const discountPercentage = response.data.discountPercentage
            // get coupon discount amount 
            setCouponDiscountAmount((subtotal * discountPercentage) / 100)
            setTotalAmount(subtotal - ((subtotal * discountPercentage) / 100))
            showToast('success', response.message)
            setCouponCode(couponForm.getValues('code'))
            setIsCouponApplied(true)

            couponForm.setValue('code', '')
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setCouponLoading(false)
        }
    }

    const removeCoupon = () => {
        setIsCouponApplied(false)
        setCouponCode('')
        setCouponDiscountAmount(0)
        setTotalAmount(subtotal)
    }


    // place order 
    const orderFormSchema = zSchema.pick({
        name: true,
        email: true,
        phone: true,
        country: true,
        state: true,
        city: true,
        pincode: true,
        landmark: true,
        ordernote: true
    }).extend({
        userId: z.string().optional()
    })

    const orderForm = useForm({
        resolver: zodResolver(orderFormSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            country: '',
            state: '',
            city: '',
            pincode: '',
            landmark: '',
            ordernote: '',
            userId: authStore?.auth?._id,
        }
    })


    useEffect(() => {
        if (authStore) {
            orderForm.setValue('userId', authStore?.auth?._id)
        }
    }, [authStore])

    // get order id 
    const getOrderId = async (amount) => {
        try {
            const paise = Math.round(Number(amount || 0) * 100)
            const { data: orderIdData } = await axios.post('/api/payment/get-order-id', { amount: paise })
            if (!orderIdData.success) {
                throw new Error(orderIdData.message)
            }

            return { success: true, order_id: orderIdData.data }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const placeOrder = async (formData) => {
        // Validate form
        const isValid = await orderForm.trigger()
        if (!isValid) {
            showToast('error', 'Please complete all required fields.')
            return
        }
        // Guard against invalid amount
        if (!totalAmount || totalAmount <= 0) {
            showToast('error', 'Cart amount is invalid. Please review your cart items.')
            return
        }
        // Ensure there are items in cart (either verified or current cart)
        const hasItems = (Array.isArray(verifiedCartData) && verifiedCartData.length > 0) || (Array.isArray(cart?.products) && cart.products.filter(Boolean).length > 0)
        if (!hasItems) {
            showToast('error', 'Your cart is empty. Please add items before placing order.')
            return
        }

        setPlacingOrder(true)
        try {
            const generateOrderId = await getOrderId(totalAmount)
            if (!generateOrderId.success) {
                throw new Error(generateOrderId.message)
            }

            const order_id = generateOrderId.order_id

            if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
                throw new Error('Payment key missing. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID')
            }

            const razOption = {
                "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                "amount": totalAmount * 100,
                "currency": "INR",
                "name": "Rapidex",
                "description": "Payment for order",
                "image": "https://res.cloudinary.com/dg7efdu9o/image/upload/v1750052410/logo-black_mb1rve.webp",
                "order_id": order_id,
                "handler": async function (response) {
                    setSavingOrder(true)
                    const products = verifiedCartData.map((cartItem) => (
                        {
                            productId: cartItem.productId,
                            variantId: cartItem.variantId,
                            name: cartItem.name,
                            qty: cartItem.qty,
                            mrp: cartItem.mrp,
                            sellingPrice: cartItem.sellingPrice,
                        }
                    ))

                    const { data: paymentResponseData } = await axios.post('/api/payment/save-order', {
                        ...formData,
                        ...response,
                        products: products,
                        subtotal: subtotal,
                        discount: discount,
                        couponDiscountAmount: couponDiscountAmount,
                        totalAmount: totalAmount
                    })

                    if (paymentResponseData.success) {
                        showToast('success', paymentResponseData.message)
                        dispatch(clearCart({}))
                        orderForm.reset()
                        router.push(WEBSITE_ORDER_DETAILS(response.razorpay_order_id))
                        setSavingOrder(false)
                    } else {
                        showToast('error', paymentResponseData.message)
                        setSavingOrder(false)
                    }
                },
                "prefill": {
                    "name": formData.name,
                    "email": formData.email,
                    "contact": formData.phone
                },

                "theme": {
                    "color": "#7c3aed"
                }
            }

            if (typeof window === 'undefined' || !(window as any).Razorpay) {
                throw new Error('Payment widget not loaded. Please retry in a moment or refresh the page.')
            }
            const RazorpayCtor = (window as any).Razorpay
            const rzp = new RazorpayCtor(razOption)
            rzp.on('payment.failed', function (response) {
                showToast('error', response.error.description)
            });

            rzp.open()

        } catch (error) {
            showToast('error', error.message)
        } finally {
            setPlacingOrder(false)
        }
    }

    // Determine products to display and whether there are items, considering both cart and verified data
    const cartProducts = (Array.isArray(cart?.products) ? cart.products : []).filter(Boolean)
    const displayProducts = (Array.isArray(verifiedCartData) && verifiedCartData.length > 0) ? verifiedCartData : cartProducts
    const hasItems = displayProducts.length > 0

    return (
        <div>

            {savingOrder &&
                <div className='h-screen w-screen fixed top-0 left-0 z-50 bg-black/10'>
                    <div className='h-screen flex justify-center items-center'>
                        <Image src={loading.src} height={80} width={80} alt='Loading' />
                        <h4 className='font-semibold'>Order Confirming...</h4>
                    </div>
                </div>
            }

            {!hasItems
                ?
                <div className='w-screen h-[500px] flex justify-center items-center py-32'>
                    <div className='text-center'>
                        <h4 className='text-4xl font-semibold mb-5'>Your cart is empty!</h4>

                        <Button type="button" asChild className="btn-orange">
                            <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
                        </Button>

                    </div>
                </div>
                :
                <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
                    <div className='lg:w-[60%] w-full'>
                        <div className='flex font-semibold gap-2 items-center'>
                            <FaShippingFast size={25} /> Shipping Address:
                        </div>
                        <div className='mt-5'>

                            <Form {...orderForm}>
                                <form className='grid grid-cols-2 gap-5' onSubmit={orderForm.handleSubmit(placeOrder)}>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='name'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Full name*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='email'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Email*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='phone'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Phone*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='country'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Country*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='state'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="State*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='city'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="City*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='pincode'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Pincode*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3'>
                                        <FormField
                                            control={orderForm.control}
                                            name='landmark'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input placeholder="Landmark*" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>
                                    <div className='mb-3 col-span-2'>
                                        <FormField
                                            control={orderForm.control}
                                            name='ordernote'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea className="" placeholder="Enter order note" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        >

                                        </FormField>
                                    </div>

                                    <div className='mb-3'>
                                        <ButtonLoading
                                            type="submit"
                                            text="Place Order"
                                            loading={placingOrder}
                                            disabled={placingOrder}
                                            className="btn-orange rounded-full px-5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                </form>
                            </Form>
                        </div>

                    </div>
                    <div className='lg:w-[40%] w-full'>
                        <div className='rounded bg-gray-50 p-5 sticky top-5'>
                            <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>
                            <div>

                                <table className='w-full border'>
                                    <tbody>
                                        {Array.isArray(displayProducts) && displayProducts.map(product => (
                                            <tr key={product.variantId}>
                                                <td className='p-3'>
                                                    <div className='flex items-center gap-5'>
                                                        <Image src={getImageSrc(product?.media)} width={60} height={60} alt={product?.name || 'Product'} className='rounded' />
                                                        <div>
                                                            <h4 className='font-medium line-clamp-1'>
                                                                <Link href={WEBSITE_PRODUCT_DETAILS(product.url)}>{product.name}</Link>
                                                            </h4>
                                                            <p className='text-sm'>Color: {product.color}</p>
                                                            <p className='text-sm'>Size: {product.size}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='p-3 text-center'>
                                                    <p className='text-nowrap text-sm'>
                                                        {Number(product.qty)} x {Number(product.sellingPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <table className='w-full'>
                                    <tbody>
                                        <tr>
                                            <td className='font-medium py-2'>Subtotal</td>
                                            <td className='text-end py-2'>
                                                {subtotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Discount</td>
                                            <td className='text-end py-2'>
                                                - {discount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2'>Coupon Discount</td>
                                            <td className='text-end py-2'>
                                                -  {couponDiscountAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='font-medium py-2 text-xl'>Total</td>
                                            <td className='text-end py-2'>
                                                {totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className='mt-2 mb-5'>
                                    {!isCouponApplied
                                        ?
                                        <Form {...couponForm}>
                                            <form className='flex justify-between gap-5' onSubmit={couponForm.handleSubmit(applyCoupon)}>
                                                <div className='w-[calc(100%-100px)]'>
                                                    <FormField
                                                        control={couponForm.control}
                                                        name='code'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input placeholder="Enter coupon code" {...field} />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    >

                                                    </FormField>
                                                </div>
                                                <div className='w-[100px]'>
                                                    <ButtonLoading type="submit" text="Apply" className="w-full cursor-pointer btn-orange" loading={couponLoading} />
                                                </div>
                                            </form>
                                        </Form>
                                        :
                                        <div className='flex justify-between py-1 px-5 rounded-lg bg-gray-200'>
                                            <div>
                                                <span className='text-xs'>Coupon:</span>
                                                <p className='text-sm font-semibold'>{couponCode}</p>
                                            </div>
                                            <button type='button' onClick={removeCoupon} className='text-red-500 cursor-pointer'>
                                                <IoCloseCircleSharp size={25} />
                                            </button>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }

            <Script src='https://checkout.razorpay.com/v1/checkout.js' strategy="afterInteractive" />
        </div>
    )
}

export default Checkout