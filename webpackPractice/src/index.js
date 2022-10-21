//엔트리 파일을 만든 후에, React, ReactDOM 모듈을 불러와서, 간단한 React 코드를 작성합니다.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

// React 요소

// DOM 노드
root.render(<App />);

// Dom 노드에 React 요소 렌더링
