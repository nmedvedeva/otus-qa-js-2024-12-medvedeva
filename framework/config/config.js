import dotenv from 'dotenv'

export default Object.freeze({
  baseURL: process.env.BOOKSTORE_BASE_URL ?? 'https://bookstore.demoqa.com',
  userID: process.env.BOOKSTORE_USER_ID,
  login_correct: process.env.BOOKSTORE_LOGIN_CORRECT,
  password_correct: process.env.BOOKSTORE_PASSWORD_CORRECT,
  password_incorrect: process.env.BOOKSTORE_PASSWORD_INCORRECT
})
