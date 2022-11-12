interface IAction {
  type: string;
}

const initialState = 0;

// 리듀서
function counter(state = initialState, action: IAction) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    default:
      return state;
  }
}

export default counter;
