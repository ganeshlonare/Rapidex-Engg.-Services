import GlobalProvider from "@/components/Application/GlobalProvider";
import "./globals.css";
import { Assistant } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import { siteConfig, generateOrganizationSchema, generateWebsiteSchema } from '@/lib/seo';
import StructuredData, { MultipleStructuredData } from '@/components/SEO/StructuredData';
import { GoogleAnalytics, FacebookPixel, GoogleTagManager } from '@/components/SEO/Analytics';

const assistantFont = Assistant({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(", "),
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  icons: {
    icon: [
      { rel: 'icon', url: '/assets/images/icon.png', type: 'image/png' },
      { rel: 'shortcut icon', url: '/assets/images/icon.png', type: 'image/png' },
    ],
    apple: [{ url: '/assets/images/icon.png' }],
  },
  robots: "index,follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}${siteConfig.ogImage}`],
    creator: siteConfig.social.twitter,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${assistantFont.className} antialiased`}
      >
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
        <GoogleTagManager gtmId={process.env.GOOGLE_TAG_MANAGER_ID} />
        <FacebookPixel pixelId={process.env.FACEBOOK_PIXEL_ID} />
        <MultipleStructuredData dataArray={[organizationSchema, websiteSchema]} />
        <GlobalProvider>
          <ToastContainer />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
