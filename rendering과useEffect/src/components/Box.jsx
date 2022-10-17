import React from "react";
import { useEffect } from "react";

const Box = ({ num }) => {
  //  useEffect 는 결국 Box 라는 함수의 호출과 연관이 있는거네,
  //  함수를 호출하면 useEffect 가 실행되는거임.. [] 의존성 배열이 있다면, 최초에 한번만 호출하게 됨.
  //  props 가 바뀌었을 경우

  useEffect(() => {
    console.log(`${num} box가 최초 렌더링 되었습니다.`);
  }, []);

  useEffect(() => {
    console.log(num, "num이 업데이트 되면 이건 항상호출됨");
  }, [num]);

  useEffect(() => {
    return () => {
      console.log(`${num} box 가 willUnMount 할겁니다.`);
    };
  }, []);

  return (
    <div
      className={String(num)}
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

export default React.memo(Box);
