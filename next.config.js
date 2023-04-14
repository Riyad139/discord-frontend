/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: () => {
    return [
      {
        source: "/base/:slug*",
        destination: "https://discord-server-ecru.vercel.app/api/:slug*",
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
