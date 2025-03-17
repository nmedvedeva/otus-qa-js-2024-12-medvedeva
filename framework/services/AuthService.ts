import axios from 'axios'
import config from '../config/config.js'

const auth = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const UserAuthorized = async ({ userName, password }) => {
  const response = await auth.post(`/Account/v1/Authorized`, {
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
  login: UserAuthorized
}
