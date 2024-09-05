// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // You can change this path based on your API requests
    createProxyMiddleware({
      target: 'https://api.genius.com',
      changeOrigin: true,
    })
  );
};
