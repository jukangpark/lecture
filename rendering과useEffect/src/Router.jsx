import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rendering from "./Rendering";
import Effect from "./pages/Effect";
import Effect1 from "./pages/Effect1";
import Effect2 from "./pages/Effect2";
import Effect3 from "./pages/Effect3";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rendering" element={<Rendering />} />
        <Route path="/effect" element={<Effect />} />
        <Route path="/effect1" element={<Effect1 />} />
        <Route path="/effect2" element={<Effect2 />} />
        <Route path="/effect3" element={<Effect3 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
