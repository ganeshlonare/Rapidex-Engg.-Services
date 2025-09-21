import { generateMetadata } from '@/lib/seo'

export const metadata = generateMetadata({
    title: "Terms and Conditions - Rapidex Service Terms",
    description: "Read our terms and conditions for using Rapidex services. Understand your rights and responsibilities when purchasing industrial components and robotics parts.",
    keywords: ["terms and conditions", "service terms", "legal", "terms of use"],
    url: "/terms-and-conditions"
});

export default function TermsAndConditionsLayout({ children }) {
    return children;
}
