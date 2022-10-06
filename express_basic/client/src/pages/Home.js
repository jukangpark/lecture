import { useCookies } from "react-cookie";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  console.log(cookies.user);
  return (
    <div>
      <header>현재 로그인한 유저 : </header>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
