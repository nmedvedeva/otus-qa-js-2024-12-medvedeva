import { expect, test } from '@playwright/test'

test('Отображение тайтла в хедере', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await expect(page).toHaveTitle(/Русский Букет/)
})

test('Открывается страница с каталогом для Новосибирска', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.locator('.desktop-city__name').click()
  const SearchInput = page.locator('#js_modal-city-search__field')
  await SearchInput.click()
  await SearchInput.pressSequentially('Новосибирск')
  await page.getByText('Новосибирск, Новосибирская Область').click()
  const cityTextElement = page.locator('.desktop-city__name')
  await expect(cityTextElement).toHaveText('Новосибирск')
})

test('Открывается форма регистрации партнера', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.getByRole('link', { name: 'Партнёрам' }).click()
  await expect(page.locator('#js_modal-partner-register .rb-modal__title')).toHaveText('Регистрация партнера')
})

test('Проверка статуса заказа (несуществующий заказ)', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.getByRole('link', { name: 'Статус заказа' }).click()
  const inputOrderNumber = page.locator('input[name="order_id"]')
  await inputOrderNumber.click()
  await inputOrderNumber.pressSequentially('4027438')
  await page.getByRole('button', { name: 'Проверить' }).click()
  const messageElement = page.locator('h3.section-title')
  await expect(messageElement).toHaveText('Заказ не найден')
})

test('Открывается форма авторизации с переходом на регистрацию', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.getByRole('button', { name: 'Войти' }).click()
  await page.getByRole('button', { name: 'Зарегистрироваться', exact: true }).click()
  await expect(page.locator('#js_modal-register .rb-modal__title')).toHaveText('Регистрация в личном кабинете')
})
