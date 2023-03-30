const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/spring",
    createProxyMiddleware({
      target: "http://localhost:3324",
      changeOrigin: true,
    })
  );
};
