/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "agreeable-koala-997.convex.cloud",
        },
      ],
    },
  };

export default nextConfig;
