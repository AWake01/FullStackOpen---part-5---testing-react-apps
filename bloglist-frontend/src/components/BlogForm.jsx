import { useState } from 'react'

const BlogForm = ({ addBlogFunction }) => {
  //const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState(null)

  const addBlog = (event) => {
    event.preventDefault()
    addBlogFunction({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        {/* <div>title: <input type='text' value={title} name={"title"} onChange={({ target }) => setTitle(target.value)}/></div> */}
        <div><label for="title">title:
          <input type='text' value={title} name={'title'} id={'title'}  onChange={event => setTitle(event.target.value)}/>
        </label></div>
        <div><label for="author">author:
          <input type='text' value={author} name={'author'} id={'author'} onChange={event => setAuthor(event.target.value)}/>
        </label></div>
        <div><label for="url">url:
          <input type='text' value={url} name={'url'} id={'url'} onChange={event =>  setUrl(event.target.value)}/>
        </label></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm