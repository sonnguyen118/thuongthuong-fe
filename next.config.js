// const withPlugins = require("next-compose-plugins");
// const withPWA = require("next-pwa");
// const runtimeCaching = require("next-pwa/cache");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: true,
//   openAnalyzer: false,
// });

// module.exports = withPlugins(
//   [
//     [withBundleAnalyzer],
//     [
//       withPWA,
//       {
//         pwa: {
//           dest: "public",
//           disable: process.env.NODE_ENV === "development",
//           runtimeCaching,
//         },
//         async headers() {
//           return [
//             {
//               source: "/images/(.*)",
//               headers: [
//                 {
//                   key: "Cache-Control",
//                   value:
//                     "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000",
//                 },
//               ],
//             },
//             {
//               source: "/icons/(.*)",
//               headers: [
//                 {
//                   key: "Cache-Control",
//                   value:
//                     "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000",
//                 },
//               ],
//             },
//             {
//               source: "/_next/image(.*)",
//               headers: [
//                 {
//                   key: "Cache-Control",
//                   value:
//                     "public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000",
//                 },
//               ],
//             },
//             {
//               source: "/(.*)",
//               headers: [
//                 {
//                   key: "Content-Security-Policy",
//                   value:
//                     "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://cdn.segment.com https://cdn.polyfill.io https://unpkg.com; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://cdn.segment.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdn.segment.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self';",
//                 },
//               ],
//             },
//           ];
//         },
//       },
//     ],
//   ],
//   {
//     images: {
//       domains: [
//         "https://api.thuongthuonghandmade.vn",
//         "https://api.thuongthuonghandmade.vn/",
//       ],
//       unoptimized: true,
//     },
//   }
// );

// /**
//  * @type {import('next').NextConfig}
//  */
const nextConfig = {
  images: {
    domains: ["https://www.kymviet.com.vn"],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/socket.io/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:5000", // Địa chỉ Nest.js server
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
