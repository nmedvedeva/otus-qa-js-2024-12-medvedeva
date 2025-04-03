import { expect, test } from "@playwright/test"

test.skip("Отображение тайтла в хедере", async ({ page }) => {
    await page.goto("https://playwright.dev")
    await expect(page).toHaveTitle(/Playwright/)
})

test.skip("Отображение текста в ссылке для установки", async ({ page }) => {
    await page.goto("https://playwright.dev")
    await page.getByRole("link", { name: "Get started" }).click()
    await expect(page.getByRole("link", { name: "Installation" })).toBeVisible()
})

test.skip("Отображение текста locatorAssertions", async ({ page }) => {
    await page.goto("https://playwright.dev")
    await page.getByRole('button', { name: 'Search' }).click()
    const searchInput = page.getByRole('searchbox', { name: "Search" });
    await searchInput.pressSequentially("LocatorAssertions")
    await page.getByRole('link', { name: 'LocatorAssertions', exact: true }).waitFor({
        state: 'visible'
    })
    await searchInput.press('Enter')
    await expect(page).toHaveTitle(/LocatorAssertions \| Playwright/)
})