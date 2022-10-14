import { BrowserRouter, Routes, Route } from "react-router-dom";

import Closure from "./pages/Closure";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/closure" element={<Closure />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
