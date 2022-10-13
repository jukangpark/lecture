import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fetchData";

// createSlice 란? = createAction + createReducer 와 비슷하다. 액션 + 리듀서

const inititalState = {
  isError: false,
  isLoading: false,
  list: [],
};

// createAsyncThunk 의
// 첫번째 인자로 들어가는 값(string : "fetchData")에 따라,
// pending, fulfilled, rejected 가 붙은 '액션 타입'이 생성된다.

// fetchData -> createAsyncThunk 함수가 리턴하는건 thunk action creator 이다.

console.log(fetchData);
/* actionCreator(arg) {
    return function (dispatch, getState, extra) {
      var requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
      var abortCon…
 */

const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState: inititalState,
  extraReducers: {
    [fetchData.pending]: (state, action) => {
      console.log(action);
      console.log("pending");
    },
    [fetchData.fulfilled]: (state, action) => {
      console.log(action);
      state.list = action.payload; // redux-toolkit 에는 immer 가 내장되어있기 때문에 불변성 안지켜도됨.
      console.log("fulfilled");
    },
    [fetchData.rejected]: (state, action) => {
      console.log(action);
      console.log("rejected");
    },
  },
  //   extraReducers: {
  //     ["fetchData/pending"]: (state, action) => {
  //       console.log("pending");
  //     },
  //     ["fetchData/fulfilled"]: (state, action) => {
  //       state.list = action.payload;
  //       console.log("fulfilled");
  //     },
  //     ["fetchData/rejected"]: (state, action) => {
  //       console.log("rejected");
  //     },
  //   },
});

// createAsyncThunk 는 thunk action creator 를 반환한다.
// 위의 경우를 예로 들면, 다음 3가지 thunk action creator 가 반환된다.
// fetchData.pending "fetchData/pending" "액션을 디스패치" 하는 thunk action creator
// fetchData.fulfilled "fetchData/fulfilled" "액션을 디스패치" 하는 thunk action creator
// fetchData.rejected "fetchData/rejected" "액션을 디스패치" 하는 thunk action creator

// createSlice 의 extraReducers 함수를 이용해서,
// fetchData 에 각 상황에 대한 리듀서를 추가해주어야 한다.

export default fetchDataSlice;

/* 

    이 액션들이 디스패치되면, thunk는 아래 과정을 실행한다.
    pending 액션을 디스패치한다.
    payloadCreator 콜백을 호출하고 프로미스가 반환되기를 기다린다.
    프로미스가 반환되면, 프로미스의 상태에 따라 다음 행동을 실행한다.
    프로미스가 이행된 상태라면, action.payload를 fulfilled 액션에 담아 디스패치한다.
    프로미스가 거부된 상태라면, rejected 액션을 디스패치하되 rejectedValue(value) 함수의 반환값에 따라 액션에 어떤 값이 넘어올지 결정된다.
    rejectedValue가 값을 반환하면, action.payload를 reject 액션에 담는다.
    rejectedValue가 없거나 값을 반환하지 않았다면, action.error 값처럼 오류의 직렬화된 버전을 reject 액션에 담는다.
    디스패치된 액션이 어떤 액션인지에 상관없이, 항상 최종적으로 디스패치된 액션을 담고 있는 이행된 프로미스를 반환한다

*/
