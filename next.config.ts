import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.superherodb.com",
        pathname: "/pictures2/portraits/**",
      },
    ],
  },
};

export default nextConfig;
