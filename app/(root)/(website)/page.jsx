import MainSlider from '@/components/Application/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner1 from '@/public/assets/images/banner1.png'
import banner2 from '@/public/assets/images/banner2.png'
import FeaturedProduct from '@/components/Application/Website/FeaturedProduct'
import FeaturedCategories from '@/components/Application/Website/FeaturedCategories'
import FeaturedBrands from '@/components/Application/Website/FeaturedBrands'
import Testimonial from '@/components/Application/Website/Testimonial'
import StaticMetaTags from '@/components/SEO/StaticMetaTags'
import { generateMetadata } from '@/lib/seo'

import { GiReturnArrow } from "react-icons/gi";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { TbRosetteDiscountFilled } from "react-icons/tb";

// Simplified static metadata for better social media compatibility
export const metadata = {
    title: "Home - Premium Industrial Components & Robotics Parts | Rapidex Engineering Services",
    description: "Shop premium industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping, 24/7 support, and member discounts.",
    keywords: "industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs, e-commerce, online shopping",
    authors: [{ name: "Rapidex Engineering Services" }],
    creator: "Rapidex Engineering Services",
    publisher: "Rapidex Engineering Services",
    robots: "index,follow",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://www.rapidex.tech",
        title: "Home - Premium Industrial Components & Robotics Parts | Rapidex Engineering Services",
        description: "Shop premium industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping, 24/7 support, and member discounts.",
        siteName: "Rapidex Engineering Services",
        images: [
            {
                url: "https://www.rapidex.tech/assets/images/rapidex-social-share.png",
                width: 1200,
                height: 630,
                alt: "Rapidex Engineering Services - Premium Industrial Components",
                type: 'image/png'
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        site: "@rapidextech",
        creator: "@rapidextech",
        title: "Home - Premium Industrial Components & Robotics Parts | Rapidex Engineering Services",
        description: "Shop premium industrial components, robotics parts, and automation solutions. Quality guaranteed with fast shipping, 24/7 support, and member discounts.",
        images: [{
            url: "https://www.rapidex.tech/assets/images/rapidex-social-share.png",
            alt: "Rapidex Engineering Services - Premium Industrial Components",
        }],
    },
    alternates: {
        canonical: "https://www.rapidex.tech",
    },
};

const Home = () => {
    return (
        <>
            <section>
                <MainSlider />
            </section>
            <section className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
                <div className='grid grid-cols-2 sm:gap-10 gap-2'>

                    <div className='border rounded-lg overflow-hidden'>
                        <Link href="" >
                            <Image
                                src={banner1.src}
                                width={banner1.width}
                                height={banner1.height}
                                alt='Premium Industrial Components and Robotics Parts - Special Offers'
                                className='transition-all hover:scale-110'
                                priority
                            />
                        </Link>
                    </div>
                    <div className='border rounded-lg overflow-hidden'>
                        <Link href="" >
                            <Image
                                src={banner2.src}
                                width={banner2.width}
                                height={banner2.height}
                                alt='Automation Solutions and Electronic Hardware - Browse Collection'
                                className='transition-all hover:scale-110'
                                priority
                            />
                        </Link>
                    </div>

                </div>
            </section>

            {/* Categories Section (same UI as Featured) */}
            <FeaturedCategories />

            <FeaturedProduct />

            {/* <Testimonial /> */}

            <section className='lg:px-32 px-4  border-t py-10'>
                <h2 className='text-3xl font-bold text-center mb-10'>Why Choose Rapidex?</h2>
                <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10'>
                    <div className='text-center'>
                        <p className='flex justify-center items-center mb-3'>
                            <GiReturnArrow size={30} />
                        </p>
                        <h3 className='text-xl font-semibold'>7-Days Returns</h3>
                        <p>Risk-free shopping with easy returns.</p>
                    </div>
                    <div className='text-center'>
                        <p className='flex justify-center items-center mb-3'>
                            <FaShippingFast size={30} />
                        </p>
                        <h3 className='text-xl font-semibold'>Free Shipping</h3>
                        <p>No extra costs, just the price you see.</p>
                    </div>
                    <div className='text-center'>
                        <p className='flex justify-center items-center mb-3'>
                            <BiSupport size={30} />
                        </p>
                        <h3 className='text-xl font-semibold'>24/7 Support</h3>
                        <p>24/7 support, alway here just for you.</p>
                    </div>
                    <div className='text-center'>
                        <p className='flex justify-center items-center mb-3'>
                            <TbRosetteDiscountFilled size={30} />
                        </p>
                        <h3 className='text-xl font-semibold'>Member Discounts</h3>
                        <p>Special offers for our loyal customers.</p>
                    </div>
                </div>

                
            </section>

            <FeaturedBrands />

        </>
    )
}

export default Home