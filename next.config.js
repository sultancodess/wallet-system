/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove experimental.appDir as it's now stable in Next.js 14
  // Environment variables are automatically available in Next.js 14
  
  // Optional: Add other configurations
  poweredByHeader: false,
  compress: true,
  
  // Handle build-time environment variables
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig