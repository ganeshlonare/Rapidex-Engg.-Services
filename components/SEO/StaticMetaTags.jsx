import Head from 'next/head'

export default function StaticMetaTags({ 
  title = "Rapidex Engineering Services - Premium Industrial Components",
  description = "Premium industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs and more. Quality guaranteed with fast shipping and expert support.",
  image = "https://www.rapidex.tech/assets/images/rapidex-social-share.png",
  url = "https://www.rapidex.tech",
  type = "website"
}) {
  const fullTitle = title.includes('Rapidex') ? title : `${title} | Rapidex Engineering Services`
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="industrial components, robotics parts, automation solutions, nut bolts, fasteners, bearings, sensors, PLCs, e-commerce, online shopping" />
      <meta name="author" content="Rapidex Engineering Services" />
      <meta name="robots" content="index,follow" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Rapidex Engineering Services" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rapidextech" />
      <meta name="twitter:creator" content="@rapidextech" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />
      
      {/* Additional Meta Tags */}
      <meta name="application-name" content="Rapidex Engineering Services" />
      <meta name="theme-color" content="#ea580c" />
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" href="/assets/images/icon.png" type="image/png" />
      <link rel="shortcut icon" href="/assets/images/icon.png" type="image/png" />
      <link rel="apple-touch-icon" href="/assets/images/icon.png" />
    </Head>
  )
}
