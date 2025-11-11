import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },

    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const doInitilizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const doAddBlog = (newBlog) => {
  return async (dispatch) => {
    await blogService.create(newBlog);
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
