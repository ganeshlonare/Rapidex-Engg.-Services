import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
    title: "Shopping Cart - Review Your Items",
    description: "Review and manage items in your shopping cart. Secure checkout with fast shipping on industrial components and robotics parts.",
    keywords: ["cart", "shopping cart", "checkout", "review items"],
    url: "/cart",
    noIndex: true // Cart pages typically shouldn't be indexed
});

export default function CartLayout({ children }) {
    return children;
}
