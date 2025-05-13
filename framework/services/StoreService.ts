import axios from 'axios'
import config from '../config/config'
import { Store } from '../models/Store'

const client = axios.create({
    baseURL: config.baseURL,
    validateStatus: () => true
})

const StoreGetInventory = async () => {
    const response = await client.get(`/store/inventory`)

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

const StoreGetOrderById = async ({ orderId }: Store) => {
    const response = await client.get(`/store/order/${orderId}`)

    return {
        headers: response.headers,
        status: response.status,
        data: response.data
    }
}

export default {
    getInventory: StoreGetInventory,
    getOrderById: StoreGetOrderById
}