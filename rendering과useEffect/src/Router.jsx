import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import UseEffectTest from "./pages/UseEffectTest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/effect" element={<UseEffectTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
