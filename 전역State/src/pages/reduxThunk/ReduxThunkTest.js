import { useDispatch, useSelector } from "react-redux";
import { decreaseAsync, increaseAsync } from "../../reduxThunk/action";

// redux-thunk 란 무엇인가?
// 우선 thunk 란 무엇인가? -> let x = 1 + 1; // 즉시 답이 나오는 식(코드)
// const x = () => 1 + 1; // 답이 즉시 나오는 것이 아닌, x() 해야 나오는 이 함수를 thunk 라고 합니다.
// thunk 란 특정 식을 함수로 래핑에 작업을 '지연'시키는 것이다.

// thunk 는 think 의 대 과거형을 '유머러스'하게 표현한 것이다.
// 원래 think 의 대과거형은 thought 인데, thunk 라고 표현한것임.
// 프로그래밍에서 thunk 의 의미는 -> 특정 식을 함수로 감싸서 작업을 '지연'시키는 것을 의미한다.

// 그렇다면 redux-thunk 란 무엇인가?
// redux-thunk 는 리덕스에서 비동기 작업을 처리할 때, 가장 많이 사용되는 미들웨어임.
// 이 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있음.
// 함수를 dispatch 할 때는, 해당 함수에서 dispatch 와 getState 를 매개변수로 받아주어야합니다.

// 미들웨어는 dispatch 함수를 결합해서 새 dispatch 함수를 반환하는 "고차함수"이다.
// 이들은 비동기 action 을 action 으로 전환한다.
// action 을 로깅하거나, 라우팅 같은 부수 효과를 일으키거나,
// 비동기 API 호출을 일련의 동기 action 으로 바꾸는데 유용하다.

// redux-thunk 의 작동 원리는 간단합니다.
// redux-thunk 미들웨어에서, 전달받은 액션이
// 1. 함수 형태 일때,
// 그 함수에 dispatch 와 getState 를 넣어서 실행해줍니다.
// 실제로, redux-thunk 의 코드는 정말로 간단합니다.

const ReduxThunkTest = () => {
  const number = useSelector((state) => state);

  const dispatch = useDispatch();
  // increaseAsync와 decreaseAsync라는 thunk 함수를 만들었습니다. 이제 컨테이너 컴포넌트를 다음과 같이 수정해보세요.

  const onIncrease = () => {
    dispatch(increaseAsync());
  };

  const onDecrease = () => {
    dispatch(decreaseAsync());
  };

  return (
    <div>
      <h1>redux-thunk 란 무엇인가?</h1>
      <h3>우선 thunk 란 무엇인가?</h3>
      <h3>
        미들웨어란? dispatch 함수를 결합해서 새 dispatch 함수를 반환하는
        '고차함수' (Higher Order Function) 이다.
      </h3>
      <div>현재 state는 : {number}</div>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

export default ReduxThunkTest;

// 여기 부분 에러 터짐 ReduxThunkTest 부분 부터
// Redux-thunk 을 사용하여 비동기 처리 하는 부분 다시 공부하기
