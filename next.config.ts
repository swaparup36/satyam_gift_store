import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'satyam-gift-store.s3.ap-south-1.amazonaws.com',
      }
    ]
  }
};

export default nextConfig;
