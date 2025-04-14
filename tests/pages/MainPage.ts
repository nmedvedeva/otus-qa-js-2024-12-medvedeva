import { Page, Locator } from '@playwright/test'

class MainPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async gotoHomePage(): Promise<void> {
    await this.page.goto('https://rus-buket.ru/')
  }

  async clickOnBouquetsLink(): Promise<void> {
    await this.page.getByRole('link', { name: 'Букеты из клубники' }).click()
  }

  async clickOnFilterBouquetsLink(): Promise<void> {
    await this.page.locator('#js_catalog-tags').getByRole('link', { name: 'Букеты', exact: true }).click()
  }

  async setPriceFilter(toAmount: string): Promise<void> {
    const textPriceTo: Locator = this.page.locator('#js_rb-filter__price-to')
    await textPriceTo.waitFor({ state: 'visible' })
    await textPriceTo.click()
    await textPriceTo.fill('')
    await textPriceTo.pressSequentially(toAmount)
    await textPriceTo.press('Enter')
  }

  async setPriceRange(fromAmount: string, toAmount: string): Promise<void> {
    const textPriceFrom: Locator = this.page.locator('#js_rb-filter__price-from')
    await textPriceFrom.waitFor({ state: 'visible' })
    await textPriceFrom.click()
    await textPriceFrom.fill('')
    await textPriceFrom.pressSequentially(fromAmount)
    await textPriceFrom.press('Enter')

    const textPriceTo: Locator = this.page.locator('#js_rb-filter__price-to')
    await textPriceTo.waitFor({ state: 'visible' })
    await textPriceTo.click()
    await textPriceTo.fill('')
    await textPriceTo.pressSequentially(toAmount)
    await textPriceTo.press('Enter')
  }

  async clickOnFlowersFilter(): Promise<void> {
    const filterFlower: Locator = this.page.locator('#js_rb-filter').getByText('Цветы')
    await filterFlower.click()
    await this.page.getByRole('checkbox', { name: 'С розами' }).click()
  }

  async clickOnSortByPrice(): Promise<void> {
    const sortByPrice: Locator = this.page.locator('#js_sort-box__btn').getByText('По популярности')
    await sortByPrice.click()
    await this.page.locator('.rb-dropdown__menu-item').getByText('Цена по возрастанию').click()
  }
}

export default MainPage
