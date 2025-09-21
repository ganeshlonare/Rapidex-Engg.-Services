import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
    title: "Shop - Premium Industrial Components & Robotics Parts",
    description: "Browse our extensive collection of industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs and more. Quality guaranteed.",
    keywords: ["shop", "products", "industrial components", "robotics parts", "automation", "nut bolts", "fasteners", "bearings", "sensors", "PLCs", "browse products"],
    url: "/shop"
});

export default function ShopLayout({ children }) {
    return children;
}
