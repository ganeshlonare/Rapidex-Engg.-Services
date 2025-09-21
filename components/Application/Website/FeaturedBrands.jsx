import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'

// Static brand list; replace image URLs when available
export const BRANDS = [
  { name: 'Bambu Lab', image: null },
  { name: 'Raspberry Pi', image: null },
  { name: 'Arduino', image: null },
  { name: 'M5Stack', image: null },
  { name: 'Waveshare', image: null },
  { name: 'Hobbywing', image: null },
  { name: 'FlySky', image: null },
  { name: 'DJI', image: null },
  { name: 'Radiomaster', image: null },
  { name: 'DFRobot', image: null },
  { name: 'Seeed Studio', image: null },
  { name: 'Pro Range', image: null },
  { name: 'Creality', image: null },
  { name: 'T-Motor', image: null },
  { name: 'Espressif', image: null },
  { name: 'REYAX', image: null },
  { name: 'ASAIR', image: null },
  { name: 'NVIDIA', image: null },
  { name: 'Smartelex', image: null },
  { name: 'OWON', image: null },
  { name: 'SpeedyBee', image: null },
  { name: 'HC Robotics', image: null },
  { name: 'Adafruit', image: null },
  { name: 'Nanoradar', image: null },
]

const FeaturedBrands = () => {
  return (
    <section className='lg:px-32 px-4 sm:py-10'>
      {/* Header */}
      <div className='relative mb-5'>
        <h2 className='sm:text-4xl text-2xl font-semibold text-center'>Our Featured Brands</h2>
        <Link href="/featured-brands" className='hidden sm:inline-block absolute right-0 top-2 underline underline-offset-4 hover:text-primary'>
          View all
        </Link>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6'>
        {BRANDS.slice(0, 25).map((brand, idx) => (
          <div key={idx} className='rounded-xl border bg-white dark:bg-card shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[120px] sm:min-h-[140px] md:min-h-[150px] flex items-center justify-center overflow-hidden'>
            {brand.image ? (
              <Image src={brand.image} alt={brand.name} width={200} height={100} className='object-contain p-6' />
            ) : (
              <span className='text-gray-600 text-sm sm:text-base font-medium'>{brand.name}</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile "View all" link */}
      <div className='sm:hidden mt-4 text-right'>
        <Link href="/featured-brands" className='underline underline-offset-4 hover:text-primary'>
          View all
        </Link>
      </div>
    </section>
  )
}

export default FeaturedBrands
