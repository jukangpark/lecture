//엔트리 파일을 만든 후에, React, ReactDOM 모듈을 불러와서, 간단한 React 코드를 작성합니다.

import React from "react";
import { render } from "react-dom";
import App from "./App";

// DOM 노드
const rootNode = document.getElementById("root");

// Dom 노드에 React 요소 렌더링

render(<App />, document.getElementById("root"));
