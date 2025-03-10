import { UserService, AuthService, BookService } from '../framework/services/index.js'
import { books } from '../framework/fixtures/Books.json'
import { generateBook } from '../framework/fixtures/randomBook.js'
import { generateUserBookstore } from '../framework/fixtures/randomUser.js'

let testUser, testUserName, testUserPassword, testUserId, token, book2, isbn, isbn2

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
  await AuthService.login({
    userName: testUserName,
    password: testUserPassword
  })
  const [book1, book2] = books
  isbn = book1.isbn
  isbn2 = book2.isbn
})

describe('Get all book', () => {
  test('success get all books list', async () => {
    const response = await BookService.get()
    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })
})

describe('Delete all books', () => {
  test('Delete all books from users collection', async () => {
    const responseRemoveAll = await BookService.remove({ userID: testUserId, token })
    expect(responseRemoveAll.status).toBe(204)
    const responseUser = await UserService.get({ userID: testUserId, token })
    expect(responseUser.data.books).toEqual([])
  })
})

describe('Add books', () => {
  test('Add list of books into users collection', async () => {
    const response = await BookService.addList({
      userID: testUserId,
      isbns: [isbn, isbn2],
      token
    })

    expect(response.data).toEqual({ books: [{ isbn }] })
  })
})

describe('Get book by isbn', () => {
  test('Get info about book by isbn', async () => {
    const response = await BookService.getByIsbn({
      isbn,
      token
    })
    expect(response.data.isbn).toEqual(isbn)
  })
})

describe('Replace book by isbn', () => {
  test('Success replace book by isbn', async () => {
    const response = await BookService.replace({
      userID: testUserId,
      fromIsbn: isbn,
      toIsbn: isbn2,
      token
    })
    console.log(response)
    expect(response.data).toEqual({
      userID: testUserId,
      username: testUserName,
      books: [book2]
    })
  })
})
