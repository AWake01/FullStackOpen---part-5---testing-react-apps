import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import ToggleButton from "./components/ToggleButton";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import MessageBar from "./components/MessageBar";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import axios from "axios";
//import { jwtDecode } from "jwt-decode";
//import jwt from "jsonwebtoken"

import { useDispatch, useSelector } from "react-redux";
import { doShowMessage } from "./reducers/messageReducer";

const App = () => {
  //Login
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [user, setUser] = useState(null);
  //Blogs
  const [blogs, setBlogs] = useState([]);
  const blogFormRef = useRef();
  // const [title, setTitle] = useState([])
  // const [author, setAuthor] = useState([])
  // const [url, setUrl] = useState(null)
  //Message
  //const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("s"); // s = success, f = fail

  const dispatch = useDispatch()
  //const message = useSelector(state => state.messages)
  //console.log(message)

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(async () => {
    //Set user intialy from local storage if user was previosly logged in and token is still valid
    //async () => {
    const loggedInUser = window.localStorage.getItem("currentUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
      if(tokenHasTimedOut()) {  //Check if token has expired and logout
        //console.log("Token expired")
        showMessage("Saved login token has expired", "f")
        window.localStorage.clear()
        setUser(null)
      } else {
      }
    }
  }, []);

  const getAllBlogs = async (event) => {
    //Called by logout button
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  };

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

  const handleLogin = async (event) => {
    //Called by login button
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password }); //Get user returned with valid id from login form
      blogService.setToken(user.token);
      console.log(user)
      setUser(user);
      setUsername("");
      setPassword("");
      console.log(`${user.name} logged in`);
      window.localStorage.setItem("currentUser", JSON.stringify(user));
    } catch (exception) {
      showMessage("Invalid username or password", "f")
    }
  };

  const handleLogout = async (event) => {
    //Called by logout button
    event.preventDefault();
    window.localStorage.removeItem("currentUser");
    setUser(null);
  };

  const handleAddBlog = (blogObject) => {
    //Called by create button
    blogService.create(blogObject).then((returnedBlog) => {
      getAllBlogs();
      blogFormRef.current.toggleVisibility();
      console.log(returnedBlog);
      showMessage("New blog added", "s")
    });
  };

  const handleDeleteBlog = (blogObject) => {
    //Called by remove button
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
    ) {
      console.log("clicked remove");

      blogService.deleteBlog(blogObject).then((returnedBlog) => {
        getAllBlogs();
      });
    }
  };

  const showMessage = (message, type) => {  //Show message to user - type: s = success, f = fail
    dispatch(doShowMessage(message, type))
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <MessageBar/>
        <form onSubmit={handleLogin}>
          <div>
            <label for="username">
              username{" "}
              <input
                type="text"
                value={username}
                name={"username"}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label for="password">
              password{" "}
              <input
                type="password"
                value={password}
                name={"password"}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {/* <MessageBar message={message} type={messageType} /> */}
        <MessageBar/>
        <div>
          <label>{`${user.name} has logged in `}</label>
          <button type="submit" onClick={handleLogout}>
            log out
          </button>
        </div>
        <br />
        <ToggleButton
          buttonLabel1="new blog"
          buttonLabel2="cancel"
          ref={blogFormRef}
        >
          <BlogForm
            onSubmit={handleAddBlog}
            createBlogFunction={handleAddBlog}
          ></BlogForm>
        </ToggleButton>
        <br />
        <BlogList blogs={blogs} deleteBlog={handleDeleteBlog}></BlogList>
      </div>
    );
  }
};

export default App;
