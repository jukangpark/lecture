import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Comment from "./pages/Comment";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
