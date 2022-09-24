import { useState } from "react";

const App = () => {
  const [user, setUser] = useState({ name: "jukang" });

  // React 에서는 State 가 변경이 되면 -> 컴포넌트가 리렌더링을 하게 되잖아요
  // React 에서는 얕은 비교를 수행하게 됩니다. -> 객체가 있으면, 객체 안의 프로퍼티까지 보지는 않아요!
  // 얕은비교 -> 메모리 주소 값이 다른지 아닌지만 대충 훑고 넘어간다.

  // 얕은 복사 vs 깊은 복사 -> 객체, 배열 참조형데이터 vs 원시형 데이터 왜????? -> React - immer 불변성 지키큰ㄴ거

  // 객체가 있는데, 그 객체안에 프로퍼티 값이 바뀌면 우리가 원하는건 리렌더링인데, 리렌더링이 안되요! side-effect (버그)
  // react 에서 state 관리 -> 불변성지키는거에요!

  // 객체안의 프로퍼티가 변경이되었다고해서, 해당 객체가 저장된 state 의 메모리 주소 값이 바뀐건 아니에요!
  // const a = {name: "Jukang"};
  // a.name = "다른사람이름" 동일한 메모리주소를 가지게되요!
  // 얕은 복사 - 복사를 할 때 값이 복사 되는게 아니고, 메모리 주소 값이 복사되는거에요!

  // 객체를 복사할때는 메모리주소값이 복사되요! -> 참조형 데이터라고 부르는거에요!!
  // 객체, 배열,      string, number, boolean, -> 원시형 데이터

  const jukang = { name: "jukang" };
  const jukangCopy = jukang; // 그냥 둘이 쌍둥이가 되버려요! 둘이 같은 메모리 주소값을 가져요!

  jukang.name = "Yunju";

  console.log("juknagCopy", jukangCopy, "jukang", jukang);

  const handleChange = (e) => {
    setUser((user) => {
      // user.name = e.target.value;

      // React 에서 불변성응ㄹ 지켜줘야하는 이유고, immer.js
      return { ...user, name: e.target.value };
    });

    // setUser((user) => {
    //   return { ...user, name: e.target.value };
    // 이런식으로 작성해주면 리렌더링이 잘될겁니다. 전개연산자(...)를 사용하여, 이전의 state 객체의 프로퍼티를 전개해주고, name 의 값을 바꿔준다음
    // 새로운 객체로 대체해주면 리렌더링이 잘됩니다.
    // });
  };

  return (
    <div>
      <span>{user.name}</span>
      <input onChange={handleChange}></input>
    </div>
  );
};

export default App;
