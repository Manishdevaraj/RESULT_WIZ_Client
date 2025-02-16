import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
 
  eslint: {
    // Disable eslint during the build process
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
