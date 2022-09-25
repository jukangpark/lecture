import { useState } from "react";

const LearnState = () => {
  const [num, setNum] = useState(0);

  const handleClick = () => {
    setNum((prev) => prev + 1);
  };

  return (
    <div>
      <span>{num}</span>
      <button onClick={handleClick}>+</button>
    </div>
  );
};

export default LearnState;
