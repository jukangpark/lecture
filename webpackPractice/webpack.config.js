const path = require("path");
// node.js 의 모듈 중 하나, node.js 는 경로를 맞추기 위해 Path 모듈을 제공한다.
// path 모듈은 파일과 directory 경로 작업을 위한 Utility 를 제공함.
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 기본적으로 이 플러그인은 성공적으로 다시 빌드 한 후,
// webpack 의 output.path 디렉토리에 있는 모든 파일과
// 사용하지 않는 모든 웹팩 자산을 제거합니다.
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// CssMinimizerWebpackPlugin 플러그인은 cssnano 를 사용해 CSS 를 최적화(압축)합니다.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// npm i babel-loader @babel/core -D
// babel-loader 를 구성하기 위해
// @babel/preset-env, @babel/preset-react 프리셋을 설치한 후, babel.config.js 파일을 만들어 구성합니다.

// 빌드 툴은 실제 사용되는 함수가 무엇인지 파악해,
// 그렇지 않은 함수는 최종 번들링 결과물에 포함하지 않습니다.
// 이 과정에서 불필요한 코드가 제거되기 때문에 빌드 결과물의 크기가 작아집니다.
// 이런 최적화 과정은 '가지치기(tree-shaking)'라고 불립니다.

module.exports = (env, arg) => {
  const isDevelopment = arg.mode === "development";

  return {
    // mode 옵션을 사용하면 webpack 에 내장된 최적화 기능을 사용할 수 있습니다.
    // config 에서 mode 옵션을 사용하던지,
    // 혹은 webpack --mode=development 를 통해 CLI 의 인수로 전달해줄 수 있습니다.
    mode: isDevelopment ? "development" : "production",
    // 웹팩을 실행하여 여러 모듈을 하나의 번들링 파일로 만들 때
    // 자바스크립트에서 에러가 발생하면 브라우저의 콘솔에는 번들링된
    // 하나의 파일 첫째줄에서 에러가 떴다고 알려주기 때문에
    // 어떤 모듈의 몇 번째 줄에서 에러가 떴는지 정확히 알기 쉽지 않다.
    // 쉽게 에러를 트래킹 하기 위해서 웹팩에서는 source.map 이라는 모듈을 사용한다.

    // eval-source-map,
    // 이 옵션은 모든 기능이 포함된 소스맵을 생성할 수 있어 고품질의 소스맵을 사용하는 개발모드에 권장된다.
    // 하지만 이 옵션은 초기 빌드가 비교적 가장 느리다는 단점이 있지만 재빌드 속도는 비교적 빠르다.
    // 또한 에러 코드가 표시될 때 브라우저 콘솔에서 원본코드의 구체적인 줄이 아닌 번들링 된 파일 기준의 줄번호를 알려주는 단점이 있다.

    // eval-cheap-source-map,
    // 이 옵션은 에러 코드가 표시될 때 브라우저 콘솔에서 원본코드의 구체적인 줄이 아닌 번들링 된
    // 파일 기준으로 줄번호를 알려준다. 소스맵은 줄번호만 매핑되며, 열 매핑은 되지 않는다.
    // 이 옵션은 다른 옵션에 비해 초기빌드가 비교적 빠르며 재빌드 속도는 비교적 제일 빠르다.

    // inline-source-map
    // 이 옵션은 DataUrl 로 소스맵이 추가되며 에러코드가 표시될 때 브라우저 콘솔에서,
    // 원본코드의 구체적인 줄번호도 알려준다.
    // 하지만 이 옵션은 초기 빌드 속도가 비교적 가장 느리며 재빌드 속도도 비교적 가장 느리다는 단점이 있다.

    // hidden-source-map
    // 이 옵션은 배포모드에 적절하며 번들링 파일에 참조 주석을 추가하지 않으며 에러코드가 표시될 때에도
    // 번들링된 파일의 줄번호를 알려주어 디버깅하는데 불편함이 있다.
    // 개인적으로 source map 을 추가하지 않은 것과 별반 차이가 없어, 배포모드 때 추가하지 않으며
    // source map 을 적용하지 않는다.

    // eval-cheap-module-source-map 은 개발 환경에서 이상적이다.
    // eval-cheap-source-map 과 유사하지만, 이 경우 더 나은 결과를 위해
    // 로더의 소스맵을 사용합니다. 그러나 로더의 소스맵은 라인 당 단일 매핑으로 단순화된다.

    // 공식 사이트에서는 eval-change-source-map 을 권장한다.

    // production 모드에서는 source map 을 설정하지 않거나, hidden-source-map 을 자주 사용한다.
    // https://webpack.js.org/configuration/devtool/
    devtool: isDevelopment
      ? "eval-cheap-module-source-map"
      : "hidden-source-map",
    entry: {
      // 기본적으로, 모든 엔트리 청크는 사용하는 모든 모듈을 저장합니다.
      // dependOn 옵션을 사용하면 한 엔트리 청크에서
      // 다른 엔트리 청크로 모듈을 공유할 수 있습니다.
      // 프로젝트에서 전역적으로 사용되는 라이브러리르들을 vendor 로 분리시킨다.
      // 예를 들어, react, react-dom, redux, react-redux, react-router-dom, styled-components 등의
      // 라이브러리를 넣으면 됨.
      // app 청크에는 react-vendors 에 있는 모듈이 포함되지 않습니다.
      // dependOn 옵션은 문자열 배열을 허용합니다.
      app: { import: "./src/index.js", dependOn: "react-vendors" },
      "react-vendors": ["react", "react-dom"],
    },
    output: {
      // __filename -> 현재 실행중인 파일 경로
      // __dirname -> 현재 실행중인 폴더 경로
      path: path.join(__dirname, "/dist"),
      filename: (pathData) => {
        // if (isDevelopment) {
        //   return "[name].js";
        // }
        // const { name } = pathData.chunk;
        // return name !== "app"
        //   ? "vendors/[name].js"
        //   : "[name].[contenthash:8].js";
      },

      // 코드 스플리팅 Code Splitting 이란?
      // 이 기능을 사용하여 코드를 다양한 번들로 분할하고,
      // 요청에 따라 로드하거나, 병렬로 로드할 수 있습니다.
      // 더 작은 번들로 만들고, 리소스 우선순위를 올바르게 제어하기 위해, 사용하며,
      // 잘 활용하면 로드 시간에 큰 영향을 끼칠 수 있습니다.
      /*
      일반적인 코드 스플리팅 3가지 방법
      1. Entry Points
      2. Prevent Duplication
      3. Dynamic Imports
      */
      // output.chunkFilename

      // string = "[id].js" function (pathData, assetInfo) => string
      // 이 옵션은 초기가 아닌 '청크 파일의 이름' 을 결정합니다.
      // 청크 파일 요청을 위해 런타임에서 파일 이름을 생성해야 합니다.
      // 이 때문에 [name] 및 [chunkhash] 와 같은 자리 표시자는 webpack 런타임을 사용하여,
      // 청크 ID에서 자리 표시자 값으로의 매핑을 출력 번들에 추가해야 합니다.
      // 이렇게하면 크기가 증가하고 청크의 자리 표시자 값이 변경 될 때 번들이 무효화 될 수 있습니다.
      // 기본적으로 [id].js가 사용되거나 output.filename에서 유추 된 값이 사용됩니다([name]이 [id]로 대체되거나 [id].가 추가).

      assetModuleFilename: "assets/[contenthash:8][ext][query]",
      // 웹 애플리케이션을 제작하면서, HTML, CSS, JS 와 더불어,
      // 아이콘, 사진, 비디오 등 다양한 Assets 을 추가하게 되는데,
      // asset modules 은 로더를 추가하지 않아도!!!
      // 이러한 asset 파일들을 사용할 수 있도록 도와주는 모듈이다.
      // asset/resource 모듈은 별도의 파일로 내보내고 URL을 추출한다.
      // 다시 말해서 빌드 후 asset 파일을 출력 디렉터리로 내보내고, 해당 경로를 번들에 추가한다.
      clean: true,
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
      compress: true, // 제공되는 모든 항목에 대해 gzip 압축을 활성화합니다.
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
