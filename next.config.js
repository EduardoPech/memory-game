/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cloud.modyocdn.com",
      },
    ],
  },
};

module.exports = nextConfig;
