import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ToggleButton from './components/ToggleButton'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import axios from 'axios'

const App = () => {
  //Login
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)
  //Blogs
  const [blogs, setBlogs] = useState([])
  // const [title, setTitle] = useState([])
  // const [author, setAuthor] = useState([])
  // const [url, setUrl] = useState(null)
  //Message
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState("s") // s = success, f = fail

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(async () => {   //Set user intialy from local storage if user was previosly logged in
    //async () => {
      const loggedInUser = window.localStorage.getItem('currentUser')
      if(loggedInUser) {
        const user = JSON.parse(loggedInUser)
        setUser(user)
        blogService.setToken(user.token)
      }
    //}
  }, [])

  const handleLogin = async (event) => {  //Called by login button
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password }) //Get user returned with valid id from login form

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`${user.name} logged in`)
      window.localStorage.setItem("currentUser", JSON.stringify(user))
    } catch (exception){
      showMessage("Invalid username or password", "f")
    }
  }

  const handleLogout = async (event) => {  //Called by logout button
    event.preventDefault()
    window.localStorage.removeItem("currentUser")
    setUser(null)
  }

  const handleAddBlog = (blogObject) => {  //Called by create button
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  // const handleAddBlog = async (event) => {  //Called by create button
  //   event.preventDefault()

  //   const newBlog = {
  //     title: title,
  //     author: author,
  //     url: url,
  //   }
  //   console.log(user.token)
  //   blogService.create(newBlog).then(returnedBlog => { setBlogs(blogs.concat(returnedBlog))}) //Update blog display
  //   showMessage(`a new blog '${newBlog.title}' by ${newBlog.author} added`, "s")
  //   setTitle("")
  //   setAuthor("")
  //   setUrl("")
  // }

  const showMessage = (message, type) => {  //Show message to user - type: s = success, f = fail
    setMessage(message)
    setMessageType(type)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  // const loginForm = () => (  //Show only when user is not logged in
  //     <form onSubmit={handleLogin}>
  //       <div>username <input type='text' value={username} name={"username"} onChange={({ target }) => setUsername(target.value)}/></div>
  //       <div>password <input type='text' value={password} name={"password"} onChange={({ target }) => setPassword(target.value)}/></div>
  //       <button type="submit">login</button>
  //     </form>
  // )

  const blogForm = () => {  //Show only when user is not logged in
    return (
      <form onSubmit={handleAddBlog}>
        <div>title: <input type='text' value={title} name={"title"} onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author: <input type='text' value={author} name={"author"} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url: <input type='text' value={url} name={"url"} onChange={({ target }) => setUrl(target.value)}/></div>
        <button type="submit">create</button>
      </form>
    )
  }

  const MessageBar = ({message, type}) => {  //Show user messages - type: s = success, f = fail
    let messageTypeClass = ""
    if(type === "s") { messageTypeClass = "message-success-div" }
    else if(type === "f") { messageTypeClass = "message-fail-div" }

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
          <div>username <input type='text' value={username} name={"username"} onChange={({ target }) => setUsername(target.value)}/></div>
          <div>password <input type='text' value={password} name={"password"} onChange={({ target }) => setPassword(target.value)}/></div>
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
        <ToggleButton buttonLabel="new blog">
          <BlogForm onSubmit={handleAddBlog} createBlogFunction={handleAddBlog}></BlogForm>
        </ToggleButton>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App