import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BRANDS } from '@/components/Application/Website/FeaturedBrands'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'

export const metadata = {
  title: 'Featured Brands',
  description: 'Browse all featured brands',
}

const FeaturedBrandsPage = () => {
  return (
    <section className="lg:px-32 px-4 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="sm:text-4xl text-2xl font-semibold">All Featured Brands</h1>
        <Link href={WEBSITE_SHOP} className="underline underline-offset-4 hover:text-primary">
          Back to Shop
        </Link>
      </div>

      {/* Same grid/card styling as on home */}
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6">
        {BRANDS.map((brand, idx) => (
          <div key={idx} className="rounded-xl border bg-white dark:bg-card shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[120px] sm:min-h-[140px] md:min-h-[150px] flex items-center justify-center overflow-hidden">
            {brand.image ? (
              <Image src={brand.image} alt={brand.name} width={200} height={100} className="object-contain p-6" />
            ) : (
              <span className="text-gray-600 text-sm sm:text-base font-medium">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedBrandsPage
