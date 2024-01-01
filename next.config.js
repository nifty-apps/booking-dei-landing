// /* eslint-disable no-param-reassign */
// /* eslint-disable no-unused-labels */
// /* eslint-disable no-labels */
// /* eslint-disable no-restricted-syntax */
// /* eslint-disable no-unused-vars */
// // Enable this code below for Server Side Rendering/Translation (SSR)
// // const { i18n } = require('./next-i18next.config')
// const withImages = require("next-images");
// const ESLintPlugin = require("eslint-webpack-plugin");
// const webpack = require("webpack");

// module.exports = withImages({
//   // Enable this code below for Server Side Rendering/Translation (SSR)
//   //  i18n,
//   trailingSlash: true,
//   images: {
//     disableStaticImages: true,
//   },
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },
//   publicRuntimeConfig: {
//     localeSubpaths:
//       typeof process.env.LOCALE_SUBPATHS === "string"
//         ? process.env.LOCALE_SUBPATHS
//         : "none",
//   },

//   webpack: (config, options) => {
//     cssModules: true;

//     // webpack: (config, options) => {
//     //   cssModules: true;
//     //   config.plugins
//     //     .push
//     //     //      new ESLintPlugin({
//     //     //        exclude: ['node_modules']
//     //     //      })
//     //     ();
//     //   config.node = {};

//     //   return config;
//     // },

//     config.node = {};
//     config.resolve.fallback = { fs: false };
//     config.module.rules.push({
//       test: /\.js$/,
//       exclude:
//         /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
//       loader: "babel-loader",
//     });

//     config.plugins.push(
//       new webpack.ProvidePlugin({
//         "window.Quill": "quill",
//       })
//     );

//     return config;
//   },
// });

// module.exports = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value:
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//           },
//         ],
//       },
//     ];
//   },
// };

const withImages = require("next-images");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

module.exports = withImages({
  trailingSlash: true,
  images: {
    disableStaticImages: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === "string"
        ? process.env.LOCALE_SUBPATHS
        : "none",
  },
  webpack: (config, options) => {
    config.node = {};
    config.resolve.fallback = { fs: false };
    config.module.rules.push({
      test: /\.js$/,
      exclude:
        /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
      loader: "babel-loader",
    });

    config.plugins.push(
      new webpack.ProvidePlugin({
        "window.Quill": "quill",
      })
    );

    return config;
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blogs&media/:blogId",
        destination: "/blogs&media/:blogId",
        permanent: false,
      },
    ];
  },
});
