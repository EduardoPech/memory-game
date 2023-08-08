/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.BASE_PATH || "",
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
