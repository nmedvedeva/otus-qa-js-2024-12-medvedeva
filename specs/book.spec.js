import config from '../framework/config/config.js'
import { UserService, AuthService, BookService } from '../framework/services/index.js'
import { books } from '../framework/fixtures/Books.json'
import { generateBook } from '../framework/fixtures/randomBook.js'
import { generateUserBookstore } from '../framework/fixtures/randomUser.js'

//let testUser, testUserName, testUserPassword, testUserId, token, book2, isbn, isbn2

/*beforeAll(async () => {
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
*/

describe('All tests for books', () => {
  const userID = config.userID
  const [book1, book2] = books
  const isbn = book1.isbn
  const isbn2 = book2.isbn

  let token

  beforeAll(async () => {
    token = await UserService.getTokenFromCache({
      userName: config.login_correct,
      password: config.password_correct
    })
    await AuthService.login({
      userName: config.login_correct,
      password: config.password_correct
    })
  })

  test('success get all books list', async () => {
    const response = await BookService.get()
    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })

  test('Get info about book by isbn', async () => {
    const response = await BookService.getByIsbn({
      isbn,
      token
    })
    expect(response.data.isbn).toEqual(isbn)
  })

  test('Add list of books into users collection', async () => {
    const response = await BookService.addList({
      userID,
      isbns: [isbn],
      token
    })
    expect(response.status).toBe(201)
    expect(response.data).toEqual({ books: [{ isbn }] })
  })

  test('Success replace book by isbn', async () => {
    const response = await BookService.replace({
      userID,
      fromIsbn: isbn,
      toIsbn: isbn2,
      token
    })

    expect(response.data).toHaveProperty('userID', config.userID)
    expect(response.data).toHaveProperty('username', config.login_correct)
    expect(response.data).toHaveProperty('books.isbn', isbn2)
    /*expect(response.data).toEqual({
      userID,
      username: config.login_correct,
      books: [book2]
    })*/
  })

  test('Delete all books from users collection', async () => {
    const responseRemoveAll = await BookService.remove({ userID, token })
    expect(responseRemoveAll.status).toBe(204)
    const responseUser = await UserService.get({ userID, token })
    expect(responseUser.data.books).toEqual([])
  })
})
