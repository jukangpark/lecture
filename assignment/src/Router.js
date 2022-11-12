import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/Header";
// import Delete from "./page/Delete";
import Detail from "./page/Detail";
import Home from "./page/Home";
import Post from "./page/Post";
import Update from "./page/Update";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <footer>푸터 영역</footer>
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<Detail />} />
          <Route path="/post/:id/update" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
