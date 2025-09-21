// Lazy loading components for better performance
import dynamic from 'next/dynamic'

// Lazy load heavy components
export const LazyTestimonial = dynamic(() => import('@/components/Application/Website/Testimonial'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
})

export const LazyFeaturedBrands = dynamic(() => import('@/components/Application/Website/FeaturedBrands'), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: true
})

export const LazyProductBox = dynamic(() => import('@/components/Application/Website/ProductBox'), {
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
})

export const LazyFilter = dynamic(() => import('@/components/Application/Website/Filter'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
})
