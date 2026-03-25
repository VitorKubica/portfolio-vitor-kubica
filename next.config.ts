import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    qualities: [75],
    formats: ["image/webp"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
