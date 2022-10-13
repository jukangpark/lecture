// 기존의 Redux 에서 액션을 정의하는 일반적인 방법은
// 액션 생성 함수와 해당 유형의 액션을 구성하기 위한 액션 생성자 함수를 별도로 선언하는 것이다.

// const INCREMENT = "counter/increment";

// function increment(amount) {
//   return {
//     type: INCREMENT,
//     payload: amount,
//   };
// }

// const action = increment(3);
// {type: "counter/increment", payload: 3}

// redux-toolkit 은 이 createAction 두 선언을 하나로 결합합니다.
// 조치 유형을 취하고 해당 유형에 대한 조치 작성자를 리턴합니다.
// 액션 생성자는 인수 없이 호출되거나 payload 액션에 첨부될 수 있습니다.
// 또한 액션 생성자는 액션 유형이 문자열 표현이 되도록 toString() 을 재정의합니다.

import { createAction } from "@reduxjs/toolkit";

export const increment = createAction("counter/increment");
export const decrement = createAction("counter/decrement");

let action = increment();
// { type: "counter/increment" }

action = increment(3);
// returns { type: "counter/increment", payload: 3}

console.log(increment.toString());
// "counter/increment"

console.log(`The action type is : ${increment}`);
// `The action type is : counter/increment`
