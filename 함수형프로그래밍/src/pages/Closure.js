// import { useState } from "react";

import { useEffect, useRef } from "react";

function useState(initialValue) {
  var value = initialValue; // _val은 useState에 의해 만들어진 지역 변수입니다.
  function state() {
    // state는 내부 함수이자 클로저입니다.
    return value; // state()는 부모 함수에 정의된 _val을 참조합니다.
  }
  function setState(newVal) {
    // 마찬가지
    value = newVal; // _val를 노출하지 않고 _val를 변경합니다.
  }
  return [state, setState]; // 외부에서 사용하기 위해 함수들을 노출
  // 여기에 작성된 코드는 아주 간단한 useState 훅을 구현해본것임.
  // setState 에 함수를 넣는 로직은 아직 구현 못한 코드임.
}

/* 
  React의 useState Hook의 아주 기본적인 형태의 복제본을 만들어 보았습니다. 
  이 함수에는 state와 setState라는 두 개의 내부 함수가 있습니다. 
  state는 상단에 정의된 지역 변수 val를 반환하고
  setState는 전달 된 매개 변수 (예: newVal)로 지역 변수를 설정합니다.
  여기서 state는 게터 함수로 구현하여 이상적이지는 않지만, 이는 조금 뒤에 수정하겠습니다. 
  중요한 것은 foo와 setFoo를 사용하여 내부 변수 _val에 접근하고 조작(일명 “덮어쓰기”) 할 수 있다는 것입니다. 
  이 둘은 useState의 스코프에 대한 접근 권한을 가지고 있고, 이러한 참조를 클로저라고 합니다. 
  React와 다른 프레임워크의 맥락에서 보면 이것은 ‘상태’라고 할 수 있고 실제로도 그렇습니다.
  클로저에 대해 더 자세히 알아보려면 MDN, YDKJS 및 DailyJS에서 해당 주제에 대해 읽어보는 것을 추천합니다. 하지만 위의 샘플 코드가 이해된다면 그 정도로도 충분합니다.
*/

