import { useEffect } from "react";
import { useState } from "react";

const Page3 = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    console.log("Page3 이 최초 렌더링 되었을 때 호출될거야!");
  }, []);

  useEffect(() => {
    // 관심사의 분리 : weight
    // 최초 렌더링 시 호출되고, 그 이후 업데이트(리렌더링) 될 때에도 호출됨.
    console.log(
      `weight: ${weight} 가 업데이트 되면 호출될 useEffect 안의 코드`
    );
  }, [weight]);

  useEffect(() => {
    // 관심사의 분리 : height
    // 최초 렌더링 시 호출되고, 그 이후 업데이트(리렌더링) 될 때에도 호출됨.
    console.log(
      `height: ${height} 가 업데이트 되면 호출될 useEffect 안의 코드`
    );
  }, [height]);

  const addWeight = () => {
    setWeight(weight + 1);
  };

  const addHeight = () => {
    setHeight(height + 1);
  };

  return (
    <div>
      <h1>state 가 변경될 때 호출되는 useEffect()</h1>
      <p>
        weight : {weight}
        <button onClick={addWeight}>+</button>
      </p>

      <p>
        height : {height}
        <button onClick={addHeight}>+</button>
      </p>
    </div>
  );
};

// 리엑트에서 컴포넌트가 리렌더링 되는 4가지 조건
// 1. state 가 변경,
// 2. props 가 변경,
// 3. 부모 컴포넌트가 리렌더링 될 때,
// 4. forceUpdate() 를 호출할때

export default Page3;
