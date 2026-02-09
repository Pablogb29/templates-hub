import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/demos/restaurant",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/demos/restaurant",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
