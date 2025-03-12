import axios from 'axios'
import config from '../config/config.js'

const client = axios.create({
  baseURL: config.baseURL,
  validateStatus: () => true
})

const BooksGetAll = async () => {
  const response = await client.get(`/BookStore/v1/Books`)
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const BooksRemoveAll = async ({ userID, token }) => {
  const response = await client.delete(`/BookStore/v1/Books?UserId=${userID}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

const BooksAddList = async ({ userId, isbns, token }) => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map(isbn => ({ isbn }))
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }
  const response = await client.post(`/BookStore/v1/Books`, payload, config)
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

const BookGetByIsbn = async ({ isbn, token }) => {
  const response = await client.get(`/BookStore/v1/Book?ISBN=${isbn}`, {
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

const BooksReplace = async ({ userId, fromIsbn, toIsbn, token }) => {
  const payload = {
    userId,
    isbn: toIsbn
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await client.put(`/BookStore/v1/Books/${fromIsbn}`, payload, config)
  return {
    headers: response.headers,
    status: response.status,
    data: response.data
  }
}

export default {
  get: BooksGetAll,
  getByIsbn: BookGetByIsbn,
  remove: BooksRemoveAll,
  addList: BooksAddList,
  replace: BooksReplace
}
