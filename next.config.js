/** @type {import('next').NextConfig} */
const withPWA = require("@ducanh2912/next-pwa").default({
  pwa: {
    dest: "public",
    register: true,
  },
});
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = () => {
  const plugins = [withPWA, withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), {
    transpilePackages: [
      "cllk",
      "@llampukaq/realm",
      "@llampukaq/realm-google-provider",
      "@llampukaq/realm-organizations",
      "@llampukaq/builder",
      "@llampukaq/icons",
      "@llampukaq/realm-email-provider",
    ],

    env: {
      // Export envs to browser side
      version: process.env.VERSION,
      name: process.env.NAME,
      enviroment: process.env.ENVIROMENT,
      paypal: process.env.PAYPAL,
      image: process.env.IMAGEOPTIMIZATION,
      realm: process.env.REALM,
      google: process.env.GOOGLE,
      key: process.env.KEY,
      translate: process.env.TRANSLATE,
    },
    output: "export",
    swcMinify: true,
    reactStrictMode: false,
    images: {
      unoptimized: true,
    },

    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  });
};
