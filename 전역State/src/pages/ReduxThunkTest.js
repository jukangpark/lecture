import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxThunk from "redux-thunk";

const initialState = {
  pending: false,
  error: false,
  payload: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "PENDING":
      return {
        ...state,
        pending: true,
      };
    case "ERROR":
      return {
        ...state,
        pending: false,
        error: true,
      };
    case "FETCHED":
      return {
        ...state,
        pending: false,
        error: false,
        payload: action,
      };
    default:
      return state;
  }
};
// npm i redux-thunk
const store = createStore(reducer, applyMiddleware(ReduxThunk));

const fetchData = () => async (dispatch) => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (res) => res.json()
    ); // 성공
    dispatch({ type: "FETCHED", payload: data }); // 성공
  } catch (e) {
    dispatch({ type: "ERROR" }); // 실패
  }
};

const ReduxThunkTest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <Provider store={store}>
      <div>
        <h1>ReduxThunkTest</h1>
        <p>리덕스 썽크 테스트</p>
      </div>
    </Provider>
  );
};

export default ReduxThunkTest;

// 여기 부분 에러 터짐 ReduxThunkTest 부분 부터
// Redux-thunk 을 사용하여 비동기 처리 하는 부분 다시 공부하기
