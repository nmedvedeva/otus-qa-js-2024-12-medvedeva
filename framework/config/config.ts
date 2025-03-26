export default Object.freeze({
  baseURL: process.env.BOOKSTORE_BASE_URL ?? 'https://bookstore.demoqa.com',
  userID: process.env.BOOKSTORE_USER_ID as string,
  login_correct: process.env.BOOKSTORE_LOGIN_CORRECT as string,
  password_correct: process.env.BOOKSTORE_PASSWORD_CORRECT as string,
  password_incorrect: process.env.BOOKSTORE_PASSWORD_INCORRECT as string,
  fake_isbn: process.env.BOOKSTORE_FAKE_ISBN as string
})
