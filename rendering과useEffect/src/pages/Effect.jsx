import { useEffect } from "react";
import { useState } from "react";
import Box from "../components/Box";

const Effect = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    console.log("페이지가 최초 렌더링"); // 이건 최초에만 호출됨.

    // window.setInterval(() => {
    //   console.log("hello");
    // }, 1000);

    return () => {
      console.log("이 페이지가 willUnMount 할거야");
      window.localStorage.setItem("effect 페이지", "종료되었음");
      // 컴포넌트가 unmount 될 때만 이 함수를 태우고 싶다면, 빈배열 [] 을 주면 되고, 그런데 unMount 가 된다는 말은 DOM 에서 사라져야한다는 말임.
      // react-router에 의해
      // 특정 값이 업데이트되기 직전에 cleanup 함수를 실행시키고 싶다면 deps에 해당 값을 넣어주면 됩니다.
      // react-router-dom 은 HTML5 History API 를 기반으로 만들어진 라이브러리 인데,
      // 페이징 처리를 할 때, 실제로 페이지 이동을 하는 것이 아니지만, 이동이 일어나는 것 처럼 보여준다.
      // HTML 5의 History API를 사용해서 가능하게 만든다. 자바스크립트 영역에서 History API를 이용해 현재 페이지 내에서 페이지 이동이 일어난 것 처럼 보여준다.
      // DOM의 window 객체는 history 객체를 통해서 브라우저의 히스토리에 접근할 수 있는데요. 우선은 아주 간단하게 back(), forward(), go() 메서드를 이용해서 브라우저의 앞으로가기 뒤로가기 기능을 구현할 수 있답니다.
      // 출처 : https://falsy.me/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EC%9D%B4%ED%95%B4-2-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EA%B7%B8%EB%A6%AC%EA%B3%A0-history-api/

      // 한마디로 react-router 로 페이지를 옮긴다고 한들, DOM 에는 존재한단 소리

      // 실제로 리엑트 앱을 킨 상태로 window.history.go() 라고 하면 다음 페이지로 넘어가게됨.
    };
  }, []);

  useEffect(() => {
    console.log("이 페이지가 height에 의해서 업데이트 할 때 componentDidMount");
    // 이건 최초에도 호출되고, height 가 업데이트 되었을 때도, 호출됨.

    return () => {
      console.log("이 페이지가 height에 의해서 componentWillUnmount 될거야!");
    }; // cleanUp 함수이다.
  }, [height]); // 여기서 작성된 코드는 state 가 '업데이트' 되었을 때

  useEffect(() => {
    console.log("이 페이지가 weight에 의해서 업데이트 할 때 componentDidMount");
    // 이건 최초에도 호출되고, weight 가 업데이트 되었을 때도, 호출됨.

    return () => {
      console.log("이 페이지가 weight에 의해서 componentWillUnmount 될거야!");
    };
  }, [weight]);

  useEffect(() => {
    console.log(
      "이 페이지는 weight가 바뀌든 height가 바뀌든 이 함수가 계속 호출될거야"
    );
  }, [weight, height]);

  const addHeight = () => {
    setHeight(height + 1);
  };

  const addWeight = () => {
    setWeight(weight + 1);
  };

  //------------------------------------------------

  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const remove = () => {
    setArray(array.filter((num) => num < 5));
  };

  // 화면에서 사라진다고 해서
  // componentWillUnmount cleanUp 함수가 호출되는 것은 아님
  // dom 에서 사라져야함.
  // https://it-eldorado.tistory.com/m/113

  return (
    <div id="effect55">
      <h1>Effect</h1>
      <p>useEffectTest</p>
      <button onClick={addHeight}>height{height}</button>
      <button onClick={addWeight}>weight{weight}</button>

      <button onClick={remove}>DOM 에서 box 삭제하는 버튼</button>
      {array.map((num) => (
        <Box key={num} num={num} />
      ))}
    </div>
  );
};

export default Effect;
