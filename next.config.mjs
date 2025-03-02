/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "morar.com.br" },
      { hostname: "atsloanestable.com" },
      { hostname: "www.simplyrecipes.com" },
      { hostname: "assets.bonappetit.com" },
      { hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
