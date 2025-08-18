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
  return response.data
}

export default { setToken, getAll, create }