import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import ReduxTest from "./pages/ReduxTest";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redux" element={<ReduxTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
