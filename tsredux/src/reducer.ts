interface IAction {
  type: string;
}

export interface IState {
  name: string;
  age: number;
}

const initialState = {
  name: "asdf",
  age: 9,
};

// 리듀서
function reducer(state = initialState, action: IAction) {
  switch (action.type) {
    case "INCREASE":
      return { ...state, age: state.age + 1 };
    case "DECREASE":
      return { ...state, age: -1 };
    default:
      return state;
  }
}

export default reducer;
