import { useState } from "react";

const App = () => {
  const [num, setNum] = useState(0); // react 내자된 훅 api 라서

  const clickFunc = () => {
    // 제가 8시부터 다른 수업이 있어서, 금방 정답 알려드리구, slack 에서 다음 강의 일정 조율해서 알려드릴게요
    //
    setNum((prev) => {
      console.log(prev); // 이전 상태값
      return prev + 1;
    });
    // 함수를 인자로 넣어주세요!
    // slack 에서 뵙겠습ㄴ당
  };

  // const clickFunc = (prev) => {
  //   setnum = prev+1;
  //   return
  // }

  return (
    <div>
      <span>{num}</span>
      <button onClick={clickFunc}>+</button>
    </div>
  );
};

export default App;
