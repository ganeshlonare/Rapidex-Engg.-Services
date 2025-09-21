import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
                search: ''
            }
        ]
    },
    // Enable static generation for better SEO
    trailingSlash: false,
    // Optimize for production
    compress: true,
    // Disable TypeScript checking during build for now
    typescript: {
        ignoreBuildErrors: true,
    },
    // Disable ESLint during build for now
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Experimental features
    experimental: {
        // Removed optimizeCss to prevent 'critters' dependency error during build
        optimizePackageImports: ['lucide-react', '@mui/material', '@mui/icons-material'],
    },
    // Performance optimizations
    poweredByHeader: false,
    reactStrictMode: true,
    // Headers for better SEO and security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
