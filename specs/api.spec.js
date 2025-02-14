/* eslint-disable jest/valid-title */
import config from '../framework/config/config.js'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()
describe('Auth', () => {
  test('Test for success user create', async () => {
    const response = await fetch(config.baseURL + '/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: process.env.LOGIN_CORRECT,
        password: process.env.PASSWORD_CORRECT
      })
    })
    const data = await response.json()
    expect(response.status).toBe(201)
    expect(data.username).toBe(config.login_correct)
  })
  test('busy login', async () => {
    const response = await fetch(config.baseURL + '/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.login_correct,
        password: config.password_correct
      })
    })
    const data = await response.json()
    expect(response.status).toBe(406)
    expect(data.message).toBe('User exists!')
  })
  test('incorrect password', async () => {
    const response = await fetch(config.baseURL + '/Account/v1/User', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.login_correct,
        password: config.password_incorrect
      })
    })
    const data = await response.json()
    expect(response.status).toBe(400)
    expect(data.message).toBeTruthy()
  })
})

describe('Test for generate token', () => {
  test('Tests for success generate token', async () => {
    const response = await fetch(config.baseURL + '/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.login_correct,
        password: config.password_correct
      })
    })
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.status).toBe('Success')
    expect(data.token).toBeTruthy()
  })
  test('for unsuccessful generate token', async () => {
    const response = await fetch(config.baseURL + '/Account/v1/GenerateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: config.login_correct,
        password: config.password_incorrect
      })
    })
    const data = await response.json()
    expect(response.status).toBe(200)
    expect(data.status).toBe('Failed')
    expect(data.token).toBeNull()
  })
})
