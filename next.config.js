/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: [
      "assets.nintendo.com",
      "nintendo.com",
      "firebasestorage.googleapis.com",
      "cdn.pixabay.com",
      "eingleses.com",
      "i.pravatar.cc",
      "thumbs.dreamstime.com",
    ],
  },
};

module.exports = nextConfig;
