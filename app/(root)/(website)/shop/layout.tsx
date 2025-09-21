import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rapidex.tech'),
    title: "Shop - Premium Industrial Components & Robotics Parts | Rapidex Engineering Services",
    description: "Browse our extensive collection of industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs and more. Quality guaranteed.",
    keywords: ["shop", "products", "industrial components", "robotics parts", "automation", "nut bolts", "fasteners", "bearings", "sensors", "PLCs", "browse products"],
    openGraph: {
        title: "Shop - Premium Industrial Components & Robotics Parts | Rapidex Engineering Services",
        description: "Browse our extensive collection of industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs and more. Quality guaranteed.",
        url: "/shop",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shop - Premium Industrial Components & Robotics Parts | Rapidex Engineering Services",
        description: "Browse our extensive collection of industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs and more. Quality guaranteed.",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    alternates: {
        canonical: "/shop",
    },
};

interface ShopLayoutProps {
    children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
    return children;
}
