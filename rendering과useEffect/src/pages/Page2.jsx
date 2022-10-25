import { useEffect } from "react";
import { useState } from "react";
import Box from "../components/Box";

const Page2 = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    // document 객체에 해당 엘리먼트가 없다면,
    // DOM 에서 unmount 된거니까,
    // 클린업 함수가 리턴되야하는거 아닌감?
    console.log(document.getElementById("1"));
    console.log(document.getElementById("0"));

    // useEffect의 클린업 함수는
    // DOM 에서 unmount 되었을 경우 호출되는데,
    // DOM 에는 존재하지 않는다.
    // 그럼 이 DOM은 무슨 DOM 을 의미하는거임
    // React DOM 을 의미하는듯

    // ReactDOM vs RealDOM
  }, [state]);

  const handleToggle = () => {
    setState((state) => !state);
  };
  return (
    <div>
      <h1>사라진 JSX 엘리먼트에 넘겨준 props 의 최신화</h1>
      <h1>
        컴포넌트 언마운트시 document 객체내에서 우리가 그걸 찾을 수 있는가
      </h1>
      <div style={{ display: "flex" }}>
        <button onClick={handleToggle}>사라져라 토글</button>
        {state ? <Box num={0} /> : <Box num={1} />}
      </div>
    </div>
  );
};

export default Page2;
