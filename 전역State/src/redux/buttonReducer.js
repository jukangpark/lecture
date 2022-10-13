const initialState = {
  Rack: false,
  Alarm: false,
};

const buttonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BUTTON": {
      if (action.payload === "Rack") return { ...state, Rack: !state.Rack };
      else {
        return { ...state, Alarm: !state.Alarm };
      }
    }
    default:
      return state;
  }
};

export default buttonReducer;
// 하나의 리듀서에서 두개의 액션을 처리하기
