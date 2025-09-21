import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rapidex.tech'),
    title: "Terms & Conditions - Service Agreement | Rapidex Engineering Services",
    description: "Read our terms and conditions to understand the rules and guidelines for using our e-commerce platform and purchasing industrial components.",
    keywords: ["terms and conditions", "service agreement", "terms of use", "legal"],
    openGraph: {
        title: "Terms & Conditions - Service Agreement | Rapidex Engineering Services",
        description: "Read our terms and conditions to understand the rules and guidelines for using our e-commerce platform and purchasing industrial components.",
        url: "/terms-and-conditions",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Terms & Conditions - Service Agreement | Rapidex Engineering Services",
        description: "Read our terms and conditions to understand the rules and guidelines for using our e-commerce platform and purchasing industrial components.",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    alternates: {
        canonical: "/terms-and-conditions",
    },
};

interface TermsLayoutProps {
    children: React.ReactNode;
}

export default function TermsLayout({ children }: TermsLayoutProps) {
    return children;
}
