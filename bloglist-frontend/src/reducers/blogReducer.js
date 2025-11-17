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

    likeBlog(state, action) {
      const updatedBlog = action.payload;

      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog,
      );
    },

    deleteBlog(state, action) {
      const id = action.payload;

      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { setBlogs, addBlog, likeBlog, deleteBlog } = blogSlice.actions;

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

export const doAddLike = (blogObject) => {
  const id = blogObject.id;
  console.log("object ", blogObject);
  return async (dispatch) => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 };
    blogService.put(updatedBlog);
    dispatch(likeBlog(updatedBlog));
  };
};

export const doDeleteBlog = (blogObject) => {
  const id = blogObject.id;
  return async (dispatch) => {
    blogService.deleteBlog(blogObject);
    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
