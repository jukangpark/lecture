import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import counter from "./reducer";

// npm i redux-thunk
// npm i redux-logger
// npm i redux-devtools-extension
// logger 을 사용하는 경우 logger 가 맨 마지막에 와야함.

const store = createStore(
  counter,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;
