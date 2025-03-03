import config from '../framework/config/config.js'
import UserService from '../framework/services/UserService.js'
import AuthService from '../framework/services/AuthService.js'
import { generateUserBookstore } from '../framework/fixtures/randomUser.js'

let testUserName, testUserPassword, testUser, responseNewUser, token, newUserToken, testUserId

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
})

describe('User create tests', () => {
  test('success user create', async () => {
    const newUser = await generateUserBookstore()
    const newUserName = newUser.userName
    const newUserPassword = newUser.password
    responseNewUser = await UserService.create({
      userName: newUserName,
      password: newUserPassword
    })
    expect(responseNewUser.status).toBe(201)
    expect(responseNewUser.data.username).toBe(newUserName)
    newUserToken = responseNewUser.data.token
  })
  test('busy login', async () => {
    const response = await UserService.create({
      userName: testUserName,
      password: testUserPassword
    })
    expect(response.status).toBe(406)
    expect(response.data.message).toBe('User exists!')
  })
  test('incorrect password', async () => {
    const response = await UserService.create({
      userName: testUserName,
      password: config.password_incorrect
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBeTruthy()
  })
})

describe('Generate token tests', () => {
  test('for success generate token', async () => {
    const response = await UserService.generate({
      userName: testUserName,
      password: testUserPassword
    })
    expect(response.status).toBe(200)
    expect(response.data.status).toBe('Success')
    expect(response.data.token).toBeTruthy()
  })
  test('for unsuccessful generate token', async () => {
    const response = await UserService.generate({
      userName: testUserName,
      password: config.password_incorrect
    })
    expect(response.status).toBe(200)
    expect(response.data.status).toBe('Failed')
    expect(response.data.token).toBeNull()
  })
})

describe('Auth user tests', () => {
  test('success user authorized', async () => {
    const response = await AuthService.login({
      userName: testUserName,
      password: testUserPassword
    })
    expect(response.status).toBe(200)
    expect(response.data).toBe(true)
  })
  test('incorrect password', async () => {
    const response = await AuthService.login({
      userName: testUserName,
      password: config.password_incorrect
    })
    expect(response.status).toBe(400) //баг в api - 400 отдаётся только на пустой пароль, а должен на некорректный.
    expect(response.data.message).toBeTruthy()
  })
  test('user not found', async () => {
    const response = await AuthService.login({
      userName: config.login_not_found,
      password: testUserPassword
    })
    expect(response.status).toBe(404)
    expect(response.data.message).toBe('User not found!')
  })
  test('username not specified', async () => {
    const response = await AuthService.login({
      userName: null,
      password: testUserPassword
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBe('UserName and Password required.')
  })
  test('password not specified', async () => {
    const response = await AuthService.login({
      userName: testUserName,
      password: null
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBe('UserName and Password required.')
  })
})

describe('Get info about user tests', () => {
  test('for success get info', async () => {
    const response = await UserService.get(testUserId, token)
    expect(response.status).toBe(200) //баг апи, 401 ответ даже при авторизованном пользователе
    expect(response.data.status).toBe('Success')
  })
  test('for unsuccessful get info', async () => {
    const response = await UserService.get(111)
    expect(response.status).toBe(401)
  })
  test('for unauthorized user', async () => {
    const response = await UserService.get(responseNewUser.data.userID, token)
    expect(response.status).toBe(401)
  })
})

describe('Delete user tests', () => {
  test('for success delete user', async () => {
    const response = await UserService.delete(testUser.userID, token)
    expect(response.status).toBe(200)
  })
  test('for unsuccessful delete user', async () => {
    const response = await UserService.delete(testUser.userID, token)
    expect(response.status).toBe(200)
    expect(response.data.message).toContain('User Id not correct')
  })
})
