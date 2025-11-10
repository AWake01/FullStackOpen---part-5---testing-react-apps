import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: { message: "", type: "" },
  reducers: {
    setMessage(state, action) {
      return action.payload;
    },

    clearMessage(state, action) {
      return "";
    },
  },
});

export const { setMessage, clearMessage } = messageSlice.actions;

export const doShowMessage = (message, type) => {
  return async (dispatch) => {
    await dispatch(setMessage({ message, type }));
    setTimeout(() => {
      dispatch(clearMessage());
    }, 5000);
  };
};

export default messageSlice.reducer;
