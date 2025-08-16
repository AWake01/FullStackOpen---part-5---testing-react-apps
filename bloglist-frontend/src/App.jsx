import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //Login
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {   //Set user intialy from local storage if user was previosly logged in
    const loggedInUser = window.localStorage.getItem('currentUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {  //Called by login button
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password }) //Get user returned with valid id from login form

      setUser(user)
      setUsername('')
      setPassword('')
      console.log(`${user.name} logged in`)
      window.localStorage.setItem("currentUser", JSON.stringify(user))
    } catch (exception){
      console.log("Wrong credidentials")
      //TODO: add notification and timer
    }
  }

  const handleLogout = async (event) => {  //Called by logout button
    event.preventDefault()
    window.localStorage.removeItem("currentUser")
    setUser(null)
  }

  const loginForm = () => (  //Show only when user is not logged in
      <form onSubmit={handleLogin}>
        <div>username <input type='text' value={username} name={"username"} onChange={({ target }) => setUsername(target.value)}/></div>
        <div>password <input type='text' value={password} name={"password"} onChange={({ target }) => setPassword(target.value)}/></div>
        <button type="submit">login</button>
      </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>blogs</h2>
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
        <div><label>{`${user.name} has logged in `}</label><input type='button' value="log out" onClick={handleLogout}/></div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App