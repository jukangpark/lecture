import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ContextApiTest from "./pages/contextApi/ContextApiTest";
import ContextApiTest2 from "./pages/contextApi/ContextApiTest2";
import ContextApiTest3 from "./pages/contextApi/ContextApiTest3";
import ReducerTest from "./pages/ReducerTest";
import Redux1 from "./pages/redux/Redux1";
import ReduxAsyncTest from "./pages/ReduxAsyncTest";
import ReduxThunkTest from "./pages/reduxThunk/ReduxThunkTest";
import ReduxSaga from "./pages/reduxSaga/ReduxSaga";
import ReudxThunkPromise from "./pages/reduxThunkPromise/ReduxThunkPromise";
import ReduxToolkitTest from "./pages/reduxToolkit/ReduxToolkitTest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redux" element={<Redux1 />} />
        <Route path="/contextapi" element={<ContextApiTest />} />
        <Route path="/contextapi2" element={<ContextApiTest2 />} />
        <Route path="/contextapi3" element={<ContextApiTest3 />} />
        <Route path="/reducertest" element={<ReducerTest />} />
        <Route path="/reduxasynctest" element={<ReduxAsyncTest />} />
        <Route path="/reduxthunktest" element={<ReduxThunkTest />} />
        <Route path="/reduxthunkpromise" element={<ReudxThunkPromise />} />
        <Route path="/reduxsaga" element={<ReduxSaga />} />
        <Route path="/reduxtoolkit" element={<ReduxToolkitTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
