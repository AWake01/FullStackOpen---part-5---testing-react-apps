import { useState, useImperativeHandle  } from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, deleteBlog, likeBlog }) => {


  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} likeBlog={likeBlog} />
      )}
    </div>
  )
}

export default BlogList