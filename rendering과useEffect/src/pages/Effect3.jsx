import { useEffect } from "react";
import { useState } from "react";
// import Box from "../components/Box";

const Box = ({ num }) => {
  useEffect(() => {
    console.log(`${num} Box 가 화면에 나왔다`);

    return () => {
      console.log(`${num} Box가 componentWillUnMount 할것이다..`);
    };
  }, []);

  // 화면에서 사라지는 것이 componentWillUnMount가 아님.

  // componentWillUnMount 는 DOM 에서 사라져야함.

  // document.getElementById("box55"); 라고 브라우저창에 검색하면 DOM 에 존재함

  return (
    <div
      id="box55"
      style={{
        width: "200px",
        lineHeight: "200px",
        textAlign: "center",
        border: "1px solid gray",
      }}
    >
      {num}
    </div>
  );
};

const Effect3 = () => {
  const [state, setState] = useState(false);

  const handleToggle = () => {
    setState((state) => !state);
  };
  return (
    <div>
      <h1>Effect3</h1>
      <div style={{ display: "flex" }}>
        <button onClick={handleToggle}>사라져라 토글</button>
        {state ? <Box num={0} /> : <Box num={1} />}
      </div>
    </div>
  );
};

export default Effect3;
