import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.36",
    "192.168.1.37",
    "http://192.168.1.36:3000",
    "http://192.168.1.37:3000",
  ],
  experimental: {
    // 1. The renamed Middleware/Proxy limit (50MB)
    proxyClientMaxBodySize: 50 * 1024 * 1024, 
    
    // 2. The Server Action limit properly nested inside 'experimental'
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
};

export default nextConfig;