/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.vidcarry.com",
      },
      {
        protocol: "https",
        hostname: "vidcarry.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/assets/:path*",
        destination: "https://www.vidcarry.com/assets/:path*",
      },
    ];
  },
};

export default nextConfig;
