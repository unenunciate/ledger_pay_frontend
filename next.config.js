/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['strapi.ledgerpay.io', 'pbs.twimg.com', 'logos.covalenthq.com', 'dynamic-assets.coinbase.com'],
  },
  experimental: { images: { allowFutureImage: true } }
}

module.exports = nextConfig;
