import { Page, Locator } from '@playwright/test'

class CartPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }

  async AddFreePostcard(PostcardMessage: string): Promise<void> {
    const linkFreePostcard: Locator = this.page.locator('.cart-product .cart-product__btn-add_postcard')
    await linkFreePostcard.click()
    const fieldPostcardText = this.page.locator('.modal-postcard__textarea')
    await fieldPostcardText.click()
    await fieldPostcardText.pressSequentially(PostcardMessage)
    await this.page.locator('.rb-modal__footer .rb-btn').first().click()
  }

  async DeleteProductFromCart(): Promise<void> {
    const buttonDeleteItem: Locator = this.page.locator('.cart-product__buttons .cart-product__btn')
    await buttonDeleteItem.click()
    const buttonApproveDelete = this.page.locator('.tingle-modal-box__footer .rb-btn_success')
    await buttonApproveDelete.click()
  }

  async DeletePostcardFromCart(): Promise<void> {
    const buttonDeleteItem: Locator = this.page.locator('.cart-product_postcard button.cart-product__btn svg path[fill-rule="evenodd"]')
    await buttonDeleteItem.click()
    const buttonApproveDelete = this.page.locator('.tingle-modal-box__footer .rb-btn_success')
    await buttonApproveDelete.click()
  }
}

export default CartPage