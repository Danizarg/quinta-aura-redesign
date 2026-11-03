import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /* Tailwind v4 runs through the Turbopack loader. Scoped to the single global
     entry stylesheet on purpose: applied to `*.css` it also swallows
     `*.module.css`, which strips their module semantics and leaves every
     `styles.x` lookup undefined. */
  turbopack: {
    rules: {
      "./src/app/globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    /* Ready for the studio's own photography: see src/content/plates.ts. */
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
