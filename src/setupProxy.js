// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/livro',
    createProxyMiddleware({
      target: 'http://54.167.117.206:8000',
      changeOrigin: true,
    })
  );
};
