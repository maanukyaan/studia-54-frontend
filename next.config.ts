import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects/architectural_design",
        permanent: false,
      },
      {
        source: "/projects",
        destination: "/projects/architectural_design",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "safe-animal-640fd60742.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
