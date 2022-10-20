import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";

// npm i react-router
// npm i react-router-dom

// 각 라이브러리가 어떤 역할을 하는지

// BrowserRouter, Routes, Route 는 어떤 역할을 하는지?
// 라우팅이란 무엇인가?

/*
    
    라우팅 : 웹앱에서 라우팅은 사용자가 요청한 URL 에 맞게 페이지를 보여주는 것을 의미
    라우팅 방법 :
    1. 리엑트 라우터 - 가장 오래되었고, 가장 많이 사용되고 있음
    2. Next.js - 리엑트의 프레임워크

    라우팅 관련 기능을 리액트 라이브러리에서 공식적으로 지원하는 것이 아니라 써드 파티로서 제공되기 때문에, 
    이 외에도 react-location, rakkas 등의 프로젝트들이 존재합니다.

    SPA 이란? -> 말 그대로 "하나의 페이지" -> index.html 에서
    리엑트 라우터를 사용하면 브라우저의 
    History API 를 사용하여, 브라우저의 주소창의 값만 변경하고,
    웹 개발자 도구에 들어가서
    window.history.next() 하면 다음 페이지로 이동됨.
    그에 맞는 페이지를 보여주게 됩니다.

    <a> 태그 대신 <Link /> 컴포넌트를 사용해야 하는 이유?
    a 태그를 클릭하여 페이지를 이동할 때는 브라우저가 페이지를 새로 불러오기 때문이다.
    Link 컴포넌트 역시 a 태그를 사용하긴 하지만, 페이지를 새로 불러오는 것을 막고,
    History API 를 통해 브라우저 주소의 경로만 바꾸는 기능이 내장되어 있습니다.

    ## URL 파라미터와 쿼리 스트링
    페이지 주소를 정의 할 때, 가끔은 유동적인 값을 사용해야 할 때가 있습니다.
    // 파라미터 = 매개변수 = 변수 = 유동적인 '값'
    
    - URL 파라미터 예시 : /profile/jukang
    - 쿼리스트링 예시 : /articles?**page=1&keyword=react

    URL 파라미터는 주소의 경로에 유동적인 값을 넣는 형태이고,
    URL 파라미터는 /profile/:username 과 같은 형태로 
    경로에 : 를 사용하여 설정합니다. 만약 URL 파라미터가 '여러개'인 경우에는
    /profile/:username/:filed 와 같은 형태로 사용할 수 있습니다.

    //------------------------------------------------------
    쿼리 스트링은 주소의 뒷 부분에 ? 문자열 이후에 key=value 로 값을 정의하며,
    & 로 구분을 하는 형태입니다

    주로 "URL 파라미터"는 ID 또는 이름을 사용하여 특정 데이터를 조회할 때, 사용하고
    "쿼리 스트링"은 키워드 검색, 페이지네이션, 정렬 방식 등 데이터 조회에 필요한 옵션을 
    전달할 때 사용합니다.


    ## 중첩된 라우팅


    ## <Outlet/> 사용해보기
 */

const Home = () => {
  return (
    <div>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/profiles">Profile</Link>
      </li>
      <h1>Home 페이지</h1>
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />}>
          <Route path=":username" element={<Profile />} />
        </Route>
        {/* <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<Article />} /> */}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
