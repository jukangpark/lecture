import { BrowserRouter, Routes, Route } from "react-router-dom";

// npm i react-router
// npm i react-router-dom

// 각 라이브러리가 어떤 역할을 하는지

// BrowserRouter, Routes, Route 는 어떤 역할을 하는지?
// 라우팅이란 무엇인가?

const Home = () => {
  return (
    <div>
      <h1>Home 페이지</h1>
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
