import dotenv from 'dotenv'

dotenv.config()

export const config = {
  baseURL: process.env.BASE_URL,
  login_correct: process.env.LOGIN_CORRECT,
  login_not_found: process.env.LOGIN_NOT_FOUND,
  password_correct: process.env.PASSWORD_CORRECT,
  password_incorrect: process.env.PASSWORD_INCORRECT
}

export default config
