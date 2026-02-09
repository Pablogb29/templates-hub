import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/demos/hair-salon",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/demos/hair-salon",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
