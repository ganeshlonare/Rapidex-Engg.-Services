import GlobalProvider from "@/components/Application/GlobalProvider";
import "./globals.css";
import { Assistant } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import { siteConfig, generateOrganizationSchema, generateWebsiteSchema } from '../lib/seo';
import StructuredData, { MultipleStructuredData } from '@/components/SEO/StructuredData';
import { GoogleAnalytics, FacebookPixel, GoogleTagManager } from '@/components/SEO/Analytics';
import type { Metadata } from 'next';

const assistantFont = Assistant({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rapidex.tech'),
  title: {
    default: siteConfig.name,
    template: '%s | Rapidex Engineering Services'
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author, url: 'https://www.rapidex.tech' }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/assets/images/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/assets/images/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/assets/images/icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        type: 'image/png'
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.social.twitter,
    creator: siteConfig.social.twitter,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{
      url: `${siteConfig.url}${siteConfig.ogImage}`,
      alt: siteConfig.name,
    }],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'en-US': siteConfig.url,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_SITE_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
  category: 'technology',
  classification: 'Industrial Components & Robotics Parts E-commerce',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f97316' },
    { media: '(prefers-color-scheme: dark)', color: '#ea580c' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  // Additional meta tags for better social sharing and SEO
  other: {
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'twitter:image:alt': siteConfig.name,
    'og:site_name': siteConfig.name,
    'application-name': siteConfig.name,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Rapidex',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#f97316',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#f97316',
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