const Closure = () => {
  // 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.
  // 클로저를 이해하려면,js 가 어떻게 변수의 유효범위를 지정하는지(Lexical scoping)를 먼저 이해해야 한다.
  // 클로저와 리엑트 훅
  // 클로저는 함수가 속한 렉시컬 스코프를 기억하여 함수가 렉시컬 스코프 밖에서 실행될 때에도 이 스코프에 접근할 수 있게 하는 기능을 뜻한다.
  var [state, setState] = useState(0); // 배열 구조분해 사용
  console.log("현재 state는?.", state()); // 0 출력 - 위에서 넘긴 initialValue
  setState(1); // useState의 스코프 내부에 있는 _val를 변경합니다.
  console.log("현재 state는?", state()); // 1 출력 - 동일한 호출하지만 새로운 initialValue

  const num = 5;

  function outerFunc() {
    const num = 10;
    const innerFunc = function () {
      console.log("num은", num); // 5 일까요? 10일까요?
    };
    innerFunc();
  }

  outerFunc();

  // 스코프는 함수를 호출할 때가 아니라, 함수를 어디에 '선언'하는지에 따라 결정된다.
  // 이를 렉시컬 스코핑(Lexical scoping)라 한다.
  // 내부함수 innerFunc가 자신을 포함하고 있는 외부함수 outerFunc의 변수 x에 접근할 수 있는 것, 다시 말해 상위 스코프에 접근할 수 있는 것은 렉시컬 스코프의 레퍼런스를 차례대로 저장하고 있는 실행 컨텍스트의 스코프 체인을 자바스크립트 엔진이 검색하였기에 가능한 것이다. 좀더 자세히 설명하면 아래와 같다.
  // innerFunc 함수 스코프(함수 자신의 스코프를 가리키는 활성 객체) 내에서 변수 x를 검색한다. 검색이 실패하였다.
  // innerFunc 함수를 포함하는 외부 함수 outerFunc의 스코프(함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 활성 객체)에서 변수 x를 검색한다. 검색이 성공하였다.

  const num2 = 5;

  const outerFunc2 = () => {
    const num2 = 10;
    const innerFunc2 = () => {
      console.log("num2는", num2); // 5 일까요? 10일까요?
    };
    return innerFunc2;
  };

  const inner = outerFunc2();

  inner();

  // 이미 life-cycle이 종료되어 실행 컨텍스트 스택에서 제거된 함수 outerFunc의 지역변수 x가 다시 부활이라도 한 듯이 동작하고 있다. 뭔가 특별한 일이 일어나고 있는 것 같다.
  // 이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우, 외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(Closure)라고 부른다.
  // 즉, 클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인 스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도 그 환경(스코프)에 접근할 수 있는 함수를 말한다.
  // 이를 조금 더 간단히 말하면 클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억하는 함수다라고 말할 수 있겠다.

  /*
    클로저에 의해 참조되는 외부함수의 변수 즉 outerFunc 함수의 변수 x를 자유변수(Free variable)라고 부른다. 
    클로저라는 이름은 자유변수에 함수가 닫혀있다(closed)라는 의미로 의역하면 자유변수에 엮여있는 함수라는 뜻이다.
    실행 컨텍스트의 관점에 설명하면, 내부함수가 유효한 상태에서 외부함수가 종료하여 외부함수의 실행 컨텍스트가 반환되어도, 
    외부함수 실행 컨텍스트 내의 활성 객체(Activation object)(변수, 함수 선언 등의 정보를 가지고 있다)는 내부함수에 의해 참조되는 한 유효하여 내부함수가 스코프 체인을 통해 참조할 수 있는 것을 의미한다.
    즉 외부함수가 이미 반환되었어도 외부함수 내의 변수는 이를 필요로 하는 내부함수가 하나 이상 존재하는 경우 계속 유지된다. 
    이때 내부함수가 외부함수에 있는 변수의 복사본이 아니라 실제 변수에 접근한다는 것에 주의하여야 한다.
    클로저는 자신이 생성될 때의 환경(Lexical environment)을 기억해야 하므로 메모리 차원에서 손해를 볼 수 있다. 
    하지만 클로저는 자바스크립트의 강력한 기능으로 이를 적극적으로 사용해야 한다. 클로저가 유용하게 사용되는 상황에 대해 살펴보자.
  */

  /*
    이처럼 클로저는 현재 상태(위 예제의 경우 .box 요소의 표시 상태를 나타내는 isShow 변수)를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용하다. 만약 자바스크립트에 클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다.
   */

  const box = useRef();
  console.log(box); // 여기서는 box 에 아무것도 안담기기 때문에 undefined 가 뜸.
  // 왜 useRef 로 리엑트 엘리먼트를 가져올 때는, componentDidMount 안에서 작성안해도되는거죠? useRef() 함수는 우선 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해줘야함.
  // useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 합니다.
  // 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 됩니다.
  console.log(box.current);

  useEffect(() => {
    console.log(box); // 컴포넌트가 화면에 렌더링 된 이후에 useRef() 를 사용해야 우리가 원하는 DOM 엘리먼트를 box.current 에 담아올 수 있다.
    console.log(box.current);
  }, []);

  const closureFunc = () => {
    let isShow = false;

    return function () {
      box.current.style.display = isShow ? "block" : "none";
      isShow = !isShow;
    };
  };

  const handleClick = closureFunc();
  // 클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다.
  // 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한
  // 클로저가 기억하는 렉시컬 환경의 변수 isShow 는 소멸하지 않는다.
  // 다시 말해 "현재 상태"를 기억한다.
  // 이 처럼 클로저는 현재 "현재 상태"를 기억하고 이 상태가 변경되어도 "최신 상태" 를 유지해야 하는 상황에 매우 유용하다.
  // 만약에 JS 에 클로저라는 기능이 없다면, 상태를 유지하기 위해 '전역 변수'를 사용할 수밖에 없으며, 전역 변수는 누구든지 언제나 접근할 수 있기 때문에 부작용을 유발해 오류의 원인이 되므로, 사용을 억제해야한다.

  let globalBoolean = false; // 클로저를 사용하지 않고 이런 기능을 구현하게되면, 언제 어디서든 globalBoolean 이라는 변수에 접근할 수가 있는 문제가 생긴다.

  const globalFunc = () => {
    box.current.style.display = globalBoolean ? "block" : "none";
    globalBoolean = !globalBoolean;
  };

  // '클로저'를 사용하는 이유?
  // 변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원인이 될 수 있다.
  // 상태 변경이나 가변(mutable) 데이터를 피하고 불변성(Immutability)을 지향하는 함수형 프로그래밍에서 부수 효과(Side effect)를 최대한 억제하여
  // 오류를 피하고 프로그램의 안정성을 높이기 위해 클로저는 적극적으로 사용된다.

  // 클로저 만들어보기
  // 클로저는 현재의 '상태'를 기억한다.

  const addMaker = (num) => {
    return function () {
      num = num + 1;
      return num;
    };
  };

  const closureFunction = addMaker(0);

  console.log("클로저 펑크", closureFunction()); // 1
  console.log("클로저 펑크", closureFunction()); // 2
  console.log("클로저 펑크", closureFunction()); // 3
  console.log("클로저 펑크", closureFunction()); // 4

  const decreaseMaker = (num) => {
    return function () {
      num = num - 1;
      return num;
    };
  };

  const closureFunc2 = decreaseMaker(0);

  console.log("클로저 펑크2", closureFunc2()); // 1
  console.log("클로저 펑크2", closureFunc2()); // 2
  console.log("클로저 펑크2", closureFunc2()); // 3
  console.log("클로저 펑크2", closureFunc2()); // 4

  // 함수를 인자로 전달받고 함수를 반환하는 고차 함수
  // 이 함수가 반환하는 함수는 클로저로서 카운트 상태를 유지하기 위한 자유 변수 counter을 기억한다.

  function makeCounter(callback) {
    // 카운트 상태를 유지하기 위한 자유 변수
    let counter = 0;
    // 클로저를 반환
    return function () {
      // 함수 makeCounter 가 반환하는 함수는 자신이 생성됐을 때의, 렉시컬 환경인
      // 함수 makeCounter의 스코프에 속한 변수 counter 를 기억하는 클로저이다.
      // 함수를 호출하면 그때마다 새로운 렉시켤 환경이 생성된다.
      // 이 예제에서는 변수 increaser 와, 변수 decraser 에 할당된 함수는
      // 각각 자신만의 독립적인 렉시컬 환경을 가지기 때문에
      // 카운트를 유지하기 위한 자유 변수 'counter' 를 공유하지 않아
      // 카운터의 증가 감소가 연동되지 않는다.
      // 따라서 독립적인 카운터가 아니라, 연동하여 증감이 가능한 카운터를 만들기 위해서는
      // '렉시컬 환경'을 공유하는 클로저를 만들어야함.
      counter = callback(counter);
      return counter;
    };
  }

  // 보조 함수
  function increase(n) {
    return ++n;
  }

  // 보조 함수
  function decrease(n) {
    return --n;
  }

  // 함수로 함수를 생성한다.
  // makeCounter 함수는 보조 함수를 인자로 전달받아 함수를 반환한다
  const increaser = makeCounter(increase); // makeCounter 를 호출할 때 새로운 렉시컬 환경이 생성됨.
  console.log(increaser()); // 1
  console.log(increaser()); // 2

  // increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
  const decreaser = makeCounter(decrease); // makeCounter 를 호출할 때 새로운 렉시컬 환경이 생성됨.
  console.log(decreaser()); // -1
  console.log(decreaser()); // -2

  /*
    함수 makeCounter는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수이다. 
    함수 makeCounter가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 함수 makeCounter의 스코프에 속한 변수 counter을 기억하는 클로저다. 
    함수 makeCounter는 인자로 전달받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다. 
    이때 주의해야 할 것은 함수 makeCounter를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 것이다. 
    이는 함수를 호출하면 그때마다 새로운 렉시컬 환경이 생성되기 때문이다. 
    위 예제에서 변수 increaser와 변수 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동하지 않는다. 
    따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다.
  */

  // 결론
  // 클로저란 자신이 생성될 때의 '환경'을 기억하는 "함수"다.
  // 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수를 기억하는 "함수"다.

  return (
    <div>
      <h1>Closure</h1>
      <p>클로저를 리턴하는 함수를 호출하는 click 버튼</p>
      <button onClick={handleClick}>toggle</button>

      <div
        id="box"
        ref={box}
        style={{
          backgroundColor: "red",
          color: "white",
          width: "200px",
          lineHeight: "200px",
          textAlign: "center",
          transitionDuration: "400ms",
        }}
      >
        BOX
      </div>
    </div>
  );
};

export default Closure;

// 예제 0
