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
      {
        protocol: "http",
        hostname: "43.201.31.216",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
