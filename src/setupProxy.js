const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    // 遇到 /api1 就会转发给 localhost:5000
    createProxyMiddleware("/api", {
      // 配置转发目标地址(能返回数据的服务器地址)
      target: "http://localhost:5000",
      //控制服务器接收到的请求头中host字段的值
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
