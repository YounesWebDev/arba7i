import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.36",
    "192.168.1.37",
    "http://192.168.1.36:3000",
    "http://192.168.1.37:3000",
  ],
};

export default nextConfig;
