/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization for pages that use dynamic features
  output: 'standalone',
  
  // Optional: Add other configurations
  poweredByHeader: false,
  compress: true,
}

module.exports = nextConfig