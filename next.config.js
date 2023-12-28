/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-labels */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
// Enable this code below for Server Side Rendering/Translation (SSR)
// const { i18n } = require('./next-i18next.config')
const withImages = require("next-images");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

module.exports = withImages({
  // Enable this code below for Server Side Rendering/Translation (SSR)
  //  i18n,
  trailingSlash: true,
  images: {
    disableStaticImages: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  publicRuntimeConfig: {
    localeSubpaths:
      typeof process.env.LOCALE_SUBPATHS === "string"
        ? process.env.LOCALE_SUBPATHS
        : "none",
  },
  // webpack: (config, options) => {
  //   cssModules: true;
  //   config.plugins
  //     .push
  //     //      new ESLintPlugin({
  //     //        exclude: ['node_modules']
  //     //      })
  //     ();
  //   config.node = {};

  //   return config;
  // },
  webpack: (config, options) => {
    cssModules: true;
    // config.plugins
    //   .push
    //   //      new ESLintPlugin({
    //   //        exclude: ['node_modules']
    //   //      })
    //   ();
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
});
