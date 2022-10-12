import { createSlice } from "@reduxjs/toolkit";

// createSlice 란? = createAction + createReducer 와 비슷하다.

// 기존의 Redux 만 사용했을 때는

const counterSlice = createSlice({
  name: "reducerName",
  initialState: [],
  reducers: {
    increase(state, payload) {
      return state + 1;
      // logic
    },
    decrease(state, payload) {
      return state - 1;
      //logic
    },
  },
});

export default counterSlice;
