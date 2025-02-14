import dotenv from 'dotenv'

dotenv.config()

const config = {
  baseURL: process.env.BASE_URL,
  login_correct: process.env.LOGIN_CORRECT,
  password_correct: process.env.PASSWORD_CORRECT,
  password_incorrect: process.env.PASSWORD_INCORRECT
}

export default config
