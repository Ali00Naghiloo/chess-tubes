/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://api.chesstubes.com',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
