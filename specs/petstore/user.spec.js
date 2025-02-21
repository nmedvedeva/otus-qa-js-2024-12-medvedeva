import config from '../../framework/config/petstore/config.js'
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
  /*test('busy login', async () => {  
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
  })*/
})

describe('Get user by username', () => {
  test('successful operation', async () => {
    const response = await UserService.get(testUsername)
    console.log(response)
    expect(response.status).toBe(200)
    //expect(response.data.message).toBe("ok")
  })
})
/*console.log(testUsername, testUserPassword, testFirstName, testLastName, testUserEmail, testPhone, testUserStatus)
console.log(response)*/