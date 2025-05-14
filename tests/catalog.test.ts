import { test, expect } from '@playwright/test'
import CatalogPage from './pages/CatalogPage'
import MainPage from './pages/MainPage'
import CartPage from './pages/CartPage'

test('Переход в раздел из сабменю каталога с проверкой тайтла', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.openCatalogMenuByBtn()
  const category = 'Розы'
  await catalogPage.showSubmenuInCatalogMenu(category)
  const subCategory = 'В форме сердца'
  await catalogPage.openCategoryInSubmenu(subCategory)
  const h1Element = page.getByRole('heading', { level: 1 })
  await expect(h1Element).toHaveText(new RegExp(subCategory, 'i'))
})

test('Добавление товара в избранное из листинга', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.selectOnFilterBouquetsLink()
  const catalogPage = new CatalogPage(page)
  await catalogPage.addToFavorite()
  const savedAddedProductName = await catalogPage.saveNameOfProduct()
  await mainPage.openFavorites()
  const productInFavorites = page.locator(`.rb-product-card__name:has-text('${savedAddedProductName}')`)
  await expect(productInFavorites).toBeVisible()
})

test('Добавление товара в корзину из листинга', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.addProductToCart()
  const buttonAddToCart = page.locator(`.catalog-row .rb-product-card__buy`).first()
  await expect(buttonAddToCart).toHaveText(`В корзине`)
})

test('Переход в корзину', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.openCart()
  const h1Element = page.getByRole('heading', { level: 1 })
  await expect(h1Element).toHaveText('Корзина')
})

test('Проверка работы поиска на сайте', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  const searchPhrase = 'жемчужина'
  await catalogPage.searchOnSite(searchPhrase)
  const savedAddedProductName = await catalogPage.saveNameOfProduct()
  const productInSearchPage = page.locator(`.rb-product-card__name:has-text('${savedAddedProductName}')`)
  await expect(productInSearchPage).toBeVisible()
  await expect(page.locator(`.rb-filter-box__tags-item`)).toHaveText(`${searchPhrase}`)
})

test('Добавление товара в корзину из карточки товара', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.openCatalogMenuByBtn()
  const category = 'Розы'
  await catalogPage.showSubmenuInCatalogMenu(category)
  const subCategory = 'В форме сердца'
  await catalogPage.openCategoryInSubmenu(subCategory)
  await catalogPage.openRandomProduct()
  await catalogPage.addToCart()
  const buttonAddToCart = page.locator(`.product__btn-buy`)
  await expect(buttonAddToCart).toHaveText(`В корзине`)
})

test('Добавление бесплатной открытки', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.openCatalogMenuByBtn()
  const category = 'День рождения'
  await catalogPage.showSubmenuInCatalogMenu(category)
  const subCategory = 'Любимой'
  await catalogPage.openCategoryInSubmenu(subCategory)
  await catalogPage.openRandomProduct()
  await catalogPage.addToCart()
  await catalogPage.openCart()
  const PostcardMessage = 'Этот день счастливый самый! День Рождения твоего!'
  const cartPage = new CartPage(page)
  await cartPage.AddFreePostcard(PostcardMessage)
  await expect(page.locator('.cart-product__card-msg')).toBeVisible()
})

test('Удаление бесплатной открытки', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.openCatalogMenuByBtn()
  const category = 'День рождения'
  await catalogPage.showSubmenuInCatalogMenu(category)
  const subCategory = 'Любимой'
  await catalogPage.openCategoryInSubmenu(subCategory)
  await catalogPage.openRandomProduct()
  await catalogPage.addToCart()
  await catalogPage.openCart()
  const PostcardMessage = 'Этот день счастливый самый! День Рождения твоего!'
  const cartPage = new CartPage(page)
  await cartPage.AddFreePostcard(PostcardMessage)
  await cartPage.DeletePostcardFromCart()
  await expect(page.locator('.cart-product__card-msg')).not.toBeVisible()
})

test('Удаление товара из корзины', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  const catalogPage = new CatalogPage(page)
  await catalogPage.openRandomProduct()
  await page.waitForLoadState('domcontentloaded')
  await catalogPage.addToCart()
  await catalogPage.openCart()
  const cartPage = new CartPage(page)
  await cartPage.DeleteProductFromCart()
  await expect(page.locator('.cart__empty')).toBeVisible()
})

test('Выбор валюты (доллары) на сайте', async ({ page }) => {
  const mainPage = new MainPage(page)
  await mainPage.gotoHomePage()
  await mainPage.setSiteCurrenciesUSD()
  const firstProductOnPage = page.locator('.rb-product-card__price-box').first()
  await expect(firstProductOnPage).toHaveText(/$/)
})
