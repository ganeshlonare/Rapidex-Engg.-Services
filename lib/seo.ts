// SEO Configuration and Utilities
import { Metadata } from 'next'

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  keywords: string[];
  social: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "Rapidex Engineering Services - Premium Industrial Components",
  description: "Premium industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs and more. Quality guaranteed with fast shipping and expert support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rapidex.tech",
  ogImage: "/assets/images/rapidex-social-share.png",
  author: "Rapidex Engineering Services",
  keywords: [
    "industrial components",
    "robotics parts", 
    "automation solutions",
    "nut bolts",
    "fasteners",
    "bearings",
    "sensors",
    "PLCs",
    "e-commerce",
    "online shopping",
    "industrial equipment",
    "manufacturing parts",
    "technical components",
    "rapidex engineering"
  ],
  social: {
    twitter: "@rapidextech",
    facebook: "rapidexengineering",
    instagram: "rapidexengineering"
  }
};

// Generate meta tags for pages
interface GenerateMetadataParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false
}: GenerateMetadataParams): Metadata {
  const siteTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const siteDescription = description || siteConfig.description;
  const toAbsolute = (u) => {
    if (!u) return siteConfig.url;
    return u.startsWith('http://') || u.startsWith('https://') ? u : `${siteConfig.url}${u}`;
  };
  const siteImage = toAbsolute(image || siteConfig.ogImage);
  const siteUrl = url ? toAbsolute(url) : siteConfig.url;
  const allKeywords = [...siteConfig.keywords, ...keywords].join(", ");

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteTitle,
    description: siteDescription,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      type: type as "website",
      locale: "en_US",
      url: siteUrl,
      title: siteTitle,
      description: siteDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
          type: 'image/png'
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.social.twitter,
      creator: siteConfig.social.twitter,
      title: siteTitle,
      description: siteDescription,
      images: [{
        url: siteImage,
        alt: siteTitle,
      }],
    },
    alternates: {
      canonical: siteUrl,
    },
    // Additional meta tags for better social sharing
    other: {
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:type': 'image/png',
      'twitter:image:alt': siteTitle,
    }
  };
}

// Note: generateProductMetadata and generateCategoryMetadata functions removed
// Now using Next.js Metadata API directly in page components

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    alternateName: "Rapidex",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}#logo`,
      url: `${siteConfig.url}/assets/images/logo.png`,
      width: 300,
      height: 100,
      caption: siteConfig.name
    },
    image: `${siteConfig.url}/assets/images/rapidex-social-share.png`,
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
      `https://facebook.com/${siteConfig.social.facebook}`,
      `https://instagram.com/${siteConfig.social.instagram}`,
      `https://youtube.com/@rapidexelectronics`,
      `https://wa.me/917620302114`
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-7620302114",
        contactType: "Customer Service",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
        contactOption: "TollFree"
      },
      {
        "@type": "ContactPoint",
        email: "rapidex95@gmail.com",
        contactType: "Customer Support",
        availableLanguage: ["English", "Hindi"]
      }
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "B.30(A) Kopargaon Industrial Estate Ltd., Po Shingnapur Tal. Kopargaon",
      addressLocality: "Kopargaon",
      addressRegion: "Maharashtra",
      postalCode: "423603",
      addressCountry: "IN"
    },
    foundingDate: "2020",
    numberOfEmployees: "10-50",
    knowsAbout: [
      "Industrial Components",
      "Robotics Parts",
      "Automation Solutions",
      "Electronic Hardware",
      "Sensors",
      "PLCs",
      "Microcontrollers"
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Product",
        name: "Industrial Components & Robotics Parts",
        category: "Industrial Hardware"
      },
      areaServed: "IN",
      availableDeliveryMethod: "OnSitePickup"
    }
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    publisher: {
      "@id": `${siteConfig.url}#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "en-US",
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@id": `${siteConfig.url}#organization`
    }
  };
}

export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`
    }))
  };
}

export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteConfig.url}/product/${product.slug}#product`,
    name: product.name,
    description: product.description,
    image: product.images?.map((img: any) => img.url) || [],
    brand: {
      "@type": "Brand",
      name: product.brand?.name || "Rapidex"
    },
    category: product.category?.name,
    sku: product.sku,
    mpn: product.sku,
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.sellingPrice,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${siteConfig.url}#organization`
      }
    },
    manufacturer: {
      "@id": `${siteConfig.url}#organization`
    }
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/images/logo.png`,
    image: `${siteConfig.url}/assets/images/store-front.jpg`,
    telephone: "+1-234-567-8900",
    email: "info@rapidex.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Industrial Avenue",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0760",
      longitude: "72.8777"
    },
    openingHours: [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-14:00"
    ],
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
      `https://facebook.com/${siteConfig.social.facebook}`,
      `https://instagram.com/${siteConfig.social.instagram}`
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "UPI", "Net Banking"],
    currenciesAccepted: "INR"
  };
}

// Duplicate functions removed - using the enhanced versions above
