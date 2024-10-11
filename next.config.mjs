/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "agreeable-koala-997.convex.cloud",
        },
        {
          protocol: "https",
          hostname: "static.vecteezy.com",
        },
      ],
    },
  };

export default nextConfig;
