import axios from 'axios'
import config from '../config/config.js'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const UserCreate = async ({ userName, password }) => {
  const response = await client.post(`/Account/v1/User`, {
    userName,
    password
  })
  const userId = response.data.UserId

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const UserDelete = async ( userId ) => {
  const response = await client.delete(`/Account/v1/User/${userId}`, {
    userId
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const GenerateToken = async ({ userName, password }) => {
  const response = await client.post(`/Account/v1/GenerateToken`, {
    userName,
    password
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  create: UserCreate,
  delete: UserDelete,
  generate: GenerateToken
}
