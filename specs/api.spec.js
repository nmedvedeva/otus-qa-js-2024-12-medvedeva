import { login_correct, password_correct, password_incorrect } from '../config'

const base_url = 'https://bookstore.demoqa.com'

describe('Auth', () => {
  it('Test for success user create', async () => {
    const response = await fetch(base_url + '/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: login_correct,
        password: password_correct
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(201)
    expect(data.username).toBe(login_correct)
  })
  it('Test busy login', async () => {
    const response = await fetch(base_url + '/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: login_correct,
        password: password_correct
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(406)
    expect(data.message).toBe('User exists!')
  })
  it('Test incorrect password', async () => {
    const response = await fetch(base_url + '/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: login_correct,
        password: password_incorrect
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(400)
    expect(data.message).toBeTruthy()
  })
})

describe('Test for generate token', () => {
  it('Tests for success generate token', async () => {
    const response = await fetch(base_url + '/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: login_correct,
        password: password_correct
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.status).toBe('Success')
    expect(data.token).toBeTruthy()
  })
  it('Test for unsuccessful generate token', async () => {
    const response = await fetch(base_url + '/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: login_correct,
        password: password_incorrect
      })
    })
    const data = await response.json()
    expect(response.status).toEqual(200)
    expect(data.status).toBe('Failed')
    expect(data.token).toBeNull()
  })
})
