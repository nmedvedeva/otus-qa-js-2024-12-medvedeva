// import UserService from '../framework/services/UserService.js'
// import AuthService from '../framework/services/AuthService.js'
// import BookService from '../framework/services/BookService.js'
// import { generateUserBookstore } from '../framework/fixtures/randomUser.js'

// let testUser, testBook, testUserName, testUserPassword, testUserId

// beforeAll(async () => {
//   const randomUser = await generateUserBookstore()
//   testUser = await UserService.create(randomUser)
//   testUserName = randomUser.userName
//   testUserPassword = randomUser.password
//   testUserId = testUser.data.userID
//   const response = await AuthService.login({
//     userName: testUserName,
//     password: testUserPassword
//   })
//   // const newBook = {
//   //   userId: testUserId,
//   //   // ISBN книги, что доступна на bookstore, можно получить в методе `BookStore/v1/Books`
//   //   // или тут :) https://github.com/OTUS-QA-JS/otus-qajs/blob/lesson/type-script/framework/fixtures/Books.json
//   //   collectionOfIsbns: ['9781449325862']
//   // }
//   // // 1. забыли передать токен авторизации
//   // // 2. забыли создать переменную newBook
//   // testBook = await BookService.create(newBook)
//   // collectionOfIsbns = newBook.isbn
// })

import { faker } from '@faker-js/faker'
import axios from 'axios'

describe('BookStore', () => {
  test('успешное добавление списка книг в коллекцию пользователя', async () => {
    // arrange / подготовка
    const credential = {
      userName: faker.internet.username(),
      password: faker.internet.password({ length: 10, pattern: /^[A-Za-z0-9]+$/, prefix: '!B1' })
    }

    const responseCreateUser = await axios.post('https://bookstore.demoqa.com/Account/v1/User', credential)
    const userId = responseCreateUser.data.userID
    const responseToken = await axios.post('https://bookstore.demoqa.com/Account/v1/GenerateToken', credential)
    const token = responseToken.data.token
    // мб взято из статичных фикстур, как вариант
    const isbn = '9781449325862'

    // act / действие
    const response = await axios.post(
      'https://bookstore.demoqa.com/BookStore/v1/Books',
      {
        userId: userId,
        collectionOfIsbns: [
          {
            isbn
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    // assert / проверка
    expect(response.status).toBe(201)
    expect(response.data).toEqual({ books: [{ isbn }] })
  })

  test.todo('нельзя добавить книгу, который нет на сайте')
  test.todo('не авторизованный пользователь, не может обновить коллекцию')
  test.todo('авторизованный пользователь не может добавить книгу, в коллекцию к другому пользователю')
})
