/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['localhost'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react'],
    },
}

module.exports = nextConfig
