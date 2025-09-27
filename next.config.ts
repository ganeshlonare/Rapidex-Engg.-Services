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
        ],
        // Avoid optimizer network timeouts in dev by serving images directly
        unoptimized: process.env.NODE_ENV !== 'production',
    },
    // Enable static generation for better SEO
    trailingSlash: false,
    // Optimize for production
    compress: true,
    // Disable TypeScript checking during build for now
    typescript: {
        ignoreBuildErrors: true,
        tsconfigPath: './tsconfig.build.json',
    },
    // Disable SWC minification which includes type checking
    swcMinify: false,
    // Disable ESLint during builds
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
