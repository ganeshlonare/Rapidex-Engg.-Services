import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'

export const metadata = {
  title: 'All Categories',
  description: 'Browse all product categories',
}

const AllCategoriesPage = async () => {
  let categoryData = null
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-category`)
    categoryData = data
  } catch (error) {
    // ignore failure and render nothing
  }

  if (!categoryData) return null

  return (
    <section className="lg:px-32 px-4 sm:py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="sm:text-4xl text-2xl font-semibold">All Categories</h1>
        <Link href={WEBSITE_SHOP} className="underline underline-offset-4 hover:text-primary">
          Back to Shop
        </Link>
      </div>

      {/* Same card grid styling as FeaturedCategories */}
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-4 sm:gap-6">
        {!categoryData.success && (
          <div className="text-center py-5 col-span-full">Data Not Found.</div>
        )}

        {categoryData.success && categoryData.data.map((category) => (
          <Link
            key={category._id}
            href={`${WEBSITE_SHOP}?category=${encodeURIComponent(category.slug)}`}
            className="group block rounded-2xl border bg-white dark:bg-card shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[260px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px]"
          >
            <div className="p-4 flex flex-col h-full">
              {/* Image area (fixed height) */}
              <div className="rounded-xl bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center h-40 sm:h-52 md:h-56 lg:h-64 w-full overflow-hidden">
                {category.media?.secure_url ? (
                  <Image
                    src={category.media.secure_url}
                    alt={category.media.alt || category.name}
                    width={512}
                    height={512}
                    className="h-full w-full object-cover drop-shadow"
                  />
                ) : (
                  <div className="h-full w-full rounded bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-xs text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="pt-4 min-h-[36px] sm:min-h-[44px] md:min-h-[48px] max-h-[44px] sm:max-h-[48px] overflow-hidden">
                <span className="block text-sm sm:text-base font-medium text-center leading-snug break-words">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default AllCategoriesPage
