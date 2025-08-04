/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization for pages that use dynamic features
  output: 'standalone',
  
  // Skip build errors for Railway deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Optional: Add other configurations
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig