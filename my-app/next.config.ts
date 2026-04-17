import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow camera access through Cloudflare / proxies
          { key: "Permissions-Policy", value: "camera=*" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "png.pngtree.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
  },
  serverExternalPackages: ["googleapis"],
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
