import config from '../framework/config/config.js'
import UserCreate from '../framework/services/UserService.js'

describe('Auth', () => {
  test('success user create', async () => {
    const response = await UserCreate({
      userName: config.login_correct,
      password: config.password_correct
    })
    expect(response.status).toBe(201)
    expect(response.data.username).toBe(config.login_correct)
  })
  test('busy login', async () => {
    const response = await UserCreate({
      userName: config.login_correct,
      password: config.password_correct
    })
    const data = response.data
    expect(response.status).toBe(406)
    expect(data.message).toBe('User exists!')
  })
  test('incorrect password', async () => {
    const response = await axios.post(
      `${config.baseURL}/Account/v1/User`,
      {
        userName: config.login_correct,
        password: config.password_incorrect
      },
      {
        validateStatus: () => true
      }
    )
    const data = response.data
    expect(response.status).toBe(400)
    expect(data.message).toBeTruthy()
  })
})

describe('Test for generate token', () => {
  test('Tests for success generate token', async () => {
    const response = await axios.post(`${config.baseURL}/Account/v1/GenerateToken`, {
      userName: config.login_correct,
      password: config.password_correct
    })
    const data = response.data
    expect(response.status).toBe(200)
    expect(data.status).toBe('Success')
    expect(data.token).toBeTruthy()
  })
  test('for unsuccessful generate token', async () => {
    const response = await axios.post(`${config.baseURL}/Account/v1/GenerateToken`, {
      userName: config.login_correct,
      password: config.password_incorrect
    })
    const data = response.data
    expect(response.status).toBe(200)
    expect(data.status).toBe('Failed')
    expect(data.token).toBeNull()
  })
})
