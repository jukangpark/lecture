// import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "../reduxThunk/action";

const initialState = {
  payload: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, payload: action.payload };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

const ReduxAsyncTest = () => {
  // react-redux 만 사용해서는 비동기 처리가 불가능합니다.

  const fetchData = async (dispatch) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    return {
      type: "FETCH_DATA",
      payload: data,
    };
  };

  const dispatch = useDispatch();

  // 위의 형태로 작성해주면 promise 를 리턴하기 때문에, 우리가 원하는 대로 동작하지 않는다.
  // 따라서

  const handleClick = () => {
    dispatch(fetchData());
    // 이런식으로 fetchData() 를 호출하게 되면 async () 함수가 리턴하는 것은 Promise 이기 때문에
    // plain objects 가 아니라면서 에러가 뜸.
    // 그래서 redux-thunk 같은 걸 사용하라고 뜸.
  };

  return (
    <Provider store={store}>
      <div>
        <h1>Redux Thunk Test</h1>
        <h3>리덕스만 가지구 비동기 로직을 처리하려고 하면?</h3>
        <button onClick={handleClick}>
          리덕스 만을 사용해서 비동기 api 통신하기
        </button>
      </div>
    </Provider>
  );
};

export default ReduxAsyncTest;
