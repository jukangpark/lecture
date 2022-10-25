import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rendering from "./Rendering";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/rendering" element={<Rendering />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
