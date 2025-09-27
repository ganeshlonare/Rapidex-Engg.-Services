/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      // Add more allowed hosts if needed
      // { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
    ],
    // Avoid optimizer network timeouts in dev by serving images directly
    unoptimized: process.env.NODE_ENV !== 'production',
  },
}

module.exports = nextConfig
