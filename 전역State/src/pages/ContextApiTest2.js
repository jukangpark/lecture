import { createContext, useContext, useReducer } from "react";

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

const countReducer = (state, action) => {
  switch (action.type) {
    case INCREASE: {
      return state + 1;
    }
    case DECREASE: {
      return state - 1;
    }
    default:
      return state;
  }
};

const ParentStateContext = createContext();
const ParentDispatchContext = createContext();

const ContextApiTest2 = () => {
  const [count, dispatch] = useReducer(countReducer, 0); // 지역 state

  // useReducer 는 state, dispatch 를 리턴해줌.

  return (
    <div>
      <div>Parent Count:{count}</div>
      <ParentStateContext.Provider value={count}>
        <ParentDispatchContext.Provider value={dispatch}>
          <Child />
        </ParentDispatchContext.Provider>
      </ParentStateContext.Provider>
    </div>
  );
};

const Child = () => {
  const count = useContext(ParentStateContext);
  const dispatch = useContext(ParentDispatchContext);

  const onIncrease = () => {
    dispatch({ type: INCREASE });
    // action을 보낼 때는 dispatch를 사용해야함
  };

  const onDecrease = () => {
    dispatch({ type: DECREASE });
    // action을 보낼 때는 dispatch를 사용해야함
  };

  return (
    <div>
      <div>Child Count:{count}</div>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
    </div>
  );
};

export default ContextApiTest2;
