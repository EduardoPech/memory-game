/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/memory-game",
  images: {
    remotePatterns: [
      {
        hostname: "cloud.modyocdn.com",
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
