import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: { message: "", type: "" },
  reducers: {
    getBlogs(state, action) {
      return action.payload;
    },

    addBlog(state, action) {
      return "";
    },
  },
});

export const { setMessage, clearMessage } = blogSlice.actions;

// export const doShowMessage = (message, type) => {
//   return async (dispatch) => {
//     await dispatch(setMessage({ message, type }));
//     setTimeout(() => {
//       dispatch(clearMessage());
//     }, 5000);
//   };
// };

export default blogSlice.reducer;
