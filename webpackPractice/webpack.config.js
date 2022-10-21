const path = require("path");
// node.js 의 모듈 중 하나, node.js 는 경로를 맞추기 위해 Path 모듈을 제공한다.
// path 모듈은 파일과 directory 경로 작업을 위한 Utility 를 제공함.
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// npm i babel-loader @babel/core -D
// babel-loader 를 구성하기 위해
// @babel/preset-env, @babel/preset-react 프리셋을 설치한 후, babel.config.js 파일을 만들어 구성합니다.

module.exports = (env, arg) => {
  const isDevelopment = arg.mode === "development";

  return {
    // mode 옵션을 사용하면 webpack 에 내장된 최적화 기능을 사용할 수 있습니다.
    // config 에서 mode 옵션을 사용하던지,
    // 혹은 webpack --mode=development 를 통해 CLI 의 인수로 전달해줄 수 있습니다.
    //
    mode: isDevelopment ? "development" : "production",
    entry: {
      app: { import: "./src/index.js", dependOn: "react-vendors" },
      "react-vendors": ["react", "react-dom"],
    },
    output: {
      // __filename -> 현재 실행중인 파일 경로
      // __dirname -> 현재 실행중인 폴더 경로
      path: path.join(__dirname, "/dist"),
      filename: (pathData) => {
        if (isDevelopment) {
          return "[name].js";
        }
        const { name } = pathData.chunk;
        return name !== "app"
          ? "vendors/[name].js"
          : "[name].[contenthash:8].js";
      },
    },

    // Loaders -> webpack 은 기본적으로 'js', 'json' 만 이해하기 때문에,
    // 로더를 사용하면 webpack 이 다른 유형의 파일을 처리합니다.
    // 로더는 2가지 속성을 가집니다.
    // 1. 변환이 필요한 파일(들)을 식별하는 test
    // 2. 변환을 수행할 때 사용되는 로더를 가리키는 use

    module: {
      // 자바스크립트 모듈을 생성할 규칙을 지정.
      // node_module 을 제외한, .js 파일을 babel-loader 로 불러와 모듈을 생성

      rules: [
        // .js, .jsx 로 끝나는 babel 이 컴파일하게 할 모든 파일
        {
          test: /\.(js|jsx)$/,
          exclude: /node_module/,
          use: { loader: "babel-loader" },
        },
        {
          test: /\.(scss|css)$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        // npm i css-loader, sass-loader
        {
          test: /.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
        {
          test: /\.png$/i,
          type: "asset/resource",
        },
      ],
    },

    devServer: {
      port: 3000,
      compress: true,
      historyApiFallback: true,
      static: { directory: path.join(__dirname, "public") },
    },

    // 플러그인을 활용하여, 번들을 최적화 하거나, 에셋을 관리하고,
    // 또 환경변수 주입과 같은 광범위한 작업들을 수행할 수 있다.
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      // html-webpack-plugin 은 생성된 모든 번들을 자동으로 삽입하여,
      // 애플리케이션 용 HTML 파일을 생성합니다.
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: !isDevelopment
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
      }),
      new CleanWebpackPlugin(),
    ],
  };
};
