import { useRecoilState } from "recoil";
import { isDarkState } from "./atom";
import styled from "styled-components";
import Child from "./Child";

const Btn = styled.button`
  width: 200px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const Home = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const handleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <div>
      Home 페이지입니다.
      <p>컨텐츠</p>
      <div>
        <Btn onClick={handleTheme}>{isDark ? "라이트 모드" : "다크 모드"}</Btn>
        <Child />
      </div>
    </div>
  );
};

export default Home;
