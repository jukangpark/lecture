const { useContext, createContext, useState, useEffect } = require("react");

const MyContext = createContext();

function GrandchildComponent() {
  useEffect(() => {
    console.log("GrandchildComponent is rendered!");
  });

  const value = useContext(MyContext);
  return <div>{value.a}</div>;
}

function ChildComponent() {
  useEffect(() => {
    console.log("ChildComponent is rendered!");
  });

  return <GrandchildComponent />;
}

export default function ContextApiTest3() {
  const [a, setA] = useState(0);
  const [b, setB] = useState("text");

  const contextValue = { a, b };

  return (
    <MyContext.Provider value={contextValue}>
      <button onClick={() => setA((prev) => prev + 1)}>updateA</button>
      <button onClick={() => setB((prev) => `${prev}text`)}>updateB</button>
      <ChildComponent />
    </MyContext.Provider>
  );
}

// Context API 를 사용하지 않으려는 이유는 바로 '성능' 때문임.
// Context Provider에 새로운 값이 있다면, 해당 컴텍스트를 사용하는 모든 중첩 컴포넌트가 '강제로' 리렌더링 된다.
// 리엑트 관점에서 각 Context Provider 는 '단일 값'만 가진다.
// 객체, 배열, 원시 값이든 상관 없이 하나의 컨텍스트 값일 뿐이다.

// 현재로서는 해당 컨텍스트를 사용하는 모든 컴포넌트는 값의 '일부'만 변경되었다 하더라도,
// 새 컨텍스트로 인한 업데이트를 건너 뛸 수가 없다.

// 한마디로 정리하면 -> ContextProvider 가 제공하는 값들을 useContext 로 사용하는 모든 컴포넌트가 리렌더링됨.
// 서로 관련이 없는 상태라면 같은 Context 에 있으면 안됩니다. Context를 따로 따로 만들어주어야하죠.

/*
<Context API 로만 충분한 경우>

1. 자주 변하지 않는 간단한 값만 전달하는 경우
2. 애플리케이션 일분에 일부 state 나 함수를 전달하지만, 이 값이 props 로 많은 부분 넘기고 싶지 않은 경우
3. 추가적인 라이브러리 없이 리엑트 기능만으로 구현하고 싶을 때

------------------------------------------------------------------------------------------------------------------------

<상태관리 솔루션이 필요할 때>

1. 애플리케이션 여러 위치에 많은 양의 애플리케이션의 상태 값이 필요한 경우
2. 애플리케이션의 상태가 시간에 따라 자주 업데이트 되는 경우
3. 상태 관리 로직이 복잡한 경우
4. 애플리케이션이 매우 크고, 많은 사람이 개발하는 경우
*/
