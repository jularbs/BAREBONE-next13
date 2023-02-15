const path = require("path");
const withImage = require("next-images");

const nextConfig = {
  headers: () => {
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
              "default-src 'self';" +
              "font-src 'self' data: fonts.gstatic.com;" +
              "style-src 'self' 'unsafe-inline' cdn.tiny.cloud fonts.googleapis.com github.hubspot.com www.google.com;" +
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' github.hubspot.com cdn.tiny.cloud www.google.com www.gstatic.com *.youtube.com github.hubspot.com;" +
              "connect-src 'self' localhost:8000 github.hubspot.com www.google.com;" +
              "img-src 'self' data: sp.tinymce.com localhost:8000;" +
              "frame-src 'self' www.google.com *.youtube.com;" +
              "frame-ancestors 'self';" +
              "media-src 'self';" +
              "object-src 'self';",
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
