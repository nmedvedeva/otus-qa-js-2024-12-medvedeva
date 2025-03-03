import { faker } from '@faker-js/faker'

export async function generateUserCredentials() {
  return {
    username: faker.internet.username(),
    password: faker.internet.password({ length: 13, pattern: /^[A-Za-z0-9]+$/, prefix: '!H12' }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.number.int(),
    userStatus: 0
  }
}

export async function generateUserBookstore() {
  return {
    userName: faker.internet.username(),
    password: faker.internet.password({ length: 10, pattern: /^[A-Za-z0-9]+$/, prefix: '!B1' })
  }
}
