import { useEffect } from "react";
import { useState } from "react";
import Box from "../components/Box";

const Page1 = () => {
  const [state, setState] = useState(1);

  useEffect(() => {
    window.setInterval(() => {
      console.log("hello");
      localStorage.setItem(Math.random(), "키는 고유한거 한개여야함 그리고 값");
    }, 1000);
    console.log("페이지가 최초 렌더링 된 이후: componentDidMount");
    // 이건 최초에만 호출됨.

    return () => {
      console.log("이 페이지가 willUnMount 할거야");
      // 이건 우리가 콘솔창에서 확인할 수 없음.
      // 그런데 확인할 방법이 있기는 함. 그건 Page 3 에서,
    };
  }, []);

  //------------------------------------------------

  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const remove = () => {
    setArray((prevState) => {
      prevState.pop();
      // Array.prototype.pop()
      // 배열의 마지막 요소를 삭제하는 메서드

      return [...prevState];
    });
    // [1,2,3,4]
  };

  const handleAdd = () => {
    setState(state + 1);
  };

  return (
    <div id="effect55">
      <h1>useEffect 기초</h1>
      <ol>
        <li>react-router 를 통한 페이징 처리와 useEffect()의 cleanUp 함수</li>
        <li>
          페이지 안의 컴포넌트들이 unmount 시 setInterval 이 계속 남아있는 문제
        </li>
      </ol>

      {console.log(
        "화면에 jsx 엘리먼트를 렌더링 되고 난 후에 useEffect() 메서드 안의 코드 블럭들이 실행됨"
      )}

      <button onClick={remove}>DOM 에서 box 삭제하는 버튼</button>
      {array.map((num) => (
        <Box key={num} num={num} />
      ))}
      {state}
      <button onClick={handleAdd}>+</button>
    </div>
  );
};

export default Page1;
