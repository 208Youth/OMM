const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/spring',
    createProxyMiddleware({
      // target: "http://localhost:3324",
      target: process.env.SPRING_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/node',
    createProxyMiddleware({
      // target: 'http://localhost:4424',
      target: process.env.NODE_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/fast',
    createProxyMiddleware({
      // target: 'http://localhost:8000',
      target: process.env.FAST_API_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target: process.env.OMM_SPRINT_API_URL,
      changeOrigin: true,
    })
  );
};
