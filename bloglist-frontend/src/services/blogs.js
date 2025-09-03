import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {  //Set private token
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => { //Add new blog with valid user token
  const config = { headers: { Authorization: token }, }

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response.data)
  return response.data
}

const put = async newBlog => { //Update blog
  //const config = { headers: { Authorization: token }, }

  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, /*config*/)
  return response.data
}

const deleteBlog = async blogToDelete => { //Update blog
  const config = { headers: { Authorization: token }, }

  const response = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return response.data
}

export default { setToken, getAll, create, put, deleteBlog }