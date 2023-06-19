import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = () => {
  return {
    headers: { Authorization: token },
  }
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config())
  return request.then(response => response.data)
}

const delet = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, config())
  return request.then(response => response.data)
}

export default { get, getAll, create, update, delet, setToken }
