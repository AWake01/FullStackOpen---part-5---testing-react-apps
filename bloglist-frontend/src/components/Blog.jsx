import ToggleButton from './ToggleButton'
import blogService from '../services/blogs'
import { useState, useRef, useCallback } from 'react'

const blogStyle = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  margin: 5,
  gap: 5,

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
}

const blogShort = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  margin: 5,
  gap: 5,

  display: 'flex',
  justifyContent: 'start',
}

const blogFull = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: 'solid',
  borderWidth: 1,
  margin: 5,
  gap: 5,

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',

  position: 'absolute',
  bottom: 0,
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
  display: 'flex',
  alignItems: 'center'
}

const Blog = ({ blog, deleteBlog }) => {
  const blogRef = useRef()
  const [isActive, setIsActive] = useState(false) //Passed to child and set. Used to show full/summary details

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

  const userCanDelete = (blogObject) => {  //Called by like button
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
    if(!blog.user){return false}
    return blogObject.user.id === currentUser.id ? true : false
  }

  const blogDetails = () => {  //Called by like button
    return (
      <div className='blog-details-div'>
        <a style={lineStyle} href={blog.url}>{blog.url}</a>
        <div style={buttonLineStyle}>likes {likes}<button onClick={(e) => { e.stopPropagation();handleAddLike(blog) }}>like</button></div>
        {blog.user ? <i style={lineStyle}>{blog.user.username}</i> : null}
        {console.log('Blog, ', blog)}
        {userCanDelete(blog) ? <div><button onClick={(e) => { e.stopPropagation(); deleteBlog(blog)}}>remove</button></div> : null}
        {/* <div><button onClick={(e) => { e.stopPropagation(); deleteBlog(blog)}}>remove</button></div> */}
      </div>
    )
  }

  const callbackSetIsActive = (value) => {
    setIsActive(value)
  }

  const handleVisible = useCallback(() => {
    console.log('Callback')
    setIsActive(!isActive)
  }, [isActive])

  return (
    <div style={blogStyle} className='blog-div'>
      <div style={buttonLineStyle}>
        <u>{blog.title}</u>
        <i>{blog.author}</i>
        <ToggleButton buttonLabel1="view" buttonLabel2="hide" ref={blogRef} isVisible={isActive} handleVisible={handleVisible}></ToggleButton>
      </div>
      {isActive ? blogDetails() : null}
    </div>
  )
}

const BlogDetailed = ({ blog, deleteBlog }) => {
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

  const userCanDelete = (blogObject) => {  //Called by like button
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
    if(!blog.user){return false}
    return blogObject.user.id === currentUser.id ? true : false
  }

  //stopPropagation() prevents parent 'view' button firing 'like' onClick function (event bubbling)
  return (
    <div className='blog-details-div'>
      <a style={lineStyle} href={blog.url}>{blog.url}</a>
      <div style={buttonLineStyle}>likes {likes}<button onClick={(e) => { e.stopPropagation();handleAddLike(blog) }}>like</button></div>
      {blog.user ? <i style={lineStyle}>{blog.user.username}</i> : null}
      {console.log('Blog, ', blog)}
      {userCanDelete(blog) ? <div><button onClick={(e) => { e.stopPropagation(); deleteBlog(blog)}}>remove</button></div> : null}
      {/* <div><button onClick={(e) => { e.stopPropagation(); deleteBlog(blog)}}>remove</button></div> */}
    </div>
  )
}

export default Blog