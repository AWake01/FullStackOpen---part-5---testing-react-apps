import { useState, useImperativeHandle } from "react";
import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
//import { getBlogs } from "../reducers/blogReducer";

const BlogList = ({ deleteBlog }) => {
  const dispatch = useDispatch()
  const curBlogs = useSelector(state => state.blogs)
  console.log(curBlogs)
  // //const curBlogs = dispatch(getBlogs())

  return (
    <div>
      {curBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default BlogList;
