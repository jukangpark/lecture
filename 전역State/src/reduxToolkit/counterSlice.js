import { createSlice } from "@reduxjs/toolkit";

// createSlice 란? = createAction + createReducer 와 비슷하다. 액션 + 리듀서
// redux-toolkit 의 createSlice 는 Immer.js 가 내장되어 있어서, 불변성을 유지하기 위해 추가 코드를 작성하지 않아도 된다.

// 기존의 Redux 만 사용했을 때는

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment(state, payload) {
      return state + 1;
      // logic
    },
    decrement(state, payload) {
      return state - 1;
      //logic
    },
  },
});

export default counterSlice;

// function createSlice({
//   // A name, used in action types
//   name: string,
//   // The initial state for the reducer
//   initialState: any,
//   // An object of "case reducers". Key names will be used to generate actions.
//   reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>
//   // A "builder callback" function used to add more reducers, or
//   // an additional object of "case reducers", where the keys should be other
//   // action types
//   extraReducers?:
//   | Object<string, ReducerFunction>
//   | ((builder: ActionReducerMapBuilder<State>) => void)
// })

// action = increment(3);
