import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import Home from "./Home";
import Home2 from "./Home2";

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <Home />
      <Home2 />
    </Provider>
  );
};

export default App;
