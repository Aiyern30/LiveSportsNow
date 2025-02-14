/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
      {
        protocol: "https",
        hostname: "content.sportslogos.net", 
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/NBA",
        permanent: true, 
      },
    ];
  },
};

module.exports = nextConfig;
