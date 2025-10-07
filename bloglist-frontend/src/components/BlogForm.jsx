import { useState } from 'react'

const BlogForm = ({ createBlogFunction, }) => {
  //const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState(null)

  const addBlog = (event) => {
    event.preventDefault()
    createBlogFunction({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        {/* <div>title: <input type='text' value={title} name={"title"} onChange={({ target }) => setTitle(target.value)}/></div> */}
        <div>title: <input type='text' value={title} name={'title'} onChange={event => setTitle(event.target.value)}/></div>
        <div>author: <input type='text' value={author} name={'author'} onChange={event => setAuthor(event.target.value)}/></div>
        <div>url: <input type='text' value={url} name={'url'} onChange={event =>  setUrl(event.target.value)}/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm