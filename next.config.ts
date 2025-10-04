import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/dear-failure',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
