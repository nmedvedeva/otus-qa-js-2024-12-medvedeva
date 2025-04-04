import { expect, test } from '@playwright/test'

test('Отображение тайтла в хедере', async ({ page }) => {
  await page.goto('https://flomarket.com')
  await expect(page).toHaveTitle(/FloMarket/)
})

test.only('Открывается страница с каталогом для Москвы', async ({ page }) => {
  await page.goto('https://flomarket.com')
  const SearchInput = page.locator('[data-test-id="top-section"] [data-test-id="form-field-city-search"]')
  await SearchInput.click()
  await SearchInput.pressSequentially('Москва')
  await page.screenshot({ path: 'screenshot.png' })
  await page.getByText('Москва Московская область').click()
  const cityTextElement = page.locator('.select-city__text')
  await expect(cityTextElement).toHaveText('Москва')
})

test('Открывается форма регистрации партнера', async ({ page }) => {
  await page.goto('https://flomarket.com')
  await page.getByRole('link', { name: 'Зарегистрировать магазин' }).click()
  await expect(page.locator('h1.section-title')).toHaveText('Форма регистрации партнёра')
})

test('Проверка статуса заказа (несуществующий заказ)', async ({ page }) => {
  await page.goto('https://flomarket.com')
  await page.getByRole('button', { name: 'Статус заказа' }).click()
  const inputOrderNumber = page.locator('input[name="number"]')
  await inputOrderNumber.click()
  await inputOrderNumber.pressSequentially('12312345')
  await page.getByRole('button', { name: 'Проверить' }).click()
  const messageElement = page.locator('div.modal__body .text-center')
  await messageElement.waitFor({
    state: 'visible'
  })
  await expect(messageElement).toHaveText('Заказ не найден')
})

test('Открывается форма авторизации с переходом на регистрацию', async ({ page }) => {
  await page.goto('https://flomarket.com')
  await page.getByRole('button', { name: 'Войти' }).click()
  await page.getByRole('link', { name: 'Зарегистрироваться' }).click()
  await expect(page.locator('h1.section-title')).toHaveText('Форма регистрации покупателя')
})
