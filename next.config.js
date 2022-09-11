/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['strapi.ledgerpay.io', 'pbs.twimg.com', 'dynamic-assets.coinbase.com'],
  },
}

module.exports = nextConfig;
