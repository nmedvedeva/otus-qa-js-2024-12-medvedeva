import axios from 'axios'
import config from '../framework/config/config.js'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const UserCreate = async ({ userName, password }) => {
  try {
    // Добавлено для перехвата ошибок
    const response = await client.post(`/Account/v1/User`, {
      userName,
      password
    })

    return {
      headers: response.headers,
      status: response.status,
      data: response.data
    }
  } catch (error) {
    console.error('Error in UserCreate:', error) // Логирование ошибки
    return {
      status: error.response?.status || 500, // Добавлено: Возвращает статус ошибки (если есть) или 500 (Internal Server Error)
      data: error.response?.data || { message: 'Internal Server Error' }, // Добавлено: Возвращает данные ошибки (если есть)
      headers: error.response?.headers || {}
    }
  }
}

export default UserCreate
