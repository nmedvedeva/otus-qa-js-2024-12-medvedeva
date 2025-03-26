import axios from 'axios'
import config from '../config/config'
import { cached } from '../utils/cache'
import { Credentials } from '../models/'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const UserCreate = async ({ userName, password }: Credentials) => {
  const response = await client.post(`/Account/v1/User`, {
    userName,
    password
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const UserDelete = async ({ userID, token }: { userID: string; token: string }) => {
  const response = await client.delete(`/Account/v1/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const UserGetInfo = async ({ userID, token }: { userID: string; token: string }) => {
  const response = await client.get(`/Account/v1/User/${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const GenerateToken = async ({ userName, password }: Credentials) => {
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

const generateTokenCached = cached(GenerateToken)

const getTokenFromCache = async ({ userName, password }: Credentials) => {
  const response = await generateTokenCached({
    userName,
    password
  })
  if (typeof response.data.token !== 'string') {
    throw new Error('No token in response')
  }
  return response.data.token
}

export default {
  create: UserCreate,
  delete: UserDelete,
  get: UserGetInfo,
  generate: GenerateToken,
  generateTokenCached,
  getTokenFromCache
}
