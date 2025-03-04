/* eslint-disable */
import UserService from '../framework/services/UserService.js'
import AuthService from '../framework/services/AuthService.js'
import BookService from '../framework/services/BookService.js'
import { books } from '../framework/fixtures/Books.json'
import { generateBook } from '../framework/fixtures/randomBook.js'
import { generateUserBookstore } from '../framework/fixtures/randomUser.js'

let testUser, testBook, testUserName, testUserPassword, testUserId, token

beforeAll(async () => {
  const randomUser = await generateUserBookstore()
  testUser = await UserService.create(randomUser)
  testUserName = randomUser.userName
  testUserPassword = randomUser.password
  testUserId = testUser.data.userID
  const response = await AuthService.login({
    userName: testUserName,
    password: testUserPassword
  })
  token = response.data.token
  testBook = await generateBook()
  const [book1, book2] = books
  const isbn = book1.isbn
})

describe('Get all book tests', () => {
  test('success get all books list', async () => {
    const response = await BookService.get()
    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
    console.log(response)
  })
})
/*
describe('Add book tests', () => {
  test('success add book', async () => {
    const response = await BookService.create({
      userId,
      collectionOfIsbns
    })
    expect(response.status).toBe(200)
    expect(response.data.status).toBe('Success')
    expect(response.data.token).toBeTruthy()
  })
})*/
/* eslint-enable */
