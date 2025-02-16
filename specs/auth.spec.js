import config from '../framework/config/config.js'
import AuthService from '../framework/services/AuthService.js'

describe('Auth', () => {
  test('success user authorized', async () => {
    const response = await AuthService.login({
      userName: config.login_correct,
      password: config.password_correct
    })
    expect(response.status).toBe(200)
    expect(response.data.message).toBe('true')
  })
  test('user not found', async () => {
    const response = await AuthService.login({
      userName: config.login_not_found,
      password: config.password_correct
    })
    expect(response.status).toBe(404)
    expect(response.data.message).toBe('User not found!')
  })
  test('incorrect password', async () => {
    const response = await AuthService.login({
      userName: config.login_correct,
      password: config.password_incorrect
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBeTruthy()
  })
  test('username not specified', async () => {
    const response = await AuthService.login({
      userName: null,
      password: config.password_correct
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBe('UserName and Password required.')
  })
  test('password not specified', async () => {
    const response = await AuthService.login({
      userName: config.login_correct,
      password: null
    })
    expect(response.status).toBe(400)
    expect(response.data.message).toBe('UserName and Password required.')
  })
})
