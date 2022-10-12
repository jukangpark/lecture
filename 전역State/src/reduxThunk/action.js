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

// 실제로, redux-thunk의 코드는 아래와 유사합니다.
// 그냥 추가 기능을 위하여 몇 줄이 조금 더 추가됐을 뿐이죠. 코드를 열어보시면 겨우 14줄밖에 안됩니다. 그런데 그런 라이브러리가 Weekly 다운로드 수가 140만대이죠.
export const thunk = (store) => (next) => (action) => {
  typeof action == "function"
    ? action(store.dispatch, store.getState) // 일반 액션 생성자 함수는 할 수 없는 역할을 redux-thunk 에서는 가능하게한다. 전달 받은 인자가 'function' 이라면, action 에 인자로 dispatch 넘겨줌.
    : next(action);
};

// 액션 타입
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";

// 액션 생성 함수
const increase = () => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });

// getState를 쓰지 않는다면 굳이 파라미터로 받아올 필요 없습니다.
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(increase()), 1000);
};
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => dispatch(decrease()), 1000);
};

// 리듀서가 액션을 처리하기전에,
// 미들웨어가 할 수있는 작업들은 여러가지가 있는데요.
// 단순히 전달받은 액션을 콘솔에 기록을 할 수도 있고,
// 전달받은 액션에 기반하여 액션을 아예 취소시켜버리거나,
// 다른 종류의 액션들을 추가적으로 디스패치 할 수도 있습니다.
