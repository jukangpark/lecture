import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import fetchDataSlice from "./fetchDataSlice";
import buttonSlice from "./buttonSlice";

// 관리할 slice

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    fetchData: fetchDataSlice.reducer,
    button: buttonSlice.reducer,
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
    

    기존에 createStore 와 달리, 여러 개의 인자 대신에 이름이 지정된 하나의 object를 받습니다!
    그래서 reducer 를 넘겨줍니다!
    Slice 를 만들어줘서 action, reducer 을 동시에 써줍니다!


*/
