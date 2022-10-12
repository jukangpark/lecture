import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;

// store는 저장소라고 생각하시면 이해하기 쉽습니다.
// 그 저장소 내부에는 여러 개의 slice들로 이루어져 있습니다.
/*
    먼저 store에 대해 설명드리자면 
    configureStore를 통해 store를 만들어주었습니다.
    configureStore의 역할은 여러 개의 slice들을 모아주는 역할이라고 보면 이해하기 쉽습니다.
    내부 reducer에 s를 붙이지 않게 주의합니다.
    타입스크립트를 사용 중이기에 RootState, AppDispatch를 만들어주었습니다.

*/
