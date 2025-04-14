import { expect, test } from '@playwright/test'

test('Переход в раздел с проверкой тайтла', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.getByRole('link', { name: 'Букеты из клубники' }).click()
  await expect(page).toHaveTitle(/Клубника в шоколаде/)
})

test('Установка цены в фильтре до 5000', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.locator('#js_catalog-tags').getByRole('link', { name: 'Букеты', exact: true }).click()
  const textPriceTo = page.locator('#js_rb-filter__price-to')
  await textPriceTo.waitFor({ state: 'visible' })
  await textPriceTo.click()
  await textPriceTo.fill('')
  await textPriceTo.pressSequentially('5000')
  await textPriceTo.press('Enter')
  await expect(
    page.locator('#js_rb-filter-box__tags .rb-filter-box__tags-item').filter({ hasText: 'до 5,000 ₽' })
  ).toHaveText('до 5,000 ₽')
})

test('Установка цены в фильтре от 2000 до 5000', async ({ page }) => {
  await page.goto('https://rus-buket.ru/')
  await page.locator('#js_catalog-tags').getByRole('link', { name: 'Букеты', exact: true }).click()
  const textPriceFrom = page.locator('#js_rb-filter__price-from')
  await textPriceFrom.waitFor({ state: 'visible' })
  await textPriceFrom.click()
  await textPriceFrom.fill('')
  await textPriceFrom.pressSequentially('2000')
  await textPriceFrom.press('Enter')
  const textPriceTo = page.locator('#js_rb-filter__price-to')
  await textPriceTo.waitFor({ state: 'visible' })
  await textPriceTo.click()
  await textPriceTo.fill('')
  await textPriceTo.pressSequentially('5000')
  await textPriceTo.press('Enter')
  await expect(
    page.locator('#js_rb-filter-box__tags .rb-filter-box__tags-item').filter({ hasText: 'от 2,000 ₽ до 5,000 ₽' })
  ).toHaveText('от 2,000 ₽ до 5,000 ₽')
})
