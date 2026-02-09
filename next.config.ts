import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Demo templates run as separate Next.js apps on their own ports.
   * The Hub serves a wrapper page at /demos/[slug] that loads the
   * template via iframe. No rewrites needed — the iframe points
   * directly to the template server.
   *
   * For production, deploy each template to its own domain and
   * set NEXT_PUBLIC_DEMO_*_URL environment variables.
   */
};

export default nextConfig;
