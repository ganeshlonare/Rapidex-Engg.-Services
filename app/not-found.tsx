import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rapidex.tech'),
    title: "Page Not Found - 404 Error | Rapidex Engineering Services",
    description: "The page you&apos;re looking for doesn&apos;t exist. Return to our homepage to continue shopping for industrial components and robotics parts.",
    keywords: ["404", "not found", "error"],
    robots: "noindex,nofollow",
    openGraph: {
        title: "Page Not Found - 404 Error | Rapidex Engineering Services",
        description: "The page you're looking for doesn't exist. Return to our homepage to continue shopping for industrial components and robotics parts.",
        url: "/404",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Page Not Found - 404 Error | Rapidex Engineering Services",
        description: "The page you're looking for doesn't exist. Return to our homepage to continue shopping for industrial components and robotics parts.",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    alternates: {
        canonical: "/404",
    },
};

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
                </p>
                <div className="space-x-4">
                    <Link 
                        href="/" 
                        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link 
                        href="/shop" 
                        className="inline-block border border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    )
}
