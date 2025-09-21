import { Metadata } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rapidex.tech'),
    title: "Privacy Policy - Data Protection & Security | Rapidex Engineering Services",
    description: "Read our privacy policy to understand how we collect, use, and protect your personal information when shopping for industrial components.",
    keywords: ["privacy policy", "data protection", "security", "personal information"],
    openGraph: {
        title: "Privacy Policy - Data Protection & Security | Rapidex Engineering Services",
        description: "Read our privacy policy to understand how we collect, use, and protect your personal information when shopping for industrial components.",
        url: "/privacy-policy",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Privacy Policy - Data Protection & Security | Rapidex Engineering Services",
        description: "Read our privacy policy to understand how we collect, use, and protect your personal information when shopping for industrial components.",
        images: ["/assets/images/rapidex-social-share.png"],
    },
    alternates: {
        canonical: "/privacy-policy",
    },
};

interface PrivacyPolicyLayoutProps {
    children: React.ReactNode;
}

export default function PrivacyPolicyLayout({ children }: PrivacyPolicyLayoutProps) {
    return children;
}
