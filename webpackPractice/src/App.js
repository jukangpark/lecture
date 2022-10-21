import imgsrc from "./assets/wwww.png";
import { useEffect } from "react";

const App = () => {
  // assets 이라는 폴더가 dist 폴더 안에 생기려면
  // 종속 그래프가 생성이 되어야한다.
  // 그말은 즉슨 해당 이미지를 참조를 해야지만, 화면에 나옴..
  useEffect(() => {
    console.log(imgsrc);
  }, []);
  return (
    <div>
      <h1>웹팩 설정하기</h1>
      <img src={imgsrc} />
    </div>
  );
};

export default App;
