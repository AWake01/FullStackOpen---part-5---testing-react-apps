import { useState, useImperativeHandle } from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, deleteBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default BlogList;
