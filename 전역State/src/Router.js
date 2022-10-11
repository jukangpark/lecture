import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ContextApiTest from "./pages/ContextApiTest";
import ContextApiTest2 from "./pages/ContextApiTest2";
import ContextApiTest3 from "./pages/ContextApiTest3";
import ReducerTest from "./pages/ReducerTest";
import ReduxTest from "./pages/ReduxTest";
import ReduxThunkTest from "./pages/ReduxThunkTest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redux" element={<ReduxTest />} />
        <Route path="/contextapi" element={<ContextApiTest />} />
        <Route path="/contextapi2" element={<ContextApiTest2 />} />
        <Route path="/contextapi3" element={<ContextApiTest3 />} />
        <Route path="/reducertest" element={<ReducerTest />} />
        <Route path="/reduxthunktest" element={<ReduxThunkTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
