import { test, expect } from '@playwright/test'
import MainPage from './pages/MainPage'

test('Переход в раздел с проверкой тайтла', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.clickOnBouquetsLink()
  await expect(page).toHaveTitle(/Клубника в шоколаде/)
})

test('Установка цены в фильтре до 5000', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.clickOnFilterBouquetsLink()
  await mainPage.setPriceFilter('5000')
  await expect(
    page.locator('#js_rb-filter-box__tags .rb-filter-box__tags-item').filter({ hasText: 'до 5,000 ₽' })
  ).toHaveText('до 5,000 ₽')
})

test('Установка цены в фильтре от 2000 до 5000', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.clickOnFilterBouquetsLink()
  await mainPage.setPriceRange('2000', '5000')
  await expect(
    page.locator('#js_rb-filter-box__tags .rb-filter-box__tags-item').filter({ hasText: 'от 2,000 ₽ до 5,000 ₽' })
  ).toHaveText('от 2,000 ₽ до 5,000 ₽')
})

test('Выбор в фильтре "розы"', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.clickOnFilterBouquetsLink()
  await mainPage.clickOnFlowersFilter()
  await expect(
    page.locator('#js_rb-filter-box__tags .rb-filter-box__tags-item').filter({ hasText: 'С розами' })
  ).toHaveText('С розами')
})

test('Сортировка товаров по цене по возрастанию', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.clickOnFilterBouquetsLink()
  await mainPage.clickOnSortByPrice()
  await expect(page.locator('#js_sort-box__btn')).toHaveText('Цена по возрастанию')
})
