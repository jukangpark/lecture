import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../reduxToolkit/action";
import { fetchData } from "../../reduxToolkit/fetchData";

const ReduxToolkitTest = () => {
  /*
    초기 설정이 간편해졌습니다. 
    기존 redux는 리덕스 스토어를 구성하는 것은 너무 복잡하였지만, 툴킷에서는 좀 더 간편화되었습니다.
    더이상 다양한 패키지들를 설치 하지 않아도 됩니다. 리덕스를 사용하면 redux devtool, immer, thunk 등 여러가지 라이브러리를 추가적으로 설치해야 하지만, redux-toolkit 내부에 이미 설치가 되어 있기에 굳이 설치 할 필요가 없습니다.
    반복되는 코드가 너무 많아 코드가 복잡해지고 실수를 많이 유발했지만 이러한 부분이 많이 개선되었습니다.
    툴킷에서는 더이상 불변성을 신경쓰지 않아도 됩니다.

    npm install @reduxjs/toolkit
   */

  const counter = useSelector((state) => state.counter);
  const data = useSelector((state) => state.fetchData.list);

  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increment());
  };

  const onDecrease = () => {
    dispatch(decrement());
  };

  useEffect(() => {
    dispatch(fetchData({ name: "주강" }));
    // fetchData() 를 호출할 때 인자로 어떤 객체를 넘기게 되면, 해당 객체는 action.meta.arg 로 들어가게된다.
    console.log(data); // 여기서 빈 배열이 찍힘.
  }, []);

  return (
    <div>
      <h1>Redux-Toolkit 페이지입니다.</h1>
      <h3>Redux 만 사용했을 때의 문제점</h3>
      <ul>
        <li>1. 저장소 구성의 복잡성</li>
        <li>1. 많은 패키지 필요성(의존성)</li>
        <li>1. 한 작업 시 필요한 수 많은 코드양(boilerplate)</li>
      </ul>
      <h3>Redux-toolkit 의 특징</h3>
      <ul>
        <li>
          1. 스토어 설정, 리듀서 생성, 불변성 업데이트 로직 사용을 편리하게
          한다.
        </li>
        <li>
          2. 스토어 설정에 관한 기본 설정 제공, 일반적으로 사용되는 redux addon
          이 내장
        </li>
        <li>
          3. immer 에 영감을 받아 '변경'로직으로 '불변성'로직 작성 가능, state
          전체를 slice 로 자동으로 생성가능 한다.
        </li>
        <li>4. 적은 코드에 많은 작업 수행 가능</li>
      </ul>

      <h3>Redux-toolkit 의 함수</h3>
      <ul>
        <li>configureStore()</li>
        <li>createAction()</li>
        <li>createReducer()</li>
        <li>createSlice()</li>
        <li>createAsyncThunk()</li>
        <li>createSelector()</li>
      </ul>
      <div>{counter}</div>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <div>
        {data?.map((user, index) => (
          <li key={index}>{user.title}</li>
        ))}
      </div>
    </div>
  );
};

export default ReduxToolkitTest;
