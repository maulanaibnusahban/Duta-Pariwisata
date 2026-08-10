import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Avatar Google
      },
      {
        protocol: "https",
        hostname: "dpi.visualian.id", // Foto kandidat dari backend storage
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/proxy/:path*",
  //       destination: "https://dpi.visualian.id/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
