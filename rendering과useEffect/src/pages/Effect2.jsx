import { useState } from "react";
import { useEffect } from "react";
import Box2 from "../components/Box2";

const Effect2 = () => {
  useEffect(() => {}, []);

  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const remove = () => {
    setArray(array.filter((num) => num < 5));
  };

  return (
    <div>
      <h1>Effect2</h1>
      <p>content</p>
      {array.map((num) => (
        <Box2 num={num} key={num} />
      ))}
      <button onClick={remove}>5을 삭제하기</button>
    </div>
  );
};

export default Effect2;
