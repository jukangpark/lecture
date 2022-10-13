import { createSlice } from "@reduxjs/toolkit";

const buttonSlice = createSlice({
  name: "button",
  // A name, used in action types
  initialState: { alarm: false, rack: false },
  reducers: {
    click(state, action) {
      //   console.log(action.payload);
      if (action.payload === "alarm") {
        return { ...state, alarm: !state.alarm };
      } else return { ...state, rack: !state.rack };
    },
  },
});

export default buttonSlice;
