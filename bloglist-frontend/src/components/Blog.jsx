import ToggleButton from './ToggleButton'
import blogService from '../services/blogs'
import { useState, useEffect, useRef } from 'react'

const blogStyle = { 
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  margin: 5,
  gap: 5,

  // display: "flex",
  // alignItems: "center"
}

const lineStyle = { 
  margin: 0,
  paddingTop: 0,
  paddingBottom: 0,
  
  gap: 10,
}

const buttonLineStyle = { 
  margin: 0,
  paddingTop: 0,
  paddingBottom: 0,
  gap: 10,
  display: "flex",
  alignItems: "center"
}

const Blog = ({ blog }) => {
  const blogFormRef = useRef()
  const [isActive, setIsActive] = useState(false) //Passed to child and set. Used to show full/summary details
  
  return (
    <div style={blogStyle}>
      <div style={buttonLineStyle}>
        <u>{blog.title}</u>
        <i>{blog.author}</i>
        <ToggleButton buttonLabel1="view" buttonLabel2="hide" ref={blogFormRef} setIsActive={setIsActive}></ToggleButton>
      </div> 
      {isActive ? <BlogDetailed blog={blog}/> : null}
    </div>
  )
}

const BlogDetailed = ({ blog}) => {
  const blogFormRef = useRef()
  const [likes, setLikes] = useState(blog.likes)

  const handleAddLike = (blogObject) => {  //Called by like button
    const newBlog = blogObject
    newBlog.likes += 1

    blogService
      .put(newBlog)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })
}
  //stopPropagation() prevents parent 'view' button firing 'like' onClick function (event bubbling)
  return (
    <div>
      <a style={lineStyle} href={blog.url}>{blog.url}</a>
      <div style={buttonLineStyle}>likes {likes}<button onClick={(e) => { e.stopPropagation();handleAddLike(blog) }}>Like</button></div>  
      {blog.user ? <i style={lineStyle}>{blog.user.username}</i> : null}  
    </div>  
  )
}

export default Blog