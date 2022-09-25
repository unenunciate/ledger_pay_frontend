/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: { images: { allowFutureImage: true } },
  distDir: 'build',
}

module.exports = nextConfig;
