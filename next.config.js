const path = require("path");
const withImage = require("next-images");

const nextConfig = {
  headers: () => {
    const defaultArr = ["'self'"];
    const fontArr = ["'self'", "fonts.gstatic.com"];
    const styleArr = ["'self'", "'unsafe-inline'", "fonts.googleapis.com"];
    const scriptArr = ["'self'", "'unsafe-eval'"];
    const connectArr = ["'self'", "localhost:8000", "ws://localhost:8000"];
    const imgArr = ["'self'"];
    const frameArr = ["'self'"];
    const frameAncestorsArr = ["'self'"];
    const mediaArr = ["'self'"];
    const objectArr = ["'self'"];

    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              `default-src ${defaultArr.join(" ")};` +
              `font-src ${fontArr.join(" ")};` +
              `style-src ${styleArr.join(" ")};` +
              `script-src ${scriptArr.join(" ")};` +
              `connect-src ${connectArr.join(" ")};` +
              `img-src ${imgArr.join(" ")};` +
              `frame-src ${frameArr.join(" ")};` +
              `frame-ancestors ${frameAncestorsArr.join(" ")};` +
              `media-src ${mediaArr.join(" ")};` +
              `object-src ${objectArr.join(" ")};`,
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },

          {
            key: "X-Frame-Options",
            value: "sameorigin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "Access-Control-Allow-Headers", value: "market, request-id" },
        ],
      },
    ];
  },
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
