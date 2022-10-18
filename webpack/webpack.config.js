// webpack.config.js  로 webpack 설정해서 build 하기
// webpack 이란? -> JavaScript 모듈 번들러
// JavaScript 파일을 포함한 에셋을 컴파일, 번들링 하는데 사용됩니다.

// 모듈은 무엇인가? -> module 은 재사용이 가능한 코드 조각이다.
// 아주 쉽게 말하면 .js 파일 이다.
// 모듈은 자신만의 파일 스코프(모듈 스코프)를 가지고, export import 할 수 있다.
// 초기 js 는 크기가 작고 기능도 단순해서, '모듈'에 관한 표준 문법이 필요하지 않았는데,
// 코드를 모듈 단위로 구성해주는 방법 등 다양한 라이브러리를 만들었다. "AMD", "CommonJS", "UMD" 와 같은 모듈 시스템이 그 예이다.
// 모듈시스템에 대한 니즈가 커지면서 2015 년도에 표준 문법으로 등재되었다.
// 이제는 주요 브라우저와 Node.js 가 '모듈 시스템'을 지원한다.
// 브라우저 환경에서는 '모듈'을 단독으로 사용하기 보다, 번들링해서 배포서버에 올리는 방식을 주요 사용한다.

// 일반 스크립트와 구별되는 '모듈'의 특징
/* 
    1. 모듈은 항상 defer 속성을 붙인 것처럼 지연 실행된다. (굳이 body 끝에 적지 않아도 된다.)
    2. 모듈은 strict mode 로 실행된다.
    3. 모듈은 자신만의 스코프를 가진다 (파일 스코프)
    4. 모듈은 단 한번만 평가(실행)되고 필요한 곳에서 공유된다.
    5. 모듈 최상위 레벨 this 는 undefined 이다.
    6. import.meta 객체로 정보를 얻을 수 있다. (e.g. import.meta.url)
*/

// '번들러'란 무엇인가?
// js, css, 이미지 등의 파일을 묶어주는 작업을 '번들링(Bundling)' 이라고 하고, 작업의 결과물은 '번들(Bundle)' 이라고 한다.
// 웹팩 자체는 묶어주는 역할을 하기 때문에 '번들러(Bundler)' 라고 한다.
// 번들링 과정이 끝나면 기존 스크립트에서 import/export 가 사라지기 때문에 type="module"이 필요 없어진다.
// 따라서 번들링 과정을 거친 스크립트는 일반 스크립트 처럼 취급한다.

// 아니 그러면 도대체 왭팩은 왜 사용해요?
/*
    1. 웹팩은 여러개의 파일을 하나로 번들링 하기 때문에 HTTP 요청 횟수를 줄일 수 있다. (http 요청 횟수 감소) -> 빠른 서비스
    2. 또한, 자바스크립트 외의 리소스 포맷의 모듈도 사용할 수 있게 해준다. CSS 든, 이미지든 사용하려는 곳에 해당 리소스를 import 해주기만 하면 웹팩이 알아서 빌드해줌.
    3. 웹팩이 알아서 자동화 해주는 덕분에, 코드를 수정했을 때, 다시 빌드하고 새로고침하지 않아도, 바로바로 빌드 결과를 확인할 수 있다.
    4. 코드 스플리팅으로 원하는 Require.js 와 같은 라이브러리 없이도 통째로 로딩하지 않고, 필요한 순간에 원하는 모듈을 불러올 수 있다고 한다. (Dynamic Loading, Lazy Loading)
*/

// 명령어 환경 CLI 또는 Webpack 구성 파일을 통해 Webpack 을 사용할 수 있습니다.
// Webpack 은 자바스크립트 모듈 번들러로 JS 모듈 번들링에 사용되는 npm 모듈입니다.
// 애플리케이션 모듈 종속성을 해결해 웹 브라우저에서 이해할 수 있는 방식으로 모듈을 연결하고, 컴파일, 번들링 -> 빌드 합니다.
// 다른 모듈 번들러를 사용해도 되나요? -> 네, React 애플리케이션을 작성하기 위해, 모듈 번들러(Parcel 등) 을 사용하거나, 번들링 없이 구성할 수 있습니다.

// 기본적으로 webpack.config.js 파일을 사용할 필요가 없습니다.
// 보통 프로젝트가 이 기능을 사용하려면 확장해야합니다.
// 루트 폴더에 webpack.config.js 파일을 생성하면 webpack이 '자동'으로 이 파일을 '사용'합니다.
// 특정 상황에 따라 다른 설정 파일을 사용하려면, 커맨드라인에서 --config 플래그를 사용하여 이를 변경할 수 있습니다.
// webpack-cli init 명령을 사용하게 되면, 프로젝트 요구사항에 맞춘 webpack 설정 파일을 빠르게 생성할 수 있습니다.

