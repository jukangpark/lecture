// npm i @babel/preset-env @babel/preset-react -D
module.exports = {
  presets: [["@babel/preset-env", { module: false }], "@babel/preset-react"],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
  ],
  env: {
    production: {
      only: ["src"],
      plugins: [
        [
          "transform-react-remove-prop-types",
          { removeImport: true }, // import PropTypes from 'prop-types' 제거
        ],
        "@babel/plugin-transform-react-inline-elements",
        "@babel/plugin-transform-react-constant-elements",
      ],
    },
  },
};
// Babel 플러그인
/* 
    React 앱에서 "클래스필드" 문법을 사용하기 위한 플러그인, "동적 가져오기" 를 사용하기 위한 플러그인 등을 설치합니다.
    npm i @babel/plugin-transform-runtime \
      @babel/plugin-syntax-dynamic-import \
      @babel/plugin-proposal-class-properties -D
*/

// React 최적화 플러그인(배포)
/*
    React 앱 배포(production) 시 성능을 향상시키는 prop-types 제거, React.createElement 컴파일 결과 인라인 처리, 정적 React 요소를 상수로 출력하는 플러그인 등을 설치합니다.
    npm i babel-plugin-transform-react-remove-prop-types \
      @babel/plugin-transform-react-inline-elements \
      @babel/plugin-transform-react-constant-elements -D
*/

// 출처 :  https://yamoo9.gitbook.io/webpack/react/create-your-own-react-app/configure-babel
