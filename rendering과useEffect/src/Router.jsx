import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rendering from "./Rendering";
import UseEffectTest from "./pages/UseEffectTest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rendering" element={<Rendering />} />
        <Route path="/effect" element={<UseEffectTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
