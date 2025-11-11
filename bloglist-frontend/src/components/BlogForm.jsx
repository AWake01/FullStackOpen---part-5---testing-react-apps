import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { doAddBlog } from "../reducers/blogReducer";

const BlogForm = ({hideBlogForm}) => {
  const [title, setTitle] = useState([]);
  const [author, setAuthor] = useState([]);
  const [url, setUrl] = useState(null);

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(doAddBlog({
      title: title,
      author: author,
      url: url,
    }))
    //Reset form
    setTitle("");
    setAuthor("");
    setUrl("");
    hideBlogForm()
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">
            title:{" "}
            <input
              type="text"
              value={title}
              name={"title"}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            author:{" "}
            <input
              type="text"
              value={author}
              name={"author"}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="url">
            url:{" "}
            <input
              type="text"
              value={url}
              name={"url"}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
