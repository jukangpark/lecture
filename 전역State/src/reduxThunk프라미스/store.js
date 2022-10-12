import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;
