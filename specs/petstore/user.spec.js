import UserService from '../../framework/services/petstore/UserService.js'
import { generateUserCredentials } from '../../framework/fixtures/randomUser.js'

let testUser, testUsername, testUserPassword, testUserEmail, testFirstName, testLastName, testPhone, testUserStatus, testUserId

beforeAll(async () => {
  const randomUser = await generateUserCredentials()
  testUser = await UserService.create(randomUser)
  testUsername = randomUser.username
  testUserPassword = randomUser.password
  testUserEmail = randomUser.email
  testFirstName = randomUser.firstName
  testLastName = randomUser.lastName
  testPhone = randomUser.phone
  testUserStatus = randomUser.userStatus
})

describe('User create tests', () => {
  test('success user create', async () => {
    const response = await UserService.create({
      username: testUsername,
      password: testUserPassword,
      firstName: testFirstName,
      lastName: testLastName,
      email: testUserEmail,
      phone: testPhone,
      userStatus: testUserStatus
    })
    expect(response.status).toBe(200)
    expect(response.data.message).toBe("ok")
  })
})

describe('Get user by username', () => {
  test('successful operation', async () => {
    const response = await UserService.get(testUsername)
    expect(response.status).toBe(200)
  })
  test('user does not exist', async () => {
    const response = await UserService.get(`${testUsername}test`)
    expect(response.status).toBe(404)
    expect(response.data.message).toBe('User not found')
  })
})

describe('User login tests', () => {
  test('success login', async () => {
    const response = await UserService.login({
      username: testUsername,
      password: testUserPassword
    })
    expect(response.status).toBe(200)
    expect(response.data.message).toContain('logged in user session')
  })
})

describe('Update user by username', () => {
  test('successful operation', async () => {
    const response = await UserService.update(testUsername, testUser)
    expect(response.status).toBe(200)
  })
  test('user does not exist', async () => {
    const response = await UserService.update(test, testUser)
    expect(response.status).toBe(404)
    expect(response.data.message).toBe('User not found')
  })
})

describe('Delete user by username', () => {
  test('successful delete', async () => {
    const response = await UserService.delete(testUsername)
    expect(response.status).toBe(200)
    expect(response.data.message).toBe(testUsername)
  })
  test('delete user does not exist', async () => {
    const response = await UserService.delete(`${testUsername}test`)
    expect(response.status).toBe(404)
  })
  test('repeated deletion', async () => {
    const response1 = await UserService.delete(testUsername)
    expect(response1.status).toBe(404)
  })
})

describe('User logout tests', () => {
  test('success logout', async () => {
    const response = await UserService.logout()
    expect(response.status).toBe(200)
  })
})
/*console.log(testUsername, testUserPassword, testFirstName, testLastName, testUserEmail, testPhone, testUserStatus)
console.log(response)*/
//{testUsername, testFirstName, testLastName, testUserEmail, testUserPassword, testPhone, testUserStatus}