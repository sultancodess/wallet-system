/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,
  },
}

module.exports = nextConfig