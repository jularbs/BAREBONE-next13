const path = require("path");
const withImage = require("next-images");
// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
// const withTM = require("next-transpile-modules")(["@fullcalendar/core"]);

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
      test: /\.(eot|woff|woff2)$/,
      use: {
        loader: "url-loader",
      },
    });
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
};

module.exports = withImage(nextConfig);
