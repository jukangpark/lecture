const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/user",
    // localhost:9000/user
    createProxyMiddleware({
      target: "http://localhost:9000", // 서버의 포트를 여기에 작성해주면됨.
      changeOrigin: true, // cross Origin 가능하게.
    })
  );
};

// 이 미들웨어는 정상작동안함
