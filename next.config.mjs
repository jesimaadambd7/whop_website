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
  async redirects() {
    return [
      {
        source: "/ugc-ads-agency",
        destination: "/services/ugc-ads",
        permanent: true,
      },
      {
        source: "/video-editing-services",
        destination: "/services/video-editing",
        permanent: true,
      },
      {
        source: "/paid-social-ad-creatives",
        destination: "/services/paid-social",
        permanent: true,
      },
      {
        source: "/ecommerce-video-production",
        destination: "/services/model-shoots",
        permanent: true,
      },
    ];
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
