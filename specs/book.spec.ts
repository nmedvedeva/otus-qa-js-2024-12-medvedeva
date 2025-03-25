import config from '../framework/config/config'
import { UserService, AuthService, BookService } from '../framework/services/index'
import { books } from '../framework/fixtures/Books.json'

describe('All tests for books', () => {
  const userID = config.userID
  const [book1, book2] = books
  const isbn = book1.isbn
  const isbn2 = book2.isbn

  let token: string

  beforeAll(async () => {
    token = await UserService.getTokenFromCache({
      userName: config.login_correct,
      password: config.password_correct
    })
  })

  test('Success get all books list', async () => {
    const response = await BookService.get()
    expect(response.status).toBe(200)
    expect(response.data).toEqual({ books })
  })

  test('Get info about book by isbn', async () => {
    const response = await BookService.getByIsbn({ isbn, token })
    expect(response.data.isbn).toEqual(isbn)
  })

  test('Add list of books into users collection', async () => {
    const response = await BookService.addList({
      userId: config.userID,
      // @ts-expect-error разобраться с типами
      isbns: [isbn],
      token
    })
    expect(response?.status).toBe(201)
    expect(response?.data).toEqual({ books: [{ isbn }] })
  })

  test('Success replace book by isbn', async () => {
    const response = await BookService.replace({
      userId: config.userID,
      fromIsbn: isbn,
      toIsbn: isbn2,
      token
    })
    expect(response.data).toEqual({
      books: [book2],
      userId: config.userID,
      username: config.login_correct
    })
  })

  test('Replace book if it is not in the collection', async () => {
    const response = await BookService.replace({
      userId: config.userID,
      fromIsbn: config.fake_isbn,
      toIsbn: isbn2,
      token
    })
    expect(response.status).toEqual(400)
  })

  test('Delete all books from users collection', async () => {
    const response = await BookService.remove({ userID, token })
    expect(response.status).toBe(204)
    const responseUser = await UserService.get({ userID, token })
    expect(responseUser.data.books).toEqual([])
  })
})
