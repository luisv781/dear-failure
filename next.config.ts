import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/hackaithon-failing-upward',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
