/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_URL ? 
    `/${process.env.NEXT_PUBLIC_BASE_URL}` : '',
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_BASE_URL ? 
    `/${process.env.NEXT_PUBLIC_BASE_URL}` : '',
  trailingSlash: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
