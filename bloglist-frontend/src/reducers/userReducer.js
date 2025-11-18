import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      window.localStorage.setItem("currentUser", JSON.stringify(user));
      return action.payload;
    },
    clearUser(state, action) {
      window.localStorage.removeItem("currentUser");
      return null;
    },
  },
});

const { setUser, clearUser } = userSlice.actions;

export const doUpdateUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export const doClearUser = () => {
  return async (dispatch) => {
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
