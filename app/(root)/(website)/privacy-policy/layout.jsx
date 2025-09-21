import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
    title: "Privacy Policy - Rapidex Data Protection & Privacy",
    description: "Read our privacy policy to understand how Rapidex collects, uses, and protects your personal information when shopping for industrial components.",
    keywords: ["privacy policy", "data protection", "privacy", "terms", "legal"],
    url: "/privacy-policy"
});

export default function PrivacyPolicyLayout({ children }) {
    return children;
}
