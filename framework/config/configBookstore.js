import 'dotenv/config'

dotenv.config();

export default Object.freeze({
    base_url: process.env.BOOKSTORE_BASE_URL,
    login_correct: process.env.BOOKSTORE_LOGIN_CORRECT,
    password_correct: process.env.BOOKSTORE_PASSWORD_CORRECT,
    password_incorrect: process.env.BOOKSTORE_PASSWORD_INCORRECT
})