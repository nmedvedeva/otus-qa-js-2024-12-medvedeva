import axios from 'axios'
import config from '../config/config.js'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const BookCreate = async ({ userId, isbns, token }) => {
  const response = await client.post(`/BookStore/v1/Books`, {
    userId: userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
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

const BooksGetAll = async () => {
  const response = await client.get(`/BookStore/v1/Books`)
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  create: BookCreate,
  get: BooksGetAll
}
