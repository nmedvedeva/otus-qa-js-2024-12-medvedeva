import dotenv from 'dotenv'

dotenv.config()

export const config = {
  baseURL: process.env.PETSTORE_BASE_URL
}

export default config
