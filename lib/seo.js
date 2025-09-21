// SEO Configuration and Utilities
export const siteConfig = {
  name: "Rapidex E-Commerce",
  description: "Premium industrial components, robotics parts, and automation solutions. Shop quality products with fast shipping and expert support.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.rapidex.tech",
  ogImage: "/assets/images/rapidex-logo.png",
  author: "Rapidex Team",
  keywords: [
    "industrial components",
    "robotics parts", 
    "automation solutions",
    "e-commerce",
    "online shopping",
    "industrial equipment",
    "manufacturing parts",
    "technical components"
  ],
  social: {
    twitter: "@rapidex",
    facebook: "rapidex",
    instagram: "rapidex"
  }
};

// Generate meta tags for pages
export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  noIndex = false
}) {
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
    title: siteTitle,
    description: siteDescription,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.name,
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      type,
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
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [siteImage],
      creator: siteConfig.social.twitter,
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

// Generate product metadata
export function generateProductMetadata(product) {
  const title = product.name;
  const description = product.shortDescription || product.description?.substring(0, 160);
  const keywords = [
    product.name,
    product.category?.name,
    product.brand?.name,
    ...(product.tags || [])
  ].filter(Boolean);
  
  return generateMetadata({
    title,
    description,
    keywords,
    image: product.images?.[0]?.url,
    url: `/product/${product.slug}`,
    type: "website"
  });
}

// Generate category metadata
export function generateCategoryMetadata(category) {
  const title = `${category.name} Products`;
  const description = category.description || `Shop premium ${category.name.toLowerCase()} products at ${siteConfig.name}. Quality guaranteed with fast shipping.`;
  const keywords = [category.name, "products", "shop", "buy"];
  
  return generateMetadata({
    title,
    description,
    keywords,
    image: category.image,
    url: `/category/${category.slug}`,
  });
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/images/logo.png`,
    sameAs: [
      `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}`,
      `https://facebook.com/${siteConfig.social.facebook}`,
      `https://instagram.com/${siteConfig.social.instagram}`
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-234-567-8900",
      contactType: "Customer Service",
      availableLanguage: "English"
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

export function generateProductSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images?.map(img => img.url) || [],
    brand: {
      "@type": "Brand",
      name: product.brand?.name || siteConfig.name
    },
    category: product.category?.name,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: siteConfig.name
      }
    },
    aggregateRating: product.rating ? {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 0
    } : undefined
  };
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.url}`
    }))
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}
