import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  server: {
    host: '0.0.0.0', // Allow binding to all interfaces for local Wi-Fi access
    port: 3000
  },
};

export default nextConfig;
