export default Object.freeze({
  baseURL: process.env.BOOKSTORE_BASE_URL ?? 'https://petstore.swagger.io/v2',
  username: process.env.PETSTORE_USERNAME as string,
  username_incorrect: process.env.PETSTORE_USERNAME_INCORRECT as string,
  password_correct: process.env.PETSTORE_PASSWORD_CORRECT as string,
  password_incorrect: process.env.PETSTORE_PASSWORD_INCORRECT as string,
  firstName: process.env.PETSTORE_FIRSTNAME as string,
  lastName: process.env.PETSTORE_LASTNAME as string,
  email: process.env.PETSTORE_EMAIL as string,
  phone: process.env.PETSTORE_PHONE as string,
  userStatus: process.env.PETSTORE_USER_STATUS as string,
  orderId: process.env.PETSTORE_ORDER_ID as string
})
