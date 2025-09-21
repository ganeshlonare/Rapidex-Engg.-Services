import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rapidex.tech'),
    title: "Shopping Cart - Review Your Items | Rapidex Engineering Services",
    description: "Review and manage items in your shopping cart. Secure checkout with fast shipping on industrial components and robotics parts.",
    keywords: ["cart", "shopping cart", "checkout", "review items"],
    robots: "noindex,nofollow", // Cart pages typically shouldn't be indexed
    openGraph: {
        title: "Shopping Cart - Review Your Items | Rapidex Engineering Services",
        description: "Review and manage items in your shopping cart. Secure checkout with fast shipping on industrial components and robotics parts.",
        url: "/cart",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Shopping Cart - Review Your Items | Rapidex Engineering Services",
        description: "Review and manage items in your shopping cart. Secure checkout with fast shipping on industrial components and robotics parts.",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    alternates: {
        canonical: "/cart",
    },
};

interface CartLayoutProps {
    children: React.ReactNode;
}

export default function CartLayout({ children }: CartLayoutProps) {
    return children;
}
