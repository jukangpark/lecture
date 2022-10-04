import { BrowserRouter, Routes, Route } from "react-router-dom";
import PromiseTest from "./PromiseTest";
import Prototype from "./PrototypeTest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PromiseTest />} />
        <Route path="/prototype" element={<Prototype />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
