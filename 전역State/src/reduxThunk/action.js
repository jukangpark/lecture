// 일반 액션 생성자는, 파라미터를 가지고, 액션 객체를 생성하는 작업만 합니다.
// 만약에 특정 액션이 몇초 뒤에 실행되게 하거나, 현재 상태에 따라 아예 액션이 무시되게 하려면, 일반 생성자로는 할수 없습니다.

// 그러나 redux-thunk 는 이를 가능하게 합니다.
// -> 쉽게 말해 redux-thunk 는 일반액션생성자 함수의 '날개'라고 보면 됩니다.

// export const increase = () => ({
//   type: "INCREASE",
// });

// export const decrease = () => ({
//   type: "DECREASE",
// });

// redux-thunk 란 무엇인가?
// 우선 thunk 란 무엇인가? -> let x = 1 + 1; // 즉시 답이 나오는 식(코드)
// const x = () => 1 + 1; // 답이 즉시 나오는 것이 아닌, x() 해야 나오는 이 함수를 thunk 라고 합니다.
// thunk 란 특정 식을 함수로 래핑에 작업을 '지연'시키는 것이다.

// thunk 는 think 의 대 과거형을 '유머러스'하게 표현한 것이다.
// 원래 think 의 대과거형은 thought 인데, thunk 라고 표현한것임.
// 프로그래밍에서 thunk 의 의미는 -> 특정 식을 함수로 감싸서 작업을 '지연'시키는 것을 의미한다.

// 그렇다면 redux-thunk 란 무엇인가?
// redux-thunk 는 리덕스에서 비동기 작업을 처리할 때, 가장 많이 사용되는 미들웨어임.
// 이 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있음.
// 함수를 dispatch 할 때는, 해당 함수에서 dispatch 와 getState 를 매개변수로 받아주어야합니다.

// 미들웨어는 dispatch 함수를 결합해서 새 dispatch 함수를 반환하는 "고차함수"이다.
// 이들은 비동기 action 을 action 으로 전환한다.
// action 을 로깅하거나, 라우팅 같은 부수 효과를 일으키거나,
// 비동기 API 호출을 일련의 동기 action 으로 바꾸는데 유용하다.

// redux-thunk 의 작동 원리는 간단합니다.
// redux-thunk 미들웨어에서, 전달받은 액션이
// 1. 함수 형태 일때,
// 그 함수에 dispatch 와 getState 를 넣어서 실행해줍니다.
// 실제로, redux-thunk 의 코드는 정말로 간단합니다.

// function createThunkMiddleware(extraArgument) {
//   return ({ dispatch, getState }) =>
//     (next) =>
//     (action) => {
//       if (typeof action === "function") {
//         return action(dispatch, getState, extraArgument);
//       }

//       return next(action);
//     };
// }

// const thunk = createThunkMiddleware();
// thunk.withExtraArgument = createThunkMiddleware;

const thunk = (store) => (next) => (action) => {
  typeof action == "function"
    ? action(store.dispatch, store.getState)
    : next(action);
};

export default thunk;

// 리듀서가 액션을 처리하기전에,
// 미들웨어가 할 수있는 작업들은 여러가지가 있는데요.
// 단순히 전달받은 액션을 콘솔에 기록을 할 수도 있고,
// 전달받은 액션에 기반하여 액션을 아예 취소시켜버리거나,
// 다른 종류의 액션들을 추가적으로 디스패치 할 수도 있습니다.
