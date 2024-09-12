import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
   publicRuntimeConfig: {
      apiUrl: process.env.NEXT_PUBLIC_API_URL,
    },
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
            hostname: "avm-ayurvedic.s3.eu-north-1.amazonaws.com",
            port: "",
            pathname: "/**",
         },
      ],
   },
   // webpack(config) {
   //   // Enable verbose logging for debugging the PackFileCache strategy
   //   config.infrastructureLogging = {
   //     level: 'info', // Change to 'debug' for more detailed logs
   //     debug: /PackFileCache/,
   //   };

   //   // Example: Adjust cache settings to improve build performance
   //   config.cache = {
   //     type: 'filesystem', // Use filesystem caching to speed up builds
   //     cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'), // Customize the cache directory
   //     buildDependencies: {
   //       config: [__filename], // Cache will be invalidated if this file changes
   //     },
   //   };

   //   // Example: Optimize for faster builds in development mode
   //   if (config.mode === 'development') {
   //     config.optimization = {
   //       minimize: false, // Disable minimization in development for faster builds
   //       splitChunks: false, // Disable chunk splitting in development
   //     };
   //   }

   //   return config;
   // },

   // // Enable experimental features for future-proofing
   // experimental: {
   //   scrollRestoration: true, // Enables scroll restoration in the app
   // },

   // // Performance optimizations
   // productionBrowserSourceMaps: false, // Disable source maps in production
};

export default nextConfig;
