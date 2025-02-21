import axios from 'axios'
import config from '../../config/petstore/config.js' //возможно неверный путь

const client = axios.create({
    baseURL: config.baseURL,
    validateStatus: () => true
})

const UserCreate = async ({ username, firstName, lastName, email, password, phone, userStatus }) => {
    const response = await client.post(`/user/createWithArray`, [{
        username, firstName, lastName, email, password, phone, userStatus
    }])

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

export default {
    create: UserCreate
}