import { UserService, AuthService, BookService } from '../framework/services/index.js'
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
  const responseToken = await UserService.generate({
    userName: testUserName,
    password: testUserPassword
  })
  token = responseToken.data.token
  const response = await AuthService.login({
    userName: testUserName,
    password: testUserPassword
  })
  testBook = await generateBook()
  const [book1, book2] = books
  const isbn = book1.isbn
})

describe('Get all book tests', () => {
  test('success get all books list', async () => {
    const response = await BookService.get()
    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })
})

//создание книги
//обновление книги
//удаление книги
describe('Delete all books', () => {
  test('Delete all books from users collection', async () => {
    const responseRemoveAll = await BookService.remove({ userID: testUserId, token })
    expect(responseRemoveAll.status).toBe(204)
    const responseUser = await UserService.get({ userID: testUserId, token })
    expect(responseUser.data.books).toEqual([])
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
