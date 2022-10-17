import { useEffect } from "react";
import { useState } from "react";
import UserList from "../components/UserList";

const UseEffectTest = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    console.log("페이지가 최초 렌더링");
  }, []);

  useEffect(() => {
    console.log("UseEffectTest 가 업데이트 할 때 등장");
    // height 라는 값이 업데이트 되었을 때, console.log() 호출됨
    return () => {
      console.log("useEFFECT가 종료되었음.");
    }; // cleanUp 함수이다.
  }, [height]); // 여기서 작성된 코드는 state 가 '업데이트' 되었을 때

  useEffect(() => {
    console.log("몸무게가 증가");
  }, [weight]);

  const [state, setState] = useState([
    { name: "주강", age: 29 },
    { name: "석희", age: 29 },
    { name: "석희바보", age: 29 },
    { name: "석희멍청이", age: 29 },
  ]);

  const handleClick = () => {
    setState((state) => {
      const newState = state.filter((user) => user.name !== "주강");

      return newState;
    });
  };

  const addHeight = () => {
    setHeight(height + 1);
  };

  const addWeight = () => {
    setWeight(weight + 1);
  };

  return (
    <div>
      <h1>useEffectTest</h1>
      <p>useEffectTest</p>
      <button onClick={addHeight}>height{height}</button>
      <button onClick={addWeight}>weight{weight}</button>
    </div>
  );
};

export default UseEffectTest;
