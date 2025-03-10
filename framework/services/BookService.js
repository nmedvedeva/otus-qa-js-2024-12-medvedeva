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

const BooksAddList = async ({ userID, isbns, token }) => {
  /*const payload = {
    userID,
    collectionOfIsbns: isbns.map(isbn => ({ isbn }))
  }*/

  const response = await client.post(`/BookStore/v1/Books`, {
    userID,
    collectionOfIsbns: isbns.map(isbn => ({ isbn })),
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(response)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
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

const BooksReplace = async ({ userID, fromIsbn, toIsbn, token }) => {
  const response = await client.put(`/BookStore/v1/Books/${fromIsbn}`, {
    userID,
    isbn: toIsbn,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(token)
  return {
    headers: response.headers,
    status: response.status,
    data: response.body
  }
}

export default {
  get: BooksGetAll,
  getByIsbn: BookGetByIsbn,
  remove: BooksRemoveAll,
  addList: BooksAddList,
  replace: BooksReplace
}
