import config from '../framework/config/config'
import UserService from '../framework/services/UserService'

describe('User create tests', () => {
  test('success user create', async () => {
    const response = await UserService.create({
      username: config.username,
      password: config.password_correct,
      firstName: config.firstName,
      lastName: config.lastName,
      email: config.email,
      phone: config.phone,
      userStatus: config.userStatus
    })
    expect(response.status).toBe(200)
    expect(response.data.message).toBe('ok')
  })
})

describe('Get user by username', () => {
  test('successful operation', async () => {
    const response = await UserService.get({ username: config.username })
    expect(response.status).toBe(200)
  })
  test('user does not exist', async () => {
    const response = await UserService.get({ username: 'test' })
    expect(response.status).toBe(404)
    expect(response.data.message).toBe('User not found')
  })
})

describe('User login tests', () => {
  test('success login', async () => {
    const response = await UserService.login({
      username: config.username,
      password: config.password_correct
    })
    expect(response.status).toBe(200)
    expect(response.data.message).toContain('logged in user session')
  })
})

describe('Update user by username', () => {
  test('successful operation', async () => {
    const testUser = {
      username: config.username,
      firstName: config.firstName,
      lastName: config.lastName,
      email: config.email,
      password: config.password_correct,
      phone: config.phone,
      userStatus: config.userStatus
    }
    const response = await UserService.update(testUser.username, testUser)
    expect(response.status).toBe(200)
  })
})

describe('Delete user by username', () => {
  test('successful delete', async () => {
    const response = await UserService.delete({ username: config.username })
    expect(response.status).toBe(200)
    expect(response.data.message).toBe(config.username)
  })
  test('delete user does not exist', async () => {
    const response = await UserService.delete({ username: 'test' })
    expect(response.status).toBe(404)
  })
})

describe('User logout tests', () => {
  test('success logout', async () => {
    const response = await UserService.logout()
    expect(response.status).toBe(200)
  })
})
