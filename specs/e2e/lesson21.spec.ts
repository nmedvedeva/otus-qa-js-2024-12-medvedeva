import { expect, test } from "@playwright/test"

test("Отображение тайтла в хедере", async ({ page }) => {
    await page.goto("https://flomarket.com")
    await expect(page).toHaveTitle(/FloMarket/)
})

test.only("Открывается страница с каталогом для Москвы", async ({ page }) => {
    await page.goto("https://flomarket.com")
    const SearchInput = page.locator('[data-test-id="top-section"] [data-test-id="form-field-city-search"]')
    await SearchInput.click()
    await SearchInput.pressSequentially('Москва')
    await page.getByText('Москва Московская область').click()
    await expect(page).toHaveTitle(/в Москве/) //переделать на проверку что в хедере написана Москва
})