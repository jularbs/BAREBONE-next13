const path = require("path");
const withImage = require("next-images");

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  env: {
    API: process.env.API,
    RECAPTCHA_SITEKEY: process.env.RECAPTCHA_SITEKEY,
    TINY_KEY: process.env.TINY_KEY,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2)$/,
      type: "asset",
    });
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
};

module.exports = withImage(nextConfig);
