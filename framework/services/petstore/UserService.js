import axios from 'axios'
import config from '../../config/petstore/config.js'

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

const UserGet = async (username) => {
    const response = await client.get(`/user/${username}`)

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

const UserLogin = async ({ username, password }) => {
    const response = await client.get(`/user/login`, {
        username, password
    })

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

const UserUpdate = async ({ username, firstName, lastName, email, password, phone, userStatus }) => {
    const response = await client.put(`/user/${username}`, {
        username, firstName, lastName, email, password, phone, userStatus
    })

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

const UserLogout = async () => {
    const response = await client.get(`/user/logout`)

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

const UserDelete = async (username) => {
    const response = await client.delete(`/user/${username}`)

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

export default {
    create: UserCreate,
    get: UserGet,
    update: UserUpdate,
    login: UserLogin,
    logout: UserLogout,
    delete: UserDelete
}