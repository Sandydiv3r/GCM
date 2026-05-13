/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "cdn.haippa.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  experimental: { typedRoutes: true },
};

export default nextConfig;
