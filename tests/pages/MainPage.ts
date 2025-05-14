import { Page, Locator } from '@playwright/test'

class MainPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async gotoHomePage(): Promise<void> {
    await this.page.goto('https://rus-buket.ru/')
  }

  async openCategory(category: string): Promise<void> {
    await this.page.getByRole('link', { name: category }).click()
  }

  async selectOnFilterBouquetsLink(): Promise<void> {
    await this.page.locator('.catalog-sticky-box__content').getByRole('link', { name: 'Букеты', exact: true }).click()
  }

  async openFavorites(): Promise<void> {
    await this.page.locator('.header-favorites').click()
  }

  async setSiteCurrenciesUSD(): Promise<void> {
    const buttonCurrencies: Locator = this.page.locator('.header-top__currencies')
    await buttonCurrencies.hover()
    const buttonCurrenciesUSD: Locator = this.page.locator('.header-top__lang-and-currency .currencies__item_usd')
    await buttonCurrenciesUSD.click()
  }

  async setSiteCurrenciesEUR(): Promise<void> {
    const buttonCurrencies: Locator = this.page.locator('.header-top__currencies')
    await buttonCurrencies.hover()
    const buttonCurrenciesEUR: Locator = this.page.locator('.header-top__lang-and-currency .currencies__item_eur')
    await buttonCurrenciesEUR.click()
  }
}

export default MainPage
