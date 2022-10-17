import { useEffect, useState } from "react";
import User from "../components/User";

const UseEffectTest = () => {
  const [state, setState] = useState([
    { name: "주강", age: 29 },
    { name: "석희", age: 29 },
    { name: "석희바보", age: 29 },
    { name: "석희멍청이", age: 29 },
  ]);

  const handleClick = () => {
    setState((state) => {
      const newState = state.filter((user) => user.name !== "주강");

      return [...newState];
    });
  };

  return (
    <div>
      <h1>useEffectTest</h1>
      <p>useEffectTest</p>
      {state.map((user, index) => (
        <User user={user} key={index} />
      ))}
      <button onClick={handleClick}>Child 컴포넌트 삭제</button>
    </div>
  );
};

export default UseEffectTest;
