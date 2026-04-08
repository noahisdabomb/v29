import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    remotePatterns: [new URL("https://videos.noahisdabomb.com/**")],
  },
};

export default nextConfig;
