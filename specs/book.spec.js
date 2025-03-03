import UserService from '../framework/services/UserService.js'
import AuthService from '../framework/services/AuthService.js'
import BookService from '../framework/services/BookService.js'
import { generateBook } from '../framework/fixtures/randomBook.js'

let testUser, testBook, testUserName, testUserPassword, testUserId

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
  testBook = await BookService.create(newBook)
  collectionOfIsbns = newBook.isbn
})

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
})
