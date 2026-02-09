import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/demos/dental-clinic",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/demos/dental-clinic",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
