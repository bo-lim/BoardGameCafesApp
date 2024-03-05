/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jigsawexplorer.com",
        port: "",
        pathname: "/puzzles/subjects/**",
      },
    ],
  },
};

export default nextConfig;
