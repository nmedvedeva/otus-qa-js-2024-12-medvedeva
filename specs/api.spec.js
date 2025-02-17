import config from '../framework/config/config.js'
import UserService from '../framework/services/UserService.js'

describe('User', () => {
  test('success user create', async () => {
    const response = await UserService.create({
      userName: config.login_correct,
      password: config.password_correct
    })
    expect(response.status).toBe(201)
    expect(response.data.username).toBe(config.login_correct)
  })
  test('busy login', async () => {
    const response = await UserService.create({
      userName: config.login_correct,
      password: config.password_correct
    })
    expect(response.status).toBe(406)
    expect(response.data.message).toBe('User exists!')
  })
  test('incorrect password', async () => {
    const response = await UserService.create({
      userName: config.login_correct,
      password: config.password_incorrect
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBeTruthy()
  })
})

describe('Test for generate token', () => {
  test('for success generate token', async () => {
    const response = await UserService.generate({
      userName: config.login_correct,
      password: config.password_correct
    })
    expect(response.status).toBe(200)
    expect(response.data.status).toBe('Success')
    expect(response.data.token).toBeTruthy()
  })
  test('for unsuccessful generate token', async () => {
    const response = await UserService.generate({
      userName: config.login_correct,
      password: config.password_incorrect
    })
    expect(response.status).toBe(200)
    expect(response.data.status).toBe('Failed')
    expect(response.data.token).toBeNull()
  })
})

describe('Test for delete user', () => {
  test('for success delete user', async () => {
    const response = await UserService.delete({
      userId: userId
    })
    expect(response.status).toBe(200)
    expect(response.data.status).toBe('Success')
  })
  test('for unsuccessful delete user', async () => {
    const response = await UserService.delete({
      userId: userId
    })
    expect(response.status).toBe(401)
    expect(response.data.status).toBe('Unauthorized')
  })
})
