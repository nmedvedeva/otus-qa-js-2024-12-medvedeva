import axios from 'axios'
import config from '../config/config'
import { Credentials } from '../models/'

const auth = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const UserAuthorized = async ({ userName, password }: Credentials) => {
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
