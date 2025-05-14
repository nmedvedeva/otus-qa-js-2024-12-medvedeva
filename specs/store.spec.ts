import config from '../framework/config/config'
import StoreService from '../framework/services/StoreService'

describe('Get store inventory', () => {
  test('successful operation', async () => {
    const response = await StoreService.getInventory()
    expect(response.status).toBe(200)
  })
})

describe('Get order by id', () => {
  test('successful operation', async () => {
    const response = await StoreService.getOrderById({ orderId: config.orderId })
    expect(response.status).toBe(200)
  })
})
