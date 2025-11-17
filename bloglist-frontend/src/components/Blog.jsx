import ToggleButton from "./ToggleButton";
import blogService from "../services/blogs";
import { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { doAddLike, doDeleteBlog } from "../reducers/blogReducer";

const blogStyle = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: "solid",
  borderWidth: 1,
  margin: 5,
  gap: 5,

  display: "flex",
  flexDirection: "column",
  alignItems: "start",
};

const blogShort = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: "solid",
  borderWidth: 1,
  margin: 5,
  gap: 5,

  display: "flex",
  justifyContent: "start",
};

const blogFull = {
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 10,
  border: "solid",
  borderWidth: 1,
  margin: 5,
  gap: 5,

  display: "flex",
  flexDirection: "column",
  justifyContent: "left",

  position: "absolute",
  bottom: 0,
};

const lineStyle = {
  margin: 0,
  paddingTop: 0,
  paddingBottom: 0,

  gap: 10,
};

const buttonLineStyle = {
  margin: 0,
  paddingTop: 0,
  paddingBottom: 0,
  gap: 10,
  display: "flex",
  alignItems: "center",
};

const Blog = ({ blogItem }) => {
  const blogRef = useRef();
  const [isActive, setIsActive] = useState(false); //Passed to child and set. Used to show full/summary details

  const dispatch = useDispatch()

  const handleAddLike = (blogObject) => {
    dispatch(doAddLike(blogObject))
  };

  const userCanDelete = (blogObject) => {
    //Called by like button
    const currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    if (!blogItem.user) {
      return false;
    }
    return blogObject.user.id === currentUser.id ? true : false;
  };

  const blogDetails = () => {
    //Called by like button

     const handleDeleteBlog = (blogObject) => {
        //Called by remove button
        if (
          window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)
        ) {
          console.log("clicked remove");

          dispatch(doDeleteBlog(blogObject))
        }
      };

    return (
      <div className="blog-details-div">
        <a style={lineStyle} href={blogItem.url}>
          {blogItem.url}
        </a>
        <div style={buttonLineStyle}>
          likes {blogItem.likes}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddLike(blogItem);
            }}
          >
            like
          </button>
        </div>
        {blogItem.user ? <i style={lineStyle}>{blogItem.user.username}</i> : null}
        {console.log("Blog, ", blogItem)}
        {userCanDelete(blogItem) ? (
          <div>
            <button
              onClick={() => handleDeleteBlog(blogItem)}
            >
              remove
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const callbackSetIsActive = (value) => {
    setIsActive(value);
  };

  const handleVisible = useCallback(() => {
    console.log("Callback");
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <div style={blogStyle} className="blog-div">
      <div style={buttonLineStyle}>
        <u>{blogItem.title}</u>
        <i>{blogItem.author}</i>
        <ToggleButton
          buttonLabel1="view"
          buttonLabel2="hide"
          ref={blogRef}
          isVisible={isActive}
          handleVisible={handleVisible}
        ></ToggleButton>
      </div>
      {isActive ? blogDetails() : null}
    </div>
  );
};

export default Blog;
