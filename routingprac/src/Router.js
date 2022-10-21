import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import MyPage from "./pages/MyPage";
import Login from "./pages/auth/Login";

// react-router 를 설치하면 자동으로 react-router-dom 이 종속성으로 포함되어 설치됩니다.
// 코딩할 때는 react-router-dom 만 import 하여 사용해야합니다.
// 왜냐하면 -> react-router 에 정의된 메서드 들이 react-router-dom 을 통해서 import 되어있기 때문.

// npm i react-router
// npm i react-router-dom

// 각 라이브러리가 어떤 역할을 하는지

// BrowserRouter, Routes, Route 는 어떤 역할을 하는지?
// BrowserRouter vs HashRouter 차이

// BrowserRouter 는 <Link/> 태그를 통해 to 속성에 이동할 경로를 추가하여 이동시킨다.
// BrowserRouter는 HTML5의 History API(pushState, replaceState, popstate event)를 사용하여
// URL과 UI를 동기해주는 <Router>이다.
// 이는 페이지를 새로고침하지 않고도 주소를 변경할 수 있도록 해주고, 현재 주소에 관련된 정보를 props로 조회 및 사용이 가능하도록 한다.
// BrowserRouter는 리액트 라우터 돔을 적용하고 싶은 컴포넌트의 최상위 컴포넌트를 감싸주는 래퍼 컴포넌트이기 때문에,

// HashRouter ->  hash 방식은 주소에 # 이라는 불필요한 해쉬가 붙습니다.
// 또한 검색엔진에서 읽어들일 수 없기 때문에 서비스를 제공하는 입장에서는 치명적인 단점으로 작용할 수 있습니다.
// react-router 에도 <HashRouter> 를 사용할 수 있지만 꼭 필요한 경우가 아니라면 사용을 지양하고 있습니다.

// 라우팅이란 무엇인가?

/*
    
    라우팅 : 웹앱에서 라우팅은 사용자가 요청한 URL 에 맞게 페이지를 보여주는 것을 의미
    라우팅 ? -> 어떤 네트워크 안에서 통신 데이터를 보낼 때, 최적의 경로를 선택하는 과정이다.
    라우팅은 -> 주어진 데이터를 가장 짧은 거리로 또는 가장 작은 시간 안에 전송할 수 있는 경로이다.

    v5 에서는 Switch 를 사용하다가 -> v6 에서는 Routes 로 이름이 변경되었음.

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



    // Query String vs Path Variable 

    // 일반적으로 우리가 어떤 자원(데이터)의 위치를 특정해서 보여줘야 할 경우 
    // Path variable 을 쓰고, 정렬하거나 필터해서 보여줘야 할 경우에
    // Query parameter 를 사용한다.
    
    //----example 

    /users                           #Fetch a list of users
    /users?occupation=programmer     #Fetch a list of programmer user
    /users/123                       #Fetch a user who has id 123
    
    위의 방식으로 우리는 어디에 어떤 데이터(명사)를 요청하는 것인지 명확하게 정의할 수 있다.
    하지만, 그 데이터를 가지고 뭘 하자는 것인지 동사는 빠져있다.
    그 동사 역할을 하는 것이 GET, POST, PUT, DELETE 메서드 이다.

    즉, Query string 과 Path variable 이 이들 메서드와 결합함으로써, "특정 데이터" 에 대한
    CRUD 프로세스를 추가의 엔드포인트 없이 완결 지을 수 있게 되는 것이다.
    
    물론 이와 같은 규칙을 지키지 않더라도, 잘 돌아가는 API 를 만들 수는 있다.
    하지만 지키지 않을 경우 서비스 엔드포인트는 복잡해지고, 개발시간/외부와 커뮤니케이션 코스트가 높아져,
    큰 잠재적 손실을 초래할 수 있으니, 
    이 규칙은 잘 지켜서 사용하는 것이 필수이다.


    ## 중첩된 라우팅


    ## <Outlet/> 사용해보기 -> '공통 레이아웃 컴포넌트'
    Outlet 은 페이지끼리 '공통적'으로 보여줘야하는 레이아웃이 있을 때도 유용하게 사용할 수 있습니다.
    에를 들어서, Home, About, Profile 페이지의 '상단'에 Header 를 보여줘야 하는 상황을 가정해봅시다.
    첫번째로 드는 생각은 Header 컴포넌트를 ㄸㅏ로 만들어두고, 각 페이지 컴포넌트에서 '재사용' 하는 방법일 것입니다.
    
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
      <li>
        <Link to="/articles">Article</Link>
      </li>
      <h1>Home 페이지</h1>
    </div>
  );
};

// Layout 컴포넌트는 말그대로 공통 검포넌트를 호출할 공간(?) 같은 곳
const Layout = () => {
  // react-router 부가 기능  useNavigate();
  // useNavigate 는 Link 컴포넌트를 사용하지 않고, 다른 페이지로 이동해야 하는 상황에 사용하는 Hook이다.
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goArticle = () => {
    navigate("/articles");
  };

  return (
    <div>
      <header>
        여기는 헤더 영역
        <button onClick={goBack}> 뒤로 가기 </button>
        <button onClick={goArticle}> 게시물 목록 </button>
      </header>
      <Outlet />
      <footer>여기는 푸터 영역</footer>
    </div>
  );
};

// index props
// Route 컴포넌트에는 index 라는 props 가 있다.
// 이 props 는 path="/" 와 동일한 의미를 가진다.
// Home 컴포넌트가 사용된 Route 컴포넌트를 다음과 같이 변경해보자.
// 그리고, / 경로로 들어갔을 때 여전히 Home 페이지가 여전히 잘 나오고 있나요?
// index prop은 상위 라우트의 경로와 일치하지만,
// 그 이후에 경로가 주어지지 않았을때 보여지는 라우트를 설정할때 사용합니다.
// path="/"와 동일한 역할을 하며 이를 좀 더 명시적으로 표현하는 방법입니다.

// req.params 를 통해 파라미터안의 값을 서버에서 받을 수 있고,
// req.query 를 통해 쿼리안의 값을 서버에서 받을 수 있음. (주로 GET 요청에 대한 처리를 함)

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profiles/:username" element={<Profile />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/articles" element={<Articles />}>
            <Route path=":id" element={<Article />} />
          </Route>
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
