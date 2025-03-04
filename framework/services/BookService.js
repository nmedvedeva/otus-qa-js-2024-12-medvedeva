import axios from 'axios'
import config from '../config/config.js'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

/**
 * это не создание книги, а добавление книги (книг точнее) в коллекцию к пользователю
 */
const BookCreate = async ({ userId, collectionOfIsbns }) => {
  // этот метод требует авторизации (нужно передать токен)
  const response = await client.post(`/BookStore/v1/Books`, {
    userId: userId,
    collectionOfIsbns: collectionOfIsbns
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  create: BookCreate
}