// 웹팩의 4가지 핵심 개념 (Core Concepts)
/* 
1. Entry - config파일에서 entry 속성을 설정해서 웹팩이 어떤 모듈로부터 시작해서,  디펜던시 그래프를 그려나갈지 명시해줄 수 있다. 'entry' 속성의 기본값은 './src/index.js'이지만 다른 Entry Point를 지정할 수도 있다. (여러 개도 지정 가능)
2. Output - output 은 웹팩이 번들을 꾸리고 나서 결과물을 어디로 내보낼지 지정하는 속성이다. 기본값으로 메인 결과물인 main.js 파일은 ./dist/main.js에, 그 외 파일은 ./dist 폴더에 내보내 진다
3. Loader - 이제까지 자바스크립트 외의 리소스도 번들링할 수 있다고 했지만, 사실 웹팩은 기본적으로 JavaScript와 JSON 파일만 이해할 수 있다. 이 때 필요한 것이 Loader이다. 사용하려는 포맷에 대응하는 Loader를 설정해주면 다른 포맷의 리소스도 디펜던시 그래프에 추가할 수있게 된다. 
4. Plugin - 바닐라 자바스크립트 프로젝트에서 꼭 필요한 두 가지 Plugin만 설정해보자. 
        html-webpack-plugin을 사용하면 dist의 main.js를 스크립트 파일로 포함하는 HTML 문서를 dist 디렉토리 내에 자동으로 생성해준다. template에 원본으로 사용할 HTML문서 경로를 넣어주면 된다. 이 플러그인을 사용하지 않고 빌드하면 dist 디렉토리에 .html 파일이 생성되지 않고, 따라서 dist 디렉토리 내의 빌드 결과물 만으로는 렌더할 수 없다.  
        mini-css-extract-plugin를 사용하면 빌드 결과 JS파일에서 스타일시트를 분리해서 CSS 파일을 따로 만들어준다. 크기가 큰 하나의 파일을 받는 것보다 작은 여러 개의 파일을 다운로드 하는 것이 성능상 유리하기 때문에, 배포 시에는 분리하는 것이 좋다. 
*/

// 웹팩 dev-server 설정
// 코드를 수정했을 때 다시 빌드하고, 새로고침 하지 않아도, 바로바로 빌드 결과를 확인할 수 있는 dev-server 를 설정해보자.
// npm i -D webpack-dev-server

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

// HtmlWebpackPlugin: HTML 파일에 번들링 된 자바스크립트 파일을 삽입해주고, 이 플러그인으로 빌드하면 HTML 파일로 아웃풋 만들어줌.
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// webpack-cli 를 설치하게 되면, 커맨드 라인에서 거의 모든 설정 옵션을 조정할 수 있다.
// npx webpack

// 일반적으로 module.exports 는 설정 객체를 가리킵니다.
module.exports = (env, arg) => {
  console.log(arg); // scripts 에서 webpack 을 실행시킬 때 주게되는 mode 가 arg 객체의 프로퍼티(mode)로 들어옴!
  console.log(arg.mode); // production or development

  const prod = arg.mode === "production";

  // module.exports 에서 어떤 객체를 리턴하게됨.
  return {
    mode: prod ? "production" : "development",
    devtool: prod ? "hidden-source-map" : "eval",
    entry: "./src/index.js",
    output: {
      //output.path 는 '절대경로'로 출처 디렉토리를 설정하는 것임.
      path: path.join(__dirname, "/dist"),
      filename: "[name].[contenthash].js",
      // templateString 을 주게 되면 엔트리 이름을 그대로 사용하게 됩니다.
      // contenthash 도 사용할 수 있습니다.
    },
    devServer: {
      port: 3000,
      hot: true,
    },
    resolve: {
      // 이러한 확장자를 순서대로 해석합니다.
      // 여러 파일에서 이름이 동일하지만 다른 확장자를 가진 경우,
      // webpack은 배열의 앞에서부터 파일을 해석하고 남은 것은 해석하지 않습니다.
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      // module 이라는 옵션은 프로젝트 내에서 "다른 유형의 모듈"을 처리하는 방법을 결정합니다.
      // 왜냐하면 webpack 은 기본적으로 JavaScript와 JSON 파일만 이해할 수 있기 때문입니다.
      rules: [{ test: /\.jsx?$/, use: ["babel-loader"] }],
      // module.rules 는 모듈이 생성될 때, 요청과 일치하는 Rule 의 배열입니다.
      // 로더를 모듈에 적용시키거나 파서를 수정할 수 있습니다.
    },
  };
};

// CSS 스타일 패키지 설치
