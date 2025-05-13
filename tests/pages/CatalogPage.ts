import { Page, Locator } from '@playwright/test'

class CatalogPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async openCatalogMenuByBtn(): Promise<void> {
    await this.page.locator('.header-middle__btn-catalog').click()
  }

  async showSubmenuInCatalogMenu(category: string): Promise<void> {
    await this.page.locator('.rb-menu__head-list').getByRole('link', { name: category }).hover()
  }

  async openCategoryInSubmenu(category: string): Promise<void> {
    await this.page.getByRole('link', { name: category }).click()
  }

  async findh1OnPage(): Promise<void> {
    this.page.getByRole('heading', { level: 1 })
  }

  async addToFavorite(): Promise<void> {
    await this.page.locator('.rb-product-card__favorite').first().click()
  }

  async saveNameOfProduct(): Promise<string> {
    const productLocator = this.page.locator('.catalog-row .rb-product-card__name').first()
    const productName = await productLocator.innerText()
    return productName
  }

  async addProductToCart(): Promise<void> {
    const buttonAddToCart = this.page.locator('.catalog-row .rb-product-card__buy').first()
    await buttonAddToCart.click()
  }

  async openCart(): Promise<void> {
    const buttonCart = this.page.locator('.header-cart')
    await buttonCart.click()
  }

  async searchOnSite(searchPhrase: string): Promise<void> {
    const fillSearchField: Locator = this.page.getByRole('searchbox', { name: 'Поиск товаров' })
    await fillSearchField.click()
    await fillSearchField.pressSequentially(searchPhrase)
    await fillSearchField.press('Enter')
  }

  async openRandomProduct(): Promise<void> {
    const productElements = await this.page.locator('.rb-product-card').all()
    const randomIndex = Math.floor(Math.random() * productElements.length)
    const randomProductElement = productElements[randomIndex]
    await randomProductElement.click()
  }

  async addToCart(): Promise<void> {
    const buttonAddToCart = this.page.locator('.product__btn-buy')
    await buttonAddToCart.click()
  }
}

export default CatalogPage