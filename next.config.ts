import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/keywords",
      permanent: true,
    },
  ],
};

export default nextConfig;
