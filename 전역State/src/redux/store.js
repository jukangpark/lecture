import { applyMiddleware, combineReducers, createStore } from "redux";
import buttonReducer from "./buttonReducer";
import rootReducer from "./rootReducer";

// createStore 는 첫번째 인자로 reducer 를 받는다.
/* 
    스토어 안에는, 
    현재의 앱 상태와, 
    리듀서가 들어가 있고, 
    추가적으로 몇가지의 내장함수들이 있다. 
*/

// 리덕스 미들웨어를 직접 만들어 봅시다.
// 첫 번째 store 는 리덕스 store 의 인스턴스 입니다.
// 두 번째 next 는 액션을 다음 미들웨어에게 전달하는 함수입니다.
// next(action) 이런 형태로 사용합니다. 만약 다음 미들웨어가 없다면 리듀서에게 액션을 전달해줍니다.
// 만약에 next 를 호출하지 않게 된다면 액션이 무시처리되어 리듀서에게로 전달되지 않습니다.
// 세 번째 action 은 현재 처리하고 있는 액션 객체입니다.

// --- 우리가 직접 만들어본 리덕스 미들웨어 ----

// const myLogger = (store) => (next) => (action) => {
//   console.log(action); // 먼저 액션을 출력합니다.
//   console.log("\tPrev", store.getState());
//   const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션을 전달합니다.
//   console.log("\tNext", store.getState());
//   return result; // 여기서 반환하는 값은 dispatch(action) 의 결과물이 됩니다. 기본 : undefined
// };

// const store = createStore(rootReducer, applyMiddleware(myLogger));

// const store = createStore(rootReducer); // 한개의 리듀서

const reducer = combineReducers({
  rootReducer,
  buttonReducer,
});

const store = createStore(reducer); // 두개의 리듀서

export default store;

// store 에 있는 state 를 사용하기 위해서는
// index.js 파일에서 Provider(공급자) 를 통해 store 를 하위 컴포넌트에 넘겨줘야한다.
