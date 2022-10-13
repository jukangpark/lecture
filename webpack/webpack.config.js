// webpack.config.js  로 webpack 설정해서 build 하기
// webpack 이란? -> JavaScript 모듈 번들러
// JavaScript 파일을 포함한 에셋을 컴파일, 번들링 하는데 사용됩니다.

// 명령어 환경 CLI 또는 Webpack 구성 파일을 통해 Webpack 을 사용할 수 있습니다.
// Webpack 은 자바스크립트 모듈 번들러로 JS 모듈 번들링에 사용되는 npm 모듈입니다.
// 애플리케이션 모듈 종속성을 해결해 웹 브라우저에서 이해할 수 있는 방식으로 모듈을 연결하고, 컴파일, 번들링 -> 빌드 합니다.
// 다른 모듈 번들러를 사용해도 되나요? -> 네, React 애플리케이션을 작성하기 위해, 모듈 번들러(Parcel 등) 을 사용하거나, 번들링 없이 구성할 수 있습니다.

// 우선 React 앱이 렌더링이 될 HTML 페이지를 public 폴더에 만들어줍니다.
// npm init

// webpack, webpack-cli 패키지를 설치한 후, webpack.config.js 파일을 만들어 구성합니다.
// npm i webpack webpack-cli -D

// react, react-dom 패키지를 프로젝트에 설치합니다.
// npm i react react-dom

// 엔트리 파일 생성
// 엔트리 파일을 만든 후, React, ReactDOM 모듈을 불러와 간단한 React 코드를 작성합니다.

// Babel, babel-loader 설치합니다.
// npm i babel-loader @babel/core -D

// babel-loader 를 구성하기 위해
// resolve, module 구성을 추가한 후, Babel 컴파일러 로더(loader) 를 구성합니다.

// Babel 프리셋
// @babel/preset-env, @babel/preset-react 프리셋을 설치한 후, babel.config.js 파일을 만들어 구성합니다.

// babel.config.js 로 넘어가서 설명을 따라가세요!

const path = require("path");
const distDir = path.resolve(__dirname, "dist");

const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);

// ...

module.exports = (_env, argv) => {
  const isProd = argv.mode === "production";
  const isDev = !isProd;
  // ...
  return {
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: distDir,
      filename: "assets/js/[name]",
    },
    // ...
    resolve: {
      extensions: ["js", "jsx", "json"],
      alias: {
        "@components": getAbsolutePath("src/components/"),
        "@contexts": getAbsolutePath("src/contexts/"),
        "@hooks": getAbsolutePath("src/hooks/"),
        "@pages": getAbsolutePath("src/pages/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProd ? "production" : "development",
              },
            },
          ],
        },
      ],
    },
  };
};

// CSS 스타일 패키지 설치
