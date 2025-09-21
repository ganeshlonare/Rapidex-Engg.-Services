// Additional SEO optimization functions and utilities

// Generate FAQ schema for better search visibility
export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Generate review schema for products
export function generateReviewSchema(reviews, product) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.name
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: reviews.averageRating,
      bestRating: "5"
    },
    author: {
      "@type": "Person",
      name: "Verified Customer"
    },
    reviewBody: reviews.latestReview?.comment || "Great product quality and service"
  };
}

// Generate offer schema for promotions
export function generateOfferSchema(offer) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offer.name,
    description: offer.description,
    price: offer.discountedPrice,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validFrom: offer.startDate,
    validThrough: offer.endDate,
    seller: {
      "@type": "Organization",
      name: "Rapidex E-Commerce"
    }
  };
}

// SEO-friendly URL slug generator
export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Meta description optimizer (keeps it under 160 characters)
export function optimizeMetaDescription(description, maxLength = 160) {
  if (description.length <= maxLength) return description;
  
  const truncated = description.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}

// Generate keyword-rich alt text for images
export function generateAltText(productName, category, imageType = 'main') {
  const types = {
    main: `${productName} - Premium ${category} | Rapidex`,
    gallery: `${productName} ${category} - Detailed View`,
    thumbnail: `${productName} - ${category} Thumbnail`
  };
  
  return types[imageType] || types.main;
}
