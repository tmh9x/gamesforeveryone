/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["assets.nintendo.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
