/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "avm-ayurvedic.s3.eu-north-1.amazonaws.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "plus.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "media.istockphoto.com",
            port: "",
            pathname: "/**",
         },
      ],
   },
};

export default nextConfig;
