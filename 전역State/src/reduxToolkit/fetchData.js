import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("fetchData", async (param) => {
  // createAsyncThunk 의
  // 첫번째 인자로 들어가는 값(string)에 따라,
  // pending, fulfilled, rejected 가 붙은 '액션 타입'이 생성된다.

  // 두번째 인자: payloadCreator callback : 비동기 로직의 결과를 포함하고 있는 Promise 를 반환하는 비동기 함수
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data);
  return data;

  // 세 번째 인자 :추가 옵션을 설정할 수 있다.
  // condition(arg, {getState, extra }) : boolean (비동기 로직 실행 전에 취소하거나, 실행 도중에 취소할 수 있다.)
  // dispatchConditionRejection : boolean (true면, condition() 이 false를 반환할 때 액션 자체를 디스패치 하지 않도록 한다.)
  // idGenerator(): string (requestId 를 만들어준다. 같은 requestId 일 경우 요청하지 않는 등의 기능을 사용할 수 있게 된다.)
});

/* 
    createAsyncThunk 는 thunk action creator 를 반환한다.
    위의 경우를 예로 들면, 다음 3가지 thunk action creator 가 반환된다.
    fetchData.pending "fetchData/pending" 액션을 디스패치 하는 thunk action creator
    fetchData.fulfilled "fetchData/fulfilled" 액션을 디스패치 하는 thunk action creator
    fetchData.rejected "fetchData/rejected" 액션을 디스패치 하는 thunk action creator

*/

/*
    Redux-Toolkit 에는 내부적으로 thunk 를 내장하고 있어서, 다른 미들웨어를 사용하지 않고도 비동기 처리를 할 수 있음.
    Redux-toolkit 의 비동기 처리 기능을 사용하지 않고 컴포넌트 내부의 useEffect() 에서 API 를 호출하는 것도 가능하다.
    다만, Redux-toolkit 의 비동기 기능을 사용하면, 컴포넌트 외부에서 비동기 처리를 할 수 있기 때문에 관심사 분리가 가능하다는 장점이 있다.
    createAsyncThunk 와 createSlice 를 사용하여 Redux Toolkit 만으로 비동기 처리를 쉽게 할 수 있으며, 
    redux-saga 에서만 사용할 수 있던 기능(이미 호출한 API 요청 취소하기 등) 까지 사용할 수 있다.

    createAsyncThunk
    액션 타입 문자열, promise 를 반환하는 비동기 함수, 추가 옵션 순서대로 인자를 받는 함수
    입력받은 액션 타입 문자열을 기반으로 프로미스 라이프사이클 액션 타입을 생성하고,
    thunk action creator 를 반환한다.

    thunk action creator
    프로미스 콜백을 실행하고 프로미스를 기반으로 라이프사이클 액션을 디스패치 한다.
    
    리듀서를 생성해주는 기능은 없기 때문에 액션들을 처리할 로직을 직접 작성해야 한다.
*/
