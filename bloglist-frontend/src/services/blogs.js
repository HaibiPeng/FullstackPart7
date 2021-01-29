import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLikes = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const deleteBlog = id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const addComment = (id, comment) => {
  const request = axios.post(`${ baseUrl }/${id}/comments`, comment)
  return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, create, setToken, addLikes, deleteBlog, addComment }