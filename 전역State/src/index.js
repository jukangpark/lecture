import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
// import store from "./redux/store";
// import store from "./reduxThunk/store";
// import store from "./reduxThunk프라미스/store";
import store from "./reduxToolkit/store";

// import { Provider } from "react"; react가 가지구 있는 Provider를 사용하면 안댐!
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <RecoilRoot>
    <Provider store={store}>
      <App />
    </Provider>
  </RecoilRoot>
);
