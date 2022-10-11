// 1. props 만을 통해 GOOD 이라는 string 을 넘겨주는 방식

// function ContextApiTest() {
//   return <GrandParent text="GOOD" />;
// }

// // props 를 통해 GOOD 을 넘겨줘야하는
// // 단방향 데이터 전달 방식 부모 -> 자식
// // 만약 GrandParent 에서 Child 로 데이터를 바로 넘겨주고 싶다면? ( 전역 State 를 사용하고싶다면?)

// function GrandParent({ text }) {
//   return <Parent text={text} />;
// }

// function Parent({ text }) {
//   return <Child text={text} />;
// }

// function Child({ text }) {
//   return <div>안녕하세요? {text}</div>;
// }

// export default ContextApiTest;

// // ContextApiTest

// 2. ContextAPI 를 사용하여 good 를 전달하는 방식
// Context 는 '저장공간' 이라고 생각하면 편하다.
// Context.Provider 를 통해 값을 전달해줌.

// Provider 로 감싸고 있는 모든 컴포넌트들은 해당 값을 참조할 수 있음.
// 값을 가져올 때는 useContext() 라는 훅을 사용해서
// Context 를 매개변수로 넘기게 되면, 해당 Provider value 에 있는 값을
// 하위 컴포넌트에서 사용할 수 있다.

import { createContext, useContext, useState } from "react";

const MyContext = createContext("defaultValue");
// context 에서 사용하게될 기본값을 넣어주게됨.

function ContextApiTest() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? "GOOD" : "BAD"}>
      <GrandParent />
      <button onClick={() => setValue(!value)}>CLICK ME</button>
    </MyContext.Provider>
  );
}

function GrandParent() {
  return <Parent />;
}

function Parent() {
  return <Child />;
}

function Child() {
  // Child 에서 MyContext 에 담겨진 값을 불러와 사용할 수 있습니다.
  const text = useContext(MyContext);
  // useContext 는 Context에 저장되어있는 값을 불러올 수 있도록 해주는 리엑트에 내장된 Hook입니다.
  // 만약 Context의 값을 '변경'하고 싶다면 Provider 를 사용해야해요!
  return <div>안녕하세요? {text}</div>;
}

export default ContextApiTest;
