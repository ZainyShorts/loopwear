import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['cdn.prod.website-files.com' , 'lh3.googleusercontent.com','img.freepik.com','images.pexels.com'],
  },
};

export default nextConfig;
