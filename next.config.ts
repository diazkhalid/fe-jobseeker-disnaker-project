import type { NextConfig } from "next";

const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDevelopment,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.antaranews.com",
      },
    ],
  },
};

export default nextConfig;
