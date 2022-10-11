import { useReducer } from "react";

const initialState = 0;

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      throw new Error();
  }
}

// useReducer 란 useState 의 대체 함수이다.
// (state, action) => newState 의 형태로 reducer 를 받고
// dispatch 메서드와 짝의 형태로 현재 state 를 반환합니다.

export default function ReducerTest() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1>state: {state}</h1>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
