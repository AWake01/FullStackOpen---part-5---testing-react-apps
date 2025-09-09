import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import ToggleButton from './components/ToggleButton'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import axios from 'axios'
//import { jwtDecode } from "jwt-decode";
//import jwt from "jsonwebtoken"

const App = () => {
  //Login
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  //Blogs
  const [blogs, setBlogs] = useState([])
  const { blogsOpen, setBlogsOpen } = useState(0)
  const blogFormRef = useRef()
  // const [title, setTitle] = useState([])
  // const [author, setAuthor] = useState([])
  // const [url, setUrl] = useState(null)
  //Message
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('s') // s = success, f = fail

  useEffect(() => {
    getAllBlogs()
  }, [] )

  useEffect(async () => {   //Set user intialy from local storage if user was previosly logged in and token is still valid
    //async () => {
    const loggedInUser = window.localStorage.getItem('currentUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
      // if(tokenHasTimedOut()) {  //Check if token has expired and logout
      //   //console.log("Token expired")
      //   showMessage("Saved login token has expired", "f")
      //   window.localStorage.clear()
      //   setUser(null)
      // } else {
      //}
    }
  }, [])

  const getAllBlogs = async (event) => {  //Called by logout button
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }

  // const tokenHasTimedOut = async (event) => {  //Check token has not expired: https://stackoverflow.com/questions/46418975/react-how-to-check-if-jwt-is-valid-before-sending-a-post-request
  //   const user = JSON.parse(window.localStorage.getItem('currentUser'))
  //   const token = user.token
  //   console.log(token)
  //   const decodedToken = jwt.decode(token)
  //   //console.log("Decoded Token", decodedToken);
  //   const currentDate = new Date()
  //   //JWT expiry is in seconds
  //   console.log(decodedToken)
  //   console.log(decodedToken.exp, currentDate.getTime())
  //   if(decodedToken.exp * 1000 < currentDate.getTime()) {
  //     console.log('Token expired')
  //     return true
  //   }
  //   else {
  //     console.log('Token valid')
  //     return false
  //   }
  // }

  const handleLogin = async (event) => {  //Called by login button
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password }) //Get user returned with valid id from login form
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`${user.name} logged in`)
      window.localStorage.setItem('currentUser', JSON.stringify(user))
    } catch (exception){
      showMessage('Invalid username or password', 'f')
    }
  }

  const handleLogout = async (event) => {  //Called by logout button
    event.preventDefault()
    window.localStorage.removeItem('currentUser')
    setUser(null)
  }

  const handleAddBlog = (blogObject) => {  //Called by create button
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // if(returnedBlog.error) {
        //   showMessage(`Session expired`, "f")
        // } else {
        //setBlogs(blogs.concat(returnedBlog))
        getAllBlogs()
        blogFormRef.current.toggleVisibility()
        console.log(returnedBlog)
        showMessage('New blog added', 'p')
      })
  }

  const handleDeleteBlog = (blogObject) => {  //Called by remove button
    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`))
    {
      console.log('clicked remove')

      blogService
        .deleteBlog(blogObject)
        .then(returnedBlog => {
          getAllBlogs()
        })
    }
  }

  const handleAddLike = (blogObject) => {  //Called by like button
    const newBlog = blogObject
    newBlog.likes += 1

    blogService
      .put(newBlog)
      .then(returnedBlog => {
        console.log('Likes: ', returnedBlog.title, ' ', returnedBlog.author, ' ', returnedBlog.likes)
        getAllBlogs()
      })
  }

  const showMessage = (message, type) => {  //Show message to user - type: s = success, f = fail
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const MessageBar = ({ message, type }) => {  //Show user messages - type: s = success, f = fail
    let messageTypeClass = ''
    if(type === 's') { messageTypeClass = 'message-success-div' }
    else if(type === 'f') { messageTypeClass = 'message-fail-div' }

    if(message) {
      return (
        <div className={messageTypeClass}>
          <h3 className="message-h3">{message}</h3>
        </div>
      )
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <MessageBar message={message} type={messageType}/>
        <form onSubmit={handleLogin}>
          <div>username <input type='text' value={username} name={'username'} onChange={({ target }) => setUsername(target.value)}/></div>
          <div>password <input type='text' value={password} name={'password'} onChange={({ target }) => setPassword(target.value)}/></div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <MessageBar message={message} type={messageType}/>
        <div><label>{`${user.name} has logged in `}</label><input type='button' value="log out" onClick={handleLogout}/></div>
        <br/>
        <ToggleButton buttonLabel1="new blog" buttonLabel2="cancel" ref={blogFormRef}>
          <BlogForm addBlogFunction={handleAddBlog}></BlogForm>
        </ToggleButton>
        <br/>
        <BlogList blogs={blogs} deleteBlog={handleDeleteBlog} likeBlog={handleAddLike}></BlogList>
      </div>
    )
  }
}

export default App